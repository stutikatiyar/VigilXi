import os
import cv2
from services.detector import detect_objects
from services.analyzer import analyze_detections
from services.pose_analyzer import analyze_all_poses
from services.metrics import PerformanceMetrics

MAX_FRAMES = 300


def process_video(video_path):

    metrics = PerformanceMetrics()

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise Exception(f"Could not open video: {video_path}")

    print("✅ Video opened successfully")

    os.makedirs("processed", exist_ok=True)
    os.makedirs("snapshots", exist_ok=True)

    frame_width = 640
    frame_height = 360
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps == 0:
        fps = 30

    output_path = "processed/output.mp4"

    if os.path.exists(output_path):
        os.remove(output_path)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

    frame_count = 0
    final_snapshot = None
    all_analyses = []
    all_pose_events = []

    while cap.isOpened():

        # FRAME EXTRACTION
        metrics.start("frame_extraction")
        ret, frame = cap.read()
        metrics.stop("frame_extraction")

        if not ret:
            break

        frame_count += 1
        metrics.frames_read += 1

        if frame_count > MAX_FRAMES:
            print(f"⚠️ Frame limit reached ({MAX_FRAMES}), stopping early.")
            break

        if frame_count % 5 != 0:
            continue
        metrics.frames_processed += 1

        frame = cv2.resize(frame, (640, 360))

        # YOLO DETECTION
        metrics.start("yolo_detection")
        detections = detect_objects(frame)
        metrics.stop("yolo_detection")

        # THREAT ANALYSIS
        metrics.start("threat_analysis")
        analysis = analyze_detections(detections)
        metrics.stop("threat_analysis")

        # POSE ANALYSIS
        metrics.start("pose_analysis")
        keypoints_list = [d["keypoints"] for d in detections if d.get("keypoints") is not None]
        pose_result = analyze_all_poses(keypoints_list)
        metrics.stop("pose_analysis")

        # MERGE POSE ALERT INTO ANALYSIS
        if pose_result["alert"]:
            analysis["alert"] = True
            analysis["interactions"].extend(pose_result["pose_events"])

        all_analyses.append(analysis)
        all_pose_events.extend(pose_result["pose_events"])

        print("Detections:", detections)
        print("Analysis:", analysis)
        print("Pose:", pose_result)

        # SAVE INCIDENT SNAPSHOT
        if analysis["alert"]:
            metrics.alerts_generated += 1
            final_snapshot = f"snapshots/incident_frame_{frame_count}.jpg"
            cv2.imwrite(final_snapshot, frame)
            metrics.snapshots_generated += 1

        # VIDEO RENDERING
        metrics.start("video_rendering")

        for detection in detections:
            if detection["class_id"] == 0:
                x1, y1, x2, y2 = map(int, detection["bbox"])
                confidence = detection["confidence"]
                track_id = detection["track_id"]

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    f"Person #{track_id} | {confidence:.2f}",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

        cv2.putText(
            frame,
            f"People Detected: {analysis['people_detected']}",
            (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            2
        )

        if analysis["alert"]:
            cv2.putText(frame, "THREAT DETECTED", (30, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
        else:
            cv2.putText(frame, "NORMAL ACTIVITY", (30, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

        out.write(frame)
        metrics.stop("video_rendering")

    cap.release()
    out.release()

    # FINALIZE METRICS
    metrics.finish()

    # MAJORITY VOTE
    alert_frames = [a for a in all_analyses if a["alert"]]
    alert_triggered = len(alert_frames) > len(all_analyses) * 0.15

    if all_analyses:
        max_people = max(a["people_detected"] for a in all_analyses)
        all_interactions = []
        for a in all_analyses:
            all_interactions.extend(a.get("interactions", []))
    else:
        max_people = 0
        all_interactions = []

    unique_interactions = list(dict.fromkeys(all_interactions))

    final_analysis = {
        "alert": alert_triggered,
        "message": "Suspicious activity detected." if alert_triggered else "Normal activity detected.",
        "people_detected": max_people,
        "interactions": unique_interactions[:8],
        "pose_events": list(dict.fromkeys(all_pose_events))[:5]
    }

    print("FINAL ANALYSIS:", final_analysis)
    print("METRICS:", metrics.get_metrics())

    return {
        "status": "processed",
        "total_frames": metrics.frames_read,
        "processed_frames": metrics.frames_processed,
        "analysis": final_analysis,
        "processed_video": output_path,
        "snapshot": final_snapshot,
        "metrics": metrics.get_metrics()
    }