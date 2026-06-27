# ERRORS.md

# VigilXi - Error Log

This document records all significant issues encountered during development, including their symptoms, root causes, investigations, solutions, and preventive measures. The purpose is to avoid repeatedly solving the same problems.

---

# Error 1 - Failed to Fetch

## Symptoms

* Clicking **Start AI Analysis** failed immediately.
* Browser displayed:

```
TypeError: Failed to fetch
```

* Upload request never completed.

## Root Cause

The frontend could not communicate with the backend successfully.

Possible causes included:

* Backend not running
* Incorrect API URL
* Network failure
* GitHub Codespaces proxy issues

## Investigation

Verified:

* Button click handler
* File selection
* `handleUpload()`
* `uploadVideo()`
* Browser Network tab
* Backend terminal logs

Added logging inside both frontend and backend to identify the exact failure point.

## Solution

* Verified backend availability using Swagger (`/docs`)
* Ensured backend was running before frontend
* Corrected API URL
* Confirmed request reached backend

## Prevention

Always verify:

1. Backend running
2. Swagger accessible
3. Correct API URL
4. Network request succeeds

---

# Error 2 - CORS Policy Error

## Symptoms

Browser Console:

```
Access to fetch has been blocked by CORS policy
No 'Access-Control-Allow-Origin' header
```

## Root Cause

Initially assumed to be a FastAPI CORS configuration issue.

Actual cause:

The request timed out before completion.

The GitHub Codespaces proxy returned an error response without CORS headers, causing the browser to report a CORS error.

## Solution

Configured FastAPI CORS correctly.

More importantly, investigated the underlying timeout rather than assuming CORS was the root problem.

## Prevention

Never assume browser CORS errors are the real issue.

Always verify backend logs and HTTP status first.

---

# Error 3 - 504 Gateway Timeout

## Symptoms

Frontend:

```
POST /upload-video

504 Gateway Timeout
```

Backend:

```
POST /upload-video

200 OK
```

## Root Cause

Video processing performed:

* YOLO detection
* Pose estimation
* Video rendering
* Snapshot generation

The GitHub Codespaces tunnel timed out before the backend completed processing.

## Solution

Replaced synchronous processing with background processing.

New architecture:

```
Upload

↓

Return job_id immediately

↓

Background AI processing

↓

Frontend polls

/result/{job_id}

↓

Display final result
```

## Prevention

Never perform long-running AI inference inside a blocking HTTP request.

---

# Error 4 - Hardcoded API URL

## Symptoms

Frontend stopped working after reopening GitHub Codespaces.

## Root Cause

API URL was hardcoded.

GitHub Codespaces generates a new URL when environments change.

## Solution

Created:

```
frontend/.env.local
```

Configured:

```
NEXT_PUBLIC_API_URL=<current backend URL>
```

Used:

```ts
fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-video`)
```

## Prevention

Never hardcode Codespaces URLs.

---

# Error 5 - Backend Returned 200 but Frontend Displayed Nothing

## Symptoms

Backend completed processing successfully.

Frontend remained unchanged.

## Root Cause

Frontend never received the completed response because the request timed out before processing finished.

## Solution

Implemented asynchronous processing with polling.

Frontend updates only after processing completes.

---

# Error 6 - Inconsistent Person Detection

## Symptoms

Running the same video multiple times produced different people counts.

## Root Cause

YOLO detections naturally fluctuate between frames.

Confidence threshold and image resolution also affected detection quality.

## Solution

Updated detector configuration:

* Increased image size
* Reduced confidence threshold
* Added people-count smoothing using recent frame history

## Prevention

Never rely on a single frame for counting people.

---

# Error 7 - Processed Video Not Loading

## Symptoms

Threat analysis appeared.

Processed video failed to load.

## Root Cause

Frontend referenced localhost instead of the backend URL.

## Solution

Generated video URLs dynamically using the configured API URL.

## Prevention

Never hardcode localhost in frontend code intended for remote environments.

---

# Error 8 - GitHub Codespaces URL Changes

## Symptoms

Project worked one day and failed the next without code changes.

## Root Cause

GitHub Codespaces generated a different forwarded URL.

## Solution

Use environment variables instead of hardcoded URLs.

Update `.env.local` whenever the Codespace URL changes.

---

# Key Lessons Learned

* Always identify the real error before modifying code.
* Browser errors are not always the root cause.
* Verify backend logs before debugging frontend.
* Long-running AI workloads should use asynchronous processing.
* Store configuration in environment variables.
* Add logging to isolate failures systematically.
