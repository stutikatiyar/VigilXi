from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from services.video_processor import process_video
from database import init_db, SessionLocal, VideoAnalysis
import shutil
import os
import time
import json

app = FastAPI()

# INIT DATABASE ON STARTUP
init_db()

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

# IN-MEMORY STORES
job_results = {}
recent_analyses = []

def save_to_db(result: dict, filename: str):
    db = SessionLocal()
    try:
        analysis = result["analysis"]
        metrics = result.get("metrics", {})

        record = VideoAnalysis(
            filename=filename,
            alert=analysis["alert"],
            people_detected=analysis["people_detected"],
            message=analysis["message"],
            interactions=json.dumps(analysis.get("interactions", [])),
            pose_events=json.dumps(analysis.get("pose_events", [])),
            total_frames=result["total_frames"],
            processed_video=result["processed_video"],
            snapshot=result.get("snapshot"),
            yolo_detection_time=metrics.get("yolo_detection"),
            total_processing_time=metrics.get("total_processing"),
            timestamp=time.time()
        )
        db.add(record)
        db.commit()
        print("✅ Saved to database")
    except Exception as e:
        print(f"❌ DB save error: {e}")
        db.rollback()
    finally:
        db.close()

def run_processing(job_id: str, file_path: str):
    try:
        result = process_video(file_path)
        filename = os.path.basename(file_path)

        job_results[job_id] = {
            "status": "done",
            "filename": filename,
            "total_frames": result["total_frames"],
            "analysis": result["analysis"],
            "processed_video": result["processed_video"],
            "snapshot": result.get("snapshot"),
            "metrics": result.get("metrics")
        }

        # SAVE TO DATABASE
        save_to_db(result, filename)

        # ADD TO RECENT ANALYSES
        recent_analyses.insert(0, {
            "filename": filename,
            "alert": result["analysis"]["alert"],
            "people_detected": result["analysis"]["people_detected"],
            "message": result["analysis"]["message"],
            "interactions": result["analysis"]["interactions"],
            "pose_events": result["analysis"].get("pose_events", []),
            "timestamp": time.time()
        })

        if len(recent_analyses) > 10:
            recent_analyses.pop()

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

@app.get("/system-status")
def system_status():
    db = SessionLocal()
    try:
        total = db.query(VideoAnalysis).count()
        alerts = db.query(VideoAnalysis).filter(VideoAnalysis.alert == True).count()
    finally:
        db.close()

    processing_jobs = sum(
        1 for job in job_results.values()
        if job["status"] == "processing"
    )

    return {
        "videos_processed": total,
        "processing_jobs": processing_jobs,
        "active_alerts": alerts,
        "ai_status": "Online",
        "neural_engine": "Active"
    }

@app.get("/recent-analyses")
def get_recent_analyses():
    db = SessionLocal()
    try:
        records = db.query(VideoAnalysis).order_by(
            VideoAnalysis.timestamp.desc()
        ).limit(10).all()

        analyses = []
        for r in records:
            analyses.append({
                "filename": r.filename,
                "alert": r.alert,
                "people_detected": r.people_detected,
                "message": r.message,
                "interactions": json.loads(r.interactions or "[]"),
                "pose_events": json.loads(r.pose_events or "[]"),
                "timestamp": r.timestamp
            })
        return {"analyses": analyses}
    finally:
        db.close()

@app.get("/result/{job_id}")
def get_result(job_id: str):
    if job_id not in job_results:
        return {"status": "not_found"}
    return job_results[job_id]

@app.get("/history")
def get_history():
    db = SessionLocal()
    try:
        records = db.query(VideoAnalysis).order_by(
            VideoAnalysis.timestamp.desc()
        ).all()

        history = []
        for r in records:
            history.append({
                "id": r.id,
                "filename": r.filename,
                "alert": r.alert,
                "people_detected": r.people_detected,
                "message": r.message,
                "interactions": json.loads(r.interactions or "[]"),
                "pose_events": json.loads(r.pose_events or "[]"),
                "total_frames": r.total_frames,
                "yolo_detection_time": r.yolo_detection_time,
                "total_processing_time": r.total_processing_time,
                "timestamp": r.timestamp
            })
        return {"history": history}
    finally:
        db.close()