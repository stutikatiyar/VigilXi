"use client"
import { incidents } from "@/data/incidents";
import { systemStatus } from "@/data/systemStatus";
import { useState } from "react";
import { uploadVideo } from "@/services/api";

export default function Home() {
const [selectedFile, setSelectedFile] = useState<File | null>(null)
const [liveIncidents, setLiveIncidents] = useState(incidents)
const [result, setResult] = useState<{

  processing_result: {
    total_frames: number
    analysis: {
      alert: boolean
      message: string
      people_detected: number
    }
  }
} | null>(null)
const [loading, setLoading] = useState(false)
const handleUpload = async () => {

  if (!selectedFile) return

  setLoading(true)

  const response = await uploadVideo(selectedFile)

  setResult(response)
  const newIncident = {
  id: liveIncidents.length + 1,
  camera: "AI CAMERA",
  threat: response.processing_result.analysis.alert
    ? "HIGH"
    : "LOW",
  time: new Date().toLocaleTimeString(),
  message: response.processing_result.analysis.message,
}

setLiveIncidents([newIncident, ...liveIncidents])

  setLoading(false)
}
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.15),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,140,255,0.12),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_6px] animate-pulse" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold tracking-[0.3em] text-cyan-400">
            SENTINEL-X
          </h1>
          <p className="text-xs text-gray-500 tracking-[0.4em] mt-1">
            AI SURVEILLANCE SYSTEM
          </p>
        </div>

        <div className="flex gap-4 text-sm text-gray-400">
          <button className="hover:text-cyan-400 transition">Dashboard</button>
          <button className="hover:text-cyan-400 transition">Incidents</button>
          <button className="hover:text-cyan-400 transition">Analytics</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 rounded-full text-xs tracking-[0.3em] text-cyan-300 mb-6 shadow-lg shadow-cyan-500/20">
          REAL-TIME INCIDENT DETECTION
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
          <span className="text-white">AI</span>{" "}
          <span className="text-cyan-400">SURVEILLANCE</span>
        </h1>

        <p className="mt-8 max-w-3xl text-gray-400 text-lg leading-relaxed">
          Intelligent CCTV monitoring platform powered by Computer Vision and
          Generative AI for anomaly detection, incident analysis, and real-time
          surveillance reporting.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
            Launch System
          </button>

          <button className="border border-white/20 px-8 py-3 rounded-xl hover:bg-white/5 transition duration-300">
            View Analytics
          </button>
        </div>
      </section>
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/40 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(0,255,255,0.08)]">

  {/* Glow Effect */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_60%)]" />

  {/* Animated Border */}
  <div className="absolute inset-0 rounded-3xl border border-cyan-400/10 animate-pulse" />

  <div className="relative z-10">

    <div className="flex items-center justify-between mb-8">

      <div>
        <h2 className="text-4xl font-black tracking-[0.2em] text-cyan-400">
          AI VIDEO ANALYSIS
        </h2>

        <p className="text-gray-500 mt-2 tracking-widest text-sm">
          SURVEILLANCE INTELLIGENCE ENGINE
        </p>
      </div>

      <div className="flex items-center gap-2 text-green-400 text-sm tracking-widest">
        <div className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
        SYSTEM ONLINE
      </div>

    </div>

    <label className="group relative flex flex-col items-center justify-center h-64 rounded-3xl border border-dashed border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-transparent cursor-pointer overflow-hidden transition duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]">

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle,rgba(0,255,255,0.12),transparent_70%)]" />

      {/* Animated Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,255,0.08)_50%,transparent_100%)] bg-[length:100%_8px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center">

        <div className="text-7xl mb-5 text-cyan-400 group-hover:scale-110 transition duration-500">
          ⬆
        </div>

        <h3 className="text-2xl font-bold tracking-[0.15em] text-cyan-300">
          UPLOAD CCTV FOOTAGE
        </h3>

        <p className="text-gray-500 mt-3 tracking-wider text-sm">
          DROP SURVEILLANCE FILE OR CLICK TO BROWSE
        </p>

        {selectedFile && (
          <div className="mt-6 px-5 py-2 rounded-full border border-green-400/30 bg-green-400/10 text-green-400 text-sm tracking-widest">
            {selectedFile.name}
          </div>
        )}

      </div>

      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0])
          }
        }}
      />

    </label>
    <div className="mt-8 flex flex-col items-center">

  <button
    onClick={handleUpload}
    className="px-10 py-4 rounded-2xl bg-cyan-400 text-black font-black tracking-widest text-lg hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(0,255,255,0.35)]"
  >
    ANALYZE FOOTAGE
  </button>

  {loading && (
    <p className="mt-5 text-yellow-400 tracking-widest animate-pulse">
      PROCESSING SURVEILLANCE DATA...
    </p>
  )}

  {result && (
    <div className="mt-8 w-full max-w-2xl border border-cyan-400/20 bg-black/40 rounded-3xl p-6 backdrop-blur-xl">

      <h3 className="text-2xl font-bold text-green-400 tracking-wide">
        ANALYSIS COMPLETE
      </h3>

      <div className="mt-5 space-y-3 text-lg">

        <p className="text-gray-300">
          Frames Processed:
          <span className="text-cyan-400 ml-2 font-bold">
            {result.processing_result.total_frames}
          </span>
        </p>

        <p
          className={`font-bold ${
            result.processing_result.analysis.alert
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {result.processing_result.analysis.message}
        </p>

        <p className="text-gray-300">
          People Detected:
          <span className="text-cyan-400 ml-2 font-bold">
            {result.processing_result.analysis.people_detected}
          </span>
        </p>

      </div>

    </div>
  )}

</div>

  </div>

</div>

      <section className="relative z-10 px-10 pb-14">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-gray-500 text-sm">CAMERAS ACTIVE</p>
      <h2 className="text-4xl font-bold text-cyan-400 mt-2">
        {systemStatus.camerasActive}
      </h2>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-gray-500 text-sm">ACTIVE ALERTS</p>
      <h2 className="text-4xl font-bold text-red-400 mt-2">
        {systemStatus.activeAlerts}
      </h2>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-gray-500 text-sm">AI STATUS</p>
      <h2 className="text-2xl font-bold text-green-400 mt-4 animate-pulse">
        {systemStatus.aiStatus}
      </h2>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-gray-500 text-sm">SYSTEM LATENCY</p>
      <h2 className="text-3xl font-bold text-yellow-400 mt-3">
        {systemStatus.latency}
      </h2>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-gray-500 text-sm">NEURAL ENGINE</p>
      <h2 className="text-2xl font-bold text-cyan-300 mt-4">
        {systemStatus.neuralEngine}
      </h2>
    </div>

  </div>
</section>

      {/* CCTV Panels */}
      <section className="relative z-10 px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'CAMERA 01',
              status: 'ACTIVE',
              event: 'Suspicious movement detected',
            },
            {
              title: 'CAMERA 02',
              status: 'MONITORING',
              event: 'Normal activity',
            },
            {
              title: 'CAMERA 03',
              status: 'ALERT',
              event: 'Potential fight detected',
            },
            {
              title: 'CAMERA 04',
              status: 'TRACKING',
              event: 'Object tracking enabled',
            },
          ].map((cam, index) => (
            <div
              key={index}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              {/* Fake CCTV Feed */}
              <div className="h-72 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-xl tracking-[0.4em] font-bold">
                  LIVE FEED
                </div>

                {/* Detection Box */}
                <div className="absolute top-20 left-20 w-28 h-36 border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-pulse" />

                {/* REC */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-red-500 text-sm font-semibold tracking-wider">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  REC
                </div>

                {/* Timestamp */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
                  22:14:38
                </div>
              </div>

              {/* Camera Info */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-wide text-cyan-300">
                    {cam.title}
                  </h2>

                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 tracking-wider">
                    {cam.status}
                  </span>
                </div>

                <p className="mt-4 text-gray-400 text-sm">
                  {cam.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Incident Timeline */}
      <section className="relative z-10 px-10 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-cyan-400 tracking-wide">
              INCIDENT TIMELINE
            </h2>

            <div className="text-sm text-gray-500 tracking-widest">
              LIVE EVENT STREAM
            </div>
          </div>

          <div className="space-y-5 font-mono text-sm">
           {liveIncidents.map((incident) => (
  <div
    key={incident.id}
    className="border border-white/10 bg-black/40 rounded-xl px-5 py-4 shadow-lg"
  >
    <div className="flex items-center justify-between">

      <div>
        <p className="text-green-400 font-mono">
          {incident.time} — {incident.message}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {incident.camera}
        </p>
      </div>

      <div
        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
          incident.threat === "HIGH"
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : incident.threat === "MEDIUM"
            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            : "bg-green-500/20 text-green-400 border border-green-500/30"
        }`}
      >
        {incident.threat}
      </div>

    </div>
  </div>
))}
          </div>
        </div>
      </section>
    </main>
  )
}
