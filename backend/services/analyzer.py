import math

previous_positions = {}
previous_people_count = 0


def calculate_iou(box1, box2):

    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])

    intersection = max(0, x2 - x1) * max(0, y2 - y1)

    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])

    union = area1 + area2 - intersection

    if union == 0:
        return 0

    return intersection / union


def analyze_detections(detections):

    global previous_people_count

    unique_people = set()

    people_positions = []

    suspicious_interactions = []

    for detection in detections:

        if (
            detection["class_id"] == 0
            and detection["confidence"] > 0.4
        ):

            track_id = detection["track_id"]

            unique_people.add(track_id)

            x1, y1, x2, y2 = detection["bbox"]

            center_x = (x1 + x2) / 2
            center_y = (y1 + y2) / 2

            # Movement Analysis

            if track_id in previous_positions:

                prev_x, prev_y = previous_positions[track_id]

                movement_distance = math.sqrt(
                    (center_x - prev_x) ** 2 +
                    (center_y - prev_y) ** 2
                )

                if movement_distance > 50:

                    suspicious_interactions.append(
                        f"Aggressive movement detected from Track ID {track_id}"
                    )

            previous_positions[track_id] = (
                center_x,
                center_y
            )

            # Store Full Bounding Boxes

            people_positions.append(
                (
                    track_id,
                    x1,
                    y1,
                    x2,
                    y2
                )
            )

    # Stable People Counting

    current_count = len(unique_people)

    people_count = max(
        previous_people_count,
        current_count
    )

    previous_people_count = people_count

    # Interaction Analysis

    for i in range(len(people_positions)):

        for j in range(i + 1, len(people_positions)):

            id1, x1_1, y1_1, x2_1, y2_1 = people_positions[i]

            id2, x1_2, y1_2, x2_2, y2_2 = people_positions[j]

            iou = calculate_iou(
                (x1_1, y1_1, x2_1, y2_1),
                (x1_2, y1_2, x2_2, y2_2)
            )

            if iou > 0.1:

                suspicious_interactions.append(
                    f"Possible physical altercation detected between Track ID {id1} and Track ID {id2}"
                )

    # Final Output

    if suspicious_interactions:

        return {
            "alert": True,
            "message": "Suspicious interaction detected.",
            "people_detected": people_count,
            "interactions": suspicious_interactions
        }

    return {
        "alert": False,
        "message": "Normal activity detected.",
        "people_detected": people_count,
        "interactions": []
    }