from fastapi import FastAPI, UploadFile, File
from services.video_processor import process_video
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os

app = FastAPI()
app.mount(
    "/processed",
    StaticFiles(directory="processed"),
    name="processed"
)

app.mount(
    "/snapshots",
    StaticFiles(directory="snapshots"),
    name="snapshots"
)
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

@app.get("/")
def home():
    return {"message": "AI Surveillance Backend Running"}

@app.post("/upload-video")
async def upload_video(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_video(file_path)

    return {
    "filename": file.filename,
    "status": result["status"],
    "total_frames": result["total_frames"],
    "analysis": result["analysis"],
    "processed_video": result["processed_video"],
    "snapshot": result.get("snapshot")
}