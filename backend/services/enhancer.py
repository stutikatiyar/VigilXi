import cv2
import numpy as np


def enhance_frame(frame):

    # Upscale

    frame = cv2.resize(
        frame,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC
    )

    # Sharpen

    kernel = np.array([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ])

    frame = cv2.filter2D(
        frame,
        -1,
        kernel
    )

    # Contrast Enhancement

    gray = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2GRAY
    )

    enhanced = cv2.equalizeHist(gray)

    frame = cv2.cvtColor(
        enhanced,
        cv2.COLOR_GRAY2BGR
    )

    return frame