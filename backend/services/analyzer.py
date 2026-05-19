def analyze_detections(detections):

    unique_people = set()

    for detection in detections:

        if (
            detection["class_id"] == 0
            and detection["confidence"] > 0.5
        ):

            unique_people.add(detection["track_id"])

    people_count = len(unique_people)

    if people_count >= 2:

        return {
            "alert": True,
            "message": f"Suspicious activity detected: {people_count} people identified.",
            "people_detected": people_count
        }

    return {
        "alert": False,
        "message": "Normal activity detected.",
        "people_detected": people_count
    }