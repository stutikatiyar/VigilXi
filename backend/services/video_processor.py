import os
import cv2

from services.detector import detect_objects
from services.analyzer import analyze_detections


def process_video(video_path):

    cap = cv2.VideoCapture(video_path)

    os.makedirs("processed", exist_ok=True)

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    output_path = "processed/output.mp4"

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    out = cv2.VideoWriter(
        output_path,
        fourcc,
        fps,
        (frame_width, frame_height)
    )

    frame_count = 0

    while cap.isOpened():

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        detections = detect_objects(frame)

        analysis = analyze_detections(detections)

        print(detections)
        print(analysis)

        for detection in detections:

            if detection["class_id"] == 0:

                x1, y1, x2, y2 = detection["bbox"]

                track_id = detection["track_id"]

                cv2.rectangle(
                    frame,
                    (int(x1), int(y1)),
                    (int(x2), int(y2)),
                    (0, 255, 0),
                    2
                )

                cv2.putText(
                    frame,
                    f"ID: {track_id}",
                    (int(x1), int(y1) - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

        out.write(frame)

    cap.release()

    out.release()

    return {
        "status": "processed",
        "total_frames": frame_count,
        "analysis": analysis,
        "processed_video": output_path
    }