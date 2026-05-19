from ultralytics import YOLO

model = YOLO("yolov8x.pt")


def detect_objects(frame):

    results = model.track(
        frame,
        persist=True,
        imgsz=960,
        classes=[0],
        conf=0.35
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

            if box.id is not None:
                track_id = int(box.id[0])
            else:
                track_id = -1

            detections.append({
                "track_id": track_id,
                "class_id": class_id,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2]
            })

    return detections