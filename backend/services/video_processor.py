import os
import cv2
from services.detector import detect_objects
from services.analyzer import analyze_detections


def process_video(video_path):

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

    # FIX 3 — accumulate evidence across all frames instead of overwriting
    all_analyses = []

    while cap.isOpened():

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        if frame_count % 5 != 0:
            continue

        frame = cv2.resize(frame, (640, 360))

        detections = detect_objects(frame)
        analysis = analyze_detections(detections)

        print("Detections:", detections)
        print("Analysis:", analysis)

        # FIX 3 — collect every frame's analysis
        all_analyses.append(analysis)

        # SAVE INCIDENT SNAPSHOT
        if analysis["alert"]:
            final_snapshot = f"snapshots/incident_frame_{frame_count}.jpg"
            cv2.imwrite(final_snapshot, frame)

        # DRAW DETECTIONS
        for detection in detections:
            if detection["class_id"] == 0:
                x1, y1, x2, y2 = map(int, detection["bbox"])
                confidence = detection["confidence"]

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    f"Person | {confidence:.2f}",
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

    cap.release()
    out.release()

    # FIX 3 — majority vote across all frames
    alert_frames = [a for a in all_analyses if a["alert"]]
    alert_triggered = len(alert_frames) > len(all_analyses) * 0.15  # alert if 30%+ frames flagged

    if all_analyses:
        max_people = max(a["people_detected"] for a in all_analyses)
        all_interactions = []
        for a in all_analyses:
            all_interactions.extend(a.get("interactions", []))
    else:
        max_people = 0
        all_interactions = []

    final_analysis = {
        "alert": alert_triggered,
        "message": "Suspicious activity detected." if alert_triggered else "Normal activity detected.",
        "people_detected": max_people,
        "interactions": all_interactions[:5]  # top 5 interactions
    }

    print("FINAL ANALYSIS:", final_analysis)

    return {
        "status": "processed",
        "total_frames": frame_count,
        "analysis": final_analysis,
        "processed_video": output_path,
        "snapshot": final_snapshot
    }