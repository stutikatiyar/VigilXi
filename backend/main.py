from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.video_processor import process_video
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs("processed", exist_ok=True)
os.makedirs("snapshots", exist_ok=True)

app.mount("/processed", StaticFiles(directory="processed"), name="processed")
app.mount("/snapshots", StaticFiles(directory="snapshots"), name="snapshots")

# IN-MEMORY JOB STORE
job_results = {}

def run_processing(job_id: str, file_path: str):
    try:
        result = process_video(file_path)
        job_results[job_id] = {
            "status": "done",
            "filename": os.path.basename(file_path),
            "total_frames": result["total_frames"],
            "analysis": result["analysis"],
            "processed_video": result["processed_video"],
            "snapshot": result.get("snapshot")
        }
    except Exception as e:
        job_results[job_id] = {"status": "error", "error": str(e)}

@app.get("/")
def home():
    return {"message": "AI Surveillance Backend Running"}

@app.post("/upload-video")
async def upload_video(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    job_id = file.filename.replace(" ", "_")
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    job_results[job_id] = {"status": "processing"}
    background_tasks.add_task(run_processing, job_id, file_path)

    return {"job_id": job_id, "status": "processing"}

@app.get("/result/{job_id}")
def get_result(job_id: str):
    if job_id not in job_results:
        return {"status": "not_found"}
    return job_results[job_id]