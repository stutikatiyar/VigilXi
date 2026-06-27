import math


def get_keypoint(keypoints, index):
    """Safely get a keypoint by index."""
    try:
        kp = keypoints[index]
        return float(kp[0]), float(kp[1]), float(kp[2])  # x, y, confidence
    except:
        return None, None, 0.0


def analyze_pose(keypoints):
    """
    Analyze a single person's pose keypoints.
    COCO keypoint indices:
    0: nose, 1: left_eye, 2: right_eye, 3: left_ear, 4: right_ear
    5: left_shoulder, 6: right_shoulder
    7: left_elbow, 8: right_elbow
    9: left_wrist, 10: right_wrist
    11: left_hip, 12: right_hip
    13: left_knee, 14: right_knee
    15: left_ankle, 16: right_ankle
    """

    results = {
        "is_standing": False,
        "is_on_ground": False,
        "arms_raised": False,
        "aggressive_posture": False,
        "confidence": 0.0
    }

    if keypoints is None or len(keypoints) < 17:
        return results

    # GET KEY POINTS
    nose_x, nose_y, nose_conf = get_keypoint(keypoints, 0)
    l_shoulder_x, l_shoulder_y, l_sh_conf = get_keypoint(keypoints, 5)
    r_shoulder_x, r_shoulder_y, r_sh_conf = get_keypoint(keypoints, 6)
    l_hip_x, l_hip_y, l_hip_conf = get_keypoint(keypoints, 11)
    r_hip_x, r_hip_y, r_hip_conf = get_keypoint(keypoints, 12)
    l_knee_x, l_knee_y, l_knee_conf = get_keypoint(keypoints, 13)
    r_knee_x, r_knee_y, r_knee_conf = get_keypoint(keypoints, 14)
    l_ankle_x, l_ankle_y, l_ankle_conf = get_keypoint(keypoints, 15)
    r_ankle_x, r_ankle_y, r_ankle_conf = get_keypoint(keypoints, 16)
    l_wrist_x, l_wrist_y, l_wrist_conf = get_keypoint(keypoints, 9)
    r_wrist_x, r_wrist_y, r_wrist_conf = get_keypoint(keypoints, 10)
    l_elbow_x, l_elbow_y, l_elbow_conf = get_keypoint(keypoints, 7)
    r_elbow_x, r_elbow_y, r_elbow_conf = get_keypoint(keypoints, 8)

    # CHECK IF PERSON IS ON GROUND
    # If nose/shoulders are at similar height to hips = lying down
    if (nose_conf > 0.3 and l_hip_conf > 0.3 and r_hip_conf > 0.3):
        shoulder_y = (l_shoulder_y + r_shoulder_y) / 2 if l_sh_conf > 0.3 and r_sh_conf > 0.3 else None
        hip_y = (l_hip_y + r_hip_y) / 2

        if shoulder_y is not None:
            vertical_diff = abs(shoulder_y - hip_y)
            if vertical_diff < 60:  # shoulders and hips at similar height = lying
                results["is_on_ground"] = True

    # CHECK IF STANDING
    if (l_ankle_conf > 0.3 or r_ankle_conf > 0.3) and (nose_conf > 0.3):
        ankle_y = l_ankle_y if l_ankle_conf > 0.3 else r_ankle_y
        if nose_y is not None and (ankle_y - nose_y) > 100:
            results["is_standing"] = True

    # CHECK ARMS RAISED (wrists above shoulders)
    if l_sh_conf > 0.3 and r_sh_conf > 0.3:
        shoulder_y_avg = (l_shoulder_y + r_shoulder_y) / 2
        if l_wrist_conf > 0.3 and l_wrist_y < shoulder_y_avg:
            results["arms_raised"] = True
        if r_wrist_conf > 0.3 and r_wrist_y < shoulder_y_avg:
            results["arms_raised"] = True

    # CHECK AGGRESSIVE POSTURE
    # Arms raised + leaning forward (elbow bent aggressively)
    if results["arms_raised"]:
        if l_elbow_conf > 0.3 and r_elbow_conf > 0.3:
            elbow_spread = abs(l_elbow_x - r_elbow_x)
            if elbow_spread > 80:
                results["aggressive_posture"] = True

    return results


def analyze_all_poses(keypoints_list):
    """Analyze poses for all detected people in a frame."""
    pose_events = []
    person_on_ground = False
    aggressive_count = 0

    for kps in keypoints_list:
        pose = analyze_pose(kps)

        if pose["is_on_ground"]:
            person_on_ground = True
            pose_events.append("Person detected on ground — possible victim")

        if pose["aggressive_posture"]:
            aggressive_count += 1
            pose_events.append("Aggressive posture detected")

        if pose["arms_raised"] and not pose["aggressive_posture"]:
            pose_events.append("Arms raised detected")

    if person_on_ground and aggressive_count > 0:
        pose_events.append("CRITICAL: Person on ground with aggressor present")

    return {
        "pose_events": pose_events,
        "person_on_ground": person_on_ground,
        "aggressive_count": aggressive_count,
        "alert": person_on_ground or aggressive_count >= 1
    }