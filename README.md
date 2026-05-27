# 🛡️ VigilX — AI Video Intelligence Platform

> Real-time AI-powered surveillance and monitoring platform built using Computer Vision, YOLOv8, FastAPI, OpenCV, and Next.js.

---

# 📌 Overview

VigilX is a full-stack AI video intelligence platform designed to simulate a futuristic CCTV monitoring system capable of analyzing surveillance footage, detecting humans and vehicles, estimating suspicious physical interactions, and visualizing intelligent incident insights through an interactive cyber-security inspired dashboard.

The project combines:

* 🎥 Computer Vision
* 🤖 Artificial Intelligence
* 🧠 Surveillance Reasoning
* ⚡ Real-Time Video Processing
* 🌐 Full-Stack Web Development
* 📊 Intelligent Incident Visualization

Unlike traditional static CCTV systems, VigilX attempts to interpret scene behavior and generate meaningful AI-assisted operational insights rather than simply displaying raw video streams.

---

# 🚀 Key Features

## 🎥 CCTV Video Upload & Analysis

* Upload surveillance footage directly from the frontend dashboard
* Send video to AI backend for processing
* Perform frame-by-frame analysis using OpenCV and YOLOv8
* Real-time surveillance intelligence visualization

---

<img width="1877" height="647" alt="image" src="https://github.com/user-attachments/assets/bb8f26be-5fab-4591-9a6e-14c5068e2f72" />

---

## 🤖 YOLOv8 Multi-Object Detection

* Human detection
* Vehicle detection
* Motorcycle detection
* Multi-object recognition
* Traffic-aware detection
* Confidence-based filtering
* Real-time frame inference

---

## 🤼 Physical Interaction Detection

VigilX includes heuristic-based interaction analysis capable of estimating suspicious physical interactions between individuals.

Current logic includes:

* Human proximity analysis
* Bounding-box overlap estimation
* Aggressive movement detection
* Motion-based interaction reasoning
* AI-generated suspicious activity alerts

Example incidents:

* Possible physical interaction detected
* Aggressive movement detected
* Unusual crowd behavior identified

---

## 🧠 AI Surveillance Intelligence

* Suspicious activity analysis
* Person-count reasoning
* Vehicle-count analysis
* AI-generated surveillance alerts
* Intelligent event interpretation
* Dynamic incident generation

---


---

## 📊 Dynamic Incident Timeline

* Real-time incident insertion
* AI-generated surveillance events
* Threat categorization
* Live dashboard updates
* Suspicious interaction logging
* Physical activity monitoring

Example:

```text id="8eh0mb"
14:22 → Aggressive movement detected
14:23 → Suspicious interaction identified
14:25 → Traffic congestion increasing
```

---

## 📸 Incident Snapshot System

When suspicious activity is detected:

* Snapshot frames are automatically saved
* Incident evidence is generated
* Event visualization becomes easier

This improves operational realism and monitoring workflows.

---

## 🌌 Futuristic Cyber Dashboard

* Cinematic surveillance UI
* Neon cyber-security inspired interface
* Animated system indicators
* Tactical surveillance aesthetic
* Interactive upload experience

---

<img width="1876" height="977" alt="image" src="https://github.com/user-attachments/assets/0c2567f4-c692-4692-9e1f-4ef3c571c2c9" />

---

# 🧠 How VigilX Works

```text id="vyeqjt"
CCTV Video Upload
        ↓
FastAPI Backend
        ↓
OpenCV Frame Extraction
        ↓
YOLOv8 Object Detection
        ↓
Movement & Interaction Analysis
        ↓
AI Incident Intelligence
        ↓
Frontend Visualization
```

The system processes uploaded surveillance footage frame-by-frame, performs AI-based object detection, analyzes surveillance activity, and visualizes generated intelligence directly on the dashboard.

---

# 🏗️ Tech Stack

# 🎨 Frontend

| Technology   | Purpose            |
| ------------ | ------------------ |
| Next.js      | Frontend framework |
| React        | UI rendering       |
| TypeScript   | Type safety        |
| Tailwind CSS | Styling            |

---

# ⚙️ Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| FastAPI    | API backend        |
| Python     | Core backend logic |
| Uvicorn    | ASGI server        |

---

# 🤖 AI & Computer Vision

| Technology  | Purpose                |
| ----------- | ---------------------- |
| YOLOv8      | Multi-object detection |
| OpenCV      | Video processing       |
| Ultralytics | YOLO implementation    |

---

# 📂 Project Structure

```bash id="f9jz1w"
VigilX/
│
├── backend/
│   ├── services/
│   │   ├── analyzer.py
│   │   ├── detector.py
│   │   └── video_processor.py
│   │
│   ├── uploads/
│   ├── processed/
│   ├── snapshots/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── data/
│   │   └── services/
│
├── dataset/
├── docs/
├── screenshots/
└── README.md
```

---

# ⚡ Current Capabilities

✅ CCTV footage upload
✅ FastAPI backend integration
✅ OpenCV frame extraction
✅ YOLOv8 multi-object detection
✅ Human detection
✅ Vehicle detection
✅ Suspicious interaction detection
✅ Physical proximity analysis
✅ Congestion estimation
✅ AI-generated surveillance alerts
✅ Dynamic incident generation
✅ Incident snapshot generation
✅ Frontend-backend communication
✅ Futuristic surveillance dashboard
✅ Real-time surveillance visualization

---

# 🧪 AI Detection Logic

Current VigilX intelligence is based on:

* YOLOv8 multi-object detection
* Human proximity analysis
* Bounding-box overlap heuristics
* Motion-based interaction estimation
* Confidence-based filtering
* Rule-based surveillance reasoning

Example:

```python id="5u7xqz"
if (
    iou > 0.05
    or distance_between_people < 70
):
```

The system estimates suspicious interactions using movement behavior and physical proximity.

---

# ⚠️ Current Limitations

The current implementation still faces several real-world surveillance challenges:

* Duplicate detections in crowded scenes
* False positives during close interactions
* Heuristic-based interaction estimation
* Motion blur during fights or rapid movement
* Tracker instability in crowded scenes
* Occlusion issues
* Lack of persistent identity tracking
* Lack of semantic behavior understanding

These limitations are common in practical computer vision systems.

---

# 🔮 Future Improvements

## 🎯 Movement Tracking

* ByteTrack integration
* DeepSORT integration
* Persistent identity tracking
* Unique participant estimation

---

## 🧠 Advanced Behavioral Analysis

* Pose-estimation based fight detection
* Crowd interaction analysis
* Advanced behavioral reasoning
* Loitering detection
* Restricted-zone monitoring
* Crowd anomaly detection
* Motion trajectory analysis

---

## 🌐 System Expansion

* WebSocket live alerts
* Database integration
* User authentication
* Multi-camera monitoring
* Cloud deployment
* Real-time live stream processing

---

# 📸 Screenshots

## 🖥️ Dashboard UI

```bash id="b7x2qk"
screenshots/dashboard.png
```

---

## 🚨 AI Analysis Results

```bash id="5kzq4m"
screenshots/analysis.png
```

---

## 📸 Incident Snapshots

```bash id="s7yqk2"
screenshots/incidents.png
```

---

# 🛠️ Installation Guide

# 1️⃣ Clone Repository

```bash id="z0f3ut"
git clone https://github.com/stutikatiyar/VigilXi.git
```

---

# 2️⃣ Backend Setup

```bash id="rr8qz0"
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash id="h0yn3f"
http://127.0.0.1:8000
```

---

# 3️⃣ Frontend Setup

```bash id="x7g2wu"
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash id="mx9s2l"
http://localhost:3000
```

---

# 📄 API Documentation

FastAPI Swagger documentation:

```bash id="e3xg1a"
http://127.0.0.1:8000/docs
```

---

# 🧬 System Architecture Philosophy

VigilX was designed not just as a basic object detection demo, but as an evolving AI surveillance intelligence architecture.

The focus of the project is:

* realistic system design
* modular AI pipelines
* frontend-backend integration
* surveillance reasoning
* operational visualization
* scalable architecture
* production-style engineering workflow

Instead of treating AI as isolated notebook experiments, VigilX approaches AI as part of a complete real-world software system.

---

# 📈 Learning Outcomes

This project helped explore:

* Full-stack AI integration
* FastAPI backend development
* OpenCV video pipelines
* YOLOv8 inference workflows
* AI reasoning systems
* Frontend state management
* Real-time surveillance visualization
* Software architecture for AI systems

---

# 👩‍💻 Author

### Kirti

Built with curiosity, obsession for AI systems, and an interest in futuristic surveillance intelligence architectures.

---

# ⭐ Final Note

VigilX is continuously evolving.


