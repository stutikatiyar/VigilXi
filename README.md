# 🛡️ VigilX — AI Surveillance Intelligence System

> Real-time AI surveillance and threat monitoring platform powered by Computer Vision, YOLOv8, FastAPI, OpenCV, and Next.js.

---

# 📌 Overview

VigilX is a full-stack AI-powered surveillance intelligence system designed to simulate a futuristic CCTV monitoring platform capable of analyzing surveillance footage, detecting humans and objects, generating suspicious activity alerts, and visualizing surveillance intelligence through an interactive cyber-security inspired dashboard.

The project combines:

* 🎥 Computer Vision
* 🤖 Artificial Intelligence
* 🧠 Surveillance Reasoning
* ⚡ Real-Time Video Processing
* 🌐 Full-Stack Web Development
* 📊 Intelligent Incident Visualization

Unlike traditional static CCTV systems, VigilX attempts to interpret surveillance footage and generate meaningful AI-driven alerts rather than simply displaying raw video streams.

---

# 🚀 Key Features

## 🎥 CCTV Video Upload & Analysis

* Upload surveillance footage directly from the frontend dashboard
* Send video to AI backend for processing
* Perform frame-by-frame analysis using OpenCV and YOLOv8

---

## 🤖 YOLOv8 Object Detection

* Human detection
* Motorcycle detection
* Multi-object recognition
* Confidence-based filtering
* Real-time frame inference

---

## 🧠 AI Surveillance Intelligence

* Suspicious activity analysis
* Person-count reasoning
* AI-generated surveillance alerts
* Intelligent event interpretation
* Dynamic incident generation

---

## 📊 Dynamic Incident Timeline

* Real-time incident insertion
* AI-generated surveillance events
* Threat categorization
* Live dashboard updates

---

## 🌌 Futuristic Cyber Dashboard

* Cinematic surveillance UI
* Neon cyber-security inspired interface
* Animated system indicators
* Tactical surveillance aesthetic
* Interactive upload experience

---

# 🧠 How VigilX Works

```text
CCTV Video Upload
        ↓
FastAPI Backend
        ↓
OpenCV Frame Extraction
        ↓
YOLOv8 Object Detection
        ↓
Surveillance Analysis Engine
        ↓
AI Alert Generation
        ↓
Frontend Visualization
```

The system processes uploaded surveillance footage frame-by-frame, performs AI-based object detection, analyzes surveillance activity, and visualizes the generated intelligence directly on the dashboard.

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

| Technology  | Purpose             |
| ----------- | ------------------- |
| YOLOv8      | Object detection    |
| OpenCV      | Video processing    |
| Ultralytics | YOLO implementation |

---

# 📂 Project Structure

```bash
VigilX/
│
├── backend/
│   ├── services/
│   │   ├── analyzer.py
│   │   ├── detector.py
│   │   └── video_processor.py
│   │
│   ├── uploads/
│   ├── venv/
│   └── main.py
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
✅ YOLOv8 object detection
✅ Human detection
✅ Confidence-based filtering
✅ AI-generated surveillance alerts
✅ Dynamic incident generation
✅ Frontend-backend communication
✅ Futuristic surveillance dashboard
✅ Real-time surveillance visualization

---

# 🧪 AI Detection Logic

Currently, VigilX uses:

* YOLOv8 object detection
* Frame-level surveillance analysis
* Confidence-based detection filtering
* Rule-based suspicious activity reasoning

Example:

```python
if detection["class_id"] == 0 and detection["confidence"] > 0.5:
```

The system identifies human detections and generates surveillance alerts based on analyzed scene conditions.

---

# ⚠️ Current Limitations

The current implementation still faces challenges common in real-world surveillance systems:

* Duplicate detections in crowded scenes
* Motion blur during fights or rapid movement
* Unstable participant counting
* Occlusion issues
* Lack of persistent identity tracking

These limitations were identified during CCTV fight-scene testing.

---

# 🔮 Future Improvements

## 🎯 Movement Tracking

* ByteTrack integration
* DeepSORT integration
* Persistent identity tracking
* Unique participant estimation

---

## 🧠 Advanced Behavioral Analysis

* Fight detection
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

> Add dashboard screenshots here.

```bash
screenshots/dashboard.png
```

---

## 🚨 AI Analysis Results

> Add AI alert screenshots here.

```bash
screenshots/analysis.png
```

---

# 🛠️ Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/VigilX.git
```

---

# 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 📄 API Documentation

FastAPI Swagger documentation:

```bash
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

VigilX is still evolving.

The current version focuses on:

* AI surveillance foundations
* object detection pipelines
* intelligent alert generation
* frontend-backend integration

Future versions aim to push toward:

* advanced behavioral analysis
* movement tracking
* real-time threat intelligence
* production-grade surveillance systems.

