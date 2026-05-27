from ultralytics import YOLO

model = YOLO("yolov8n-pose.pt")


def detect_objects(frame):

    results = model.predict(
        frame,
        imgsz=960,
        classes=[0],
        conf=0.20,
        iou=0.30
    )

    detections = []

    for result in results:

        boxes = result.boxes

        if boxes is None:
            continue

        for box in boxes:

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            confidence = float(box.conf[0])

            class_id = int(box.cls[0])

            detections.append({
                "track_id": -1,
                "class_id": class_id,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2]
            })

    return detections