from ultralytics import YOLO

model = YOLO("yolov8n.pt")

def detect_objects(frame):

    results = model.track(frame, persist=True)

    detections = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])

            track_id = int(box.id[0]) if box.id is not None else -1

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "track_id": track_id,
                "class_id": class_id,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2]
            })

    return detections