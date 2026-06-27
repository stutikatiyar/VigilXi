from ultralytics import YOLO

model = YOLO("yolov8l-pose.pt")


def detect_objects(frame):

    results = model.predict(
        frame,
        imgsz=1280,
        classes=[0],
        conf=0.20,
        iou=0.30
    )

    detections = []

    for result in results:

        boxes = result.boxes
        keypoints = result.keypoints

        if boxes is None:
            continue

        for i, box in enumerate(boxes):

            x1, y1, x2, y2 = box.xyxy[0].tolist()
            confidence = float(box.conf[0])
            class_id = int(box.cls[0])
            track_id = int(box.id[0]) if box.id is not None else -1

            # EXTRACT KEYPOINTS FOR THIS PERSON
            kps = None
            if keypoints is not None and i < len(keypoints.data):
                kps = keypoints.data[i].tolist()  # 17 keypoints [[x,y,conf], ...]

            detections.append({
                "track_id": track_id,
                "class_id": class_id,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2],
                "keypoints": kps
            })

    return detections