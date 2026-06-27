# DEBUGGING.md

# VigilXi Debugging Checklist

Follow this checklist whenever a new issue occurs.

---

# Step 1 - Verify Backend

Run:

```bash
uvicorn main:app --reload
```

Expected:

```
Application startup complete.
```

---

# Step 2 - Verify Frontend

Run:

```bash
npm run dev
```

Confirm frontend opens successfully.

---

# Step 3 - Verify Swagger

Open:

```
http://127.0.0.1:8000/docs
```

or

```
https://<codespace>-8000.app.github.dev/docs
```

Verify:

* API loads
* Upload endpoint exists

---

# Step 4 - Test Backend Independently

Upload a sample video using Swagger.

Confirm:

* HTTP 200
* Analysis returned
* Processed video generated

If Swagger fails, fix backend before touching frontend.

---

# Step 5 - Verify API URL

Check:

```
frontend/.env.local
```

Confirm:

```
NEXT_PUBLIC_API_URL=<current backend URL>
```

Restart Next.js after modifying environment variables.

---

# Step 6 - Browser Console

Open Developer Tools.

Look for:

* Failed to fetch
* CORS errors
* JavaScript exceptions
* React warnings

---

# Step 7 - Network Tab

Inspect the upload request.

Verify:

* Request sent
* HTTP status
* Response body
* Response time

---

# Step 8 - Backend Logs

Confirm request reaches backend.

Expected:

```
POST /upload-video

Analysis:

Pose:

FINAL ANALYSIS:

200 OK
```

---

# Step 9 - AI Verification

If detection quality is poor:

Check:

* Confidence threshold
* Image size
* Pose estimation
* Frame skipping
* People-count smoothing

---

# Step 10 - Processed Video

Verify:

```
/processed/output.mp4
```

opens correctly.

---

# Step 11 - GitHub Codespaces

Confirm:

* Port 3000 forwarded
* Port 8000 forwarded
* Correct forwarded URLs
* Environment variables updated

---

# Step 12 - Add Logs

Frontend:

```ts
console.log()
```

Backend:

```python
print()
```

Identify exactly where execution stops.

---

# Debugging Principles

* Change one thing at a time.
* Reproduce the issue consistently.
* Verify each layer independently.
* Do not assume the browser error is the root cause.
* Read backend logs before changing frontend code.
* Keep commits small and focused.
* Document every significant issue in `ERRORS.md`.

---

# Standard Debugging Order

```
1. Backend Running?

↓

2. Swagger Works?

↓

3. Frontend Running?

↓

4. Browser Console

↓

5. Network Tab

↓

6. Backend Logs

↓

7. AI Output

↓

8. UI Rendering
```

Following this sequence helps isolate problems quickly and reduces unnecessary debugging.
