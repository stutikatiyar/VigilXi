import os
import cv2

from services.detector import detect_objects
from services.analyzer import analyze_detections


def process_video(video_path):

    cap = cv2.VideoCapture(video_path)

    os.makedirs("processed", exist_ok=True)

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fps = cap.get(cv2.CAP_PROP_FPS)

    if fps == 0:
        fps = 30

    output_path = "processed/output.mp4"

    # Remove old processed file

    if os.path.exists(output_path):
        os.remove(output_path)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    out = cv2.VideoWriter(
        output_path,
        fourcc,
        fps,
        (frame_width, frame_height)
    )

    frame_count = 0

    final_analysis = {
        "alert": False,
        "message": "Normal activity detected.",
        "people_detected": 0,
        "interactions": []
    }

    while cap.isOpened():

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        detections = detect_objects(frame)

        analysis = analyze_detections(detections)

        final_analysis = analysis

        print(detections)
        print("FINAL ANALYSIS:", analysis)

        # Draw Bounding Boxes

        for detection in detections:

            if detection["class_id"] == 0:

                x1, y1, x2, y2 = map(
                    int,
                    detection["bbox"]
                )

                confidence = detection["confidence"]

                track_id = detection["track_id"]

                # BOX

                cv2.rectangle(
                    frame,
                    (x1, y1),
                    (x2, y2),
                    (0, 255, 0),
                    2
                )

                # LABEL

                cv2.putText(
                    frame,
                    f"ID {track_id} | {confidence:.2f}",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

        # PEOPLE COUNT

        cv2.putText(
            frame,
            f"People Detected: {analysis['people_detected']}",
            (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            2
        )

        # THREAT STATUS

        if analysis["alert"]:

            cv2.putText(
                frame,
                "THREAT DETECTED",
                (30, 100),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                3
            )

        else:

            cv2.putText(
                frame,
                "NORMAL ACTIVITY",
                (30, 100),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 255, 0),
                3
            )

        # WRITE FRAME

        out.write(frame)

    cap.release()

    out.release()

    return {
        "status": "processed",
        "total_frames": frame_count,
        "analysis": final_analysis,
        "processed_video": output_path
    }