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
Frontend polls /result/{job_id}
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

> **Note (recurred as Error 9):** this exact problem repeated after migrating the backend to Colab + ngrok. The lesson generalizes beyond Codespaces — any tunneled/forwarded backend URL (Codespaces, ngrok, localtunnel, etc.) is temporary. The `.env.local` fix should have been applied at that point too, not just hardcoded again in three files.

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

# Error 9 - ngrok Browser Warning Blocking Requests (Misread as CORS)

## Symptoms

After migrating the backend to Google Colab (using `ngrok` to expose it publicly), all `fetch()` calls from the frontend failed.

Browser Console:

```
Access to fetch at 'https://<id>.ngrok-free.dev/result/...'
from origin 'https://<codespace>-3000.app.github.dev' has been blocked
by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

```
Failed to load resource: net::ERR_FAILED
Poll error: TypeError: Failed to fetch
```

Confusingly, the Network tab showed `200 OK` for the same requests.

## Root Cause

Looked identical to a CORS misconfiguration (see Error 2), but the FastAPI `CORSMiddleware` setup was already correct.

The actual cause: free-tier ngrok URLs (`*.ngrok-free.dev` / `*.ngrok-free.app`) serve an **interstitial "you are about to visit this site" warning page** to any request that looks like a normal browser request, before forwarding to the real backend. That interstitial page:

* Returns `200 OK` (hence the misleading Network tab status)
* Does **not** carry the backend's CORS headers
* Gets blocked by the browser, which reports it as a CORS error

So the request never actually reached FastAPI — it was intercepted by ngrok's own warning page.

## Solution

Added the header `ngrok-skip-browser-warning: true` to every `fetch()` call from the frontend (in `services/api.ts`, `analyze/page.tsx`, `page.tsx`, and anywhere else hitting the API):

```ts
fetch(`${API_URL}/result/${jobId}`, {
  headers: { "ngrok-skip-browser-warning": "true" },
})
```

Once added, requests passed straight through to FastAPI, and the existing CORS headers worked as expected.

## Prevention

* When using free ngrok tunnels, always add `ngrok-skip-browser-warning: true` to frontend requests from day one.
* Per Error 2's lesson: a CORS error in the console does not always mean a CORS misconfiguration. Check whether the request is even reaching your actual backend (inspect the response body, not just the status code — the interstitial page returns HTML, not JSON).
* Prefer a paid/static ngrok domain or a more stable tunnel solution for anything beyond quick testing, since free ngrok URLs also regenerate on every restart (compounding with Error 4/8).

---

# Error 10 - GPU Migration Not Verified (YOLO Still Dominating Pipeline Time)

## Symptoms

After migrating the backend to Google Colab specifically to use GPU acceleration, performance metrics from a processed video still showed:

```
YOLO DETECTION: 2.059s
YOLO RUNTIME DOMINANCE: 85.28%
AVG YOLO/FRAME: 0.114s/frame
PROCESSING FPS: 7.46 FPS
```

YOLO's share of total processing time dropped from a previous ~99% to ~85%, but it was unclear whether this improvement came from GPU acceleration actually kicking in, or from unrelated changes (frame skipping ratio, image resolution, other pipeline steps becoming relatively heavier).

## Root Cause

Migrating the backend environment (e.g. Codespaces → Colab) does not automatically mean the model is running on GPU. YOLO inference will silently fall back to CPU if:

* `torch.cuda.is_available()` returns `False` in that runtime
* The model/tensors were not explicitly moved to `cuda` (e.g. missing `device='cuda'` in the YOLO call, or `.to('cuda')` on the model)
* Colab's runtime type was not actually set to a GPU runtime

A 0.114s/frame inference time is consistent with CPU inference for a model like YOLOv8 — GPU inference is typically an order of magnitude faster, so this number itself was a strong signal the migration may not have been effective yet.

## Investigation

* Compared total/average YOLO time before and after the Colab migration rather than assuming the move itself caused the improvement.
* Flagged that the 99% → 85% shift could equally be explained by changes elsewhere in the pipeline (e.g. frame skip ratio, rendering step) rather than GPU acceleration.

## Solution (to confirm/apply)

In the Colab notebook, explicitly verify and force GPU usage:

```python
import torch
print(torch.cuda.is_available())  # must print True
```

Ensure the YOLO model is loaded/run with the GPU device explicitly:

```python
model = YOLO("yolov8l-pose.pt")
results = model(frame, device="cuda")
```

Confirm Colab's runtime type is set to a GPU runtime (Runtime → Change runtime type → GPU) before running inference.

## Prevention

* Never assume a migration achieved its goal (GPU acceleration, speedup, etc.) just because the environment changed — measure the same metric before and after with the same input.
* When inference time per frame still looks CPU-range after a "GPU migration," check `torch.cuda.is_available()` and explicit device placement before investigating anything else in the pipeline.
* Log which device (`cpu`/`cuda`) inference actually ran on as part of the performance metrics output, so this is visible without needing to manually check the notebook each time.

---

# Key Lessons Learned

* Always identify the real error before modifying code.
* Browser errors are not always the root cause — a CORS-looking error can come from a proxy/tunnel intercepting the request before it reaches your backend.
* When debugging a "CORS error," inspect the actual response body, not just the status code — an interstitial or proxy error page can return 200 with no CORS headers.
* Verify backend logs before debugging frontend.
* Long-running AI workloads should use asynchronous processing.
* Store configuration in environment variables — this applies to **any** tunneled URL (Codespaces, ngrok, localtunnel), not just Codespaces specifically.
* Add logging to isolate failures systematically.
* Never assume an infrastructure migration (e.g. CPU → GPU) actually achieved its intended effect — measure before/after with the same metric, and log the actual execution device alongside performance numbers.