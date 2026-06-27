"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { uploadVideo, pollResult } from "@/services/api"
import ProcessingScreen from "@/components/ProcessingScreen"
import { Video } from "lucide-react"

const API_URL = "https://legendary-palm-tree-xr597rpqpvfvj7v-8000.app.github.dev"

export default function AnalyzePage() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const pollRef = useRef<NodeJS.Timeout | null>(null)

  const [result, setResult] = useState<{
    filename: string
    status: string
    total_frames: number
    processed_video: string
    snapshot?: string
    metrics?: Record<string, number>
    analysis: {
      alert: boolean
      message: string
      people_detected: number
      interactions: string[]
      pose_events?: string[]
    }
  } | null>(null)

  useEffect(() => {
    if (!jobId) return

    pollRef.current = setInterval(async () => {
      try {
        const data = await pollResult(jobId)

        if (data.status === "done") {
          clearInterval(pollRef.current!)
          setResult(data)
          setLoading(false)
          setJobId(null)
        } else if (data.status === "error") {
          clearInterval(pollRef.current!)
          console.error("Processing error:", data.error)
          setLoading(false)
          setJobId(null)
        }
      } catch (err) {
        console.error("Poll error:", err)
      }
    }, 3000)

    return () => clearInterval(pollRef.current!)
  }, [jobId])

  async function handleUpload() {
    if (!selectedFile) return
    try {
      setLoading(true)
      setResult(null)
      const response = await uploadVideo(selectedFile)
      setJobId(response.job_id)
    } catch (error) {
      console.error("Upload failed:", error)
      setLoading(false)
    }
  }

  const cancelAnalysis = () => {
    if (pollRef.current) clearInterval(pollRef.current)
    setLoading(false)
    setJobId(null)
  }

  const analysis = result?.analysis

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.08),transparent_35%)] pointer-events-none" />
      <div className="fixed inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md">
        <Link href="/">
          <div>
            <h1 className="text-2xl font-bold tracking-[0.3em] text-cyan-400">VIGILXI</h1>
            <p className="text-xs text-gray-500 tracking-[0.4em] mt-1">AI SURVEILLANCE SYSTEM</p>
          </div>
        </Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition">Dashboard</Link>
          <Link href="/analyze" className="text-cyan-400">Analyze</Link>
          <Link href="/incidents" className="hover:text-cyan-400 transition">Incidents</Link>
          <Link href="/analytics" className="hover:text-cyan-400 transition">Analytics</Link>
        </div>
      </nav>

      <div className="px-10 py-10">

        {/* PAGE TITLE */}
        <div className="mb-10">
          <h2 className="text-4xl font-black tracking-[0.2em] text-cyan-400">
            SURVEILLANCE ANALYSIS
          </h2>
          <p className="mt-2 text-gray-500 tracking-widest text-sm">
            UPLOAD CCTV FOOTAGE FOR AI-POWERED THREAT DETECTION
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div className="max-w-3xl rounded-3xl border border-cyan-400/20 bg-black/40 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">

          <label className="group relative flex flex-col items-center justify-center h-52 rounded-3xl border border-dashed border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-transparent cursor-pointer overflow-hidden transition duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]">

            <div className="absolute top-4 left-6 text-xs text-cyan-400/60 tracking-widest">FEED_01</div>
            <div className="absolute bottom-4 right-6 text-xs text-cyan-400/60 tracking-widest">AI_ACTIVE</div>

            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setSelectedFile(file)
              }}
            />

            <div className="flex flex-col items-center">
              <Video className="w-10 h-10 text-cyan-400 mb-3" />
              <p className="text-2xl font-black tracking-widest text-cyan-300">
                UPLOAD SURVEILLANCE FOOTAGE
              </p>
              <p className="mt-3 text-sm text-gray-500 tracking-widest">
                MP4 / CCTV / SECURITY FEED
              </p>
              {selectedFile && (
                <p className="mt-5 text-green-400 font-bold">
                  ✓ {selectedFile.name}
                </p>
              )}
            </div>
          </label>

          <button
            onClick={handleUpload}
            disabled={loading || !selectedFile}
            className="mt-8 w-full px-10 py-4 rounded-2xl bg-cyan-400 text-black font-black tracking-widest text-lg hover:scale-[1.02] transition duration-300 shadow-[0_0_30px_rgba(0,255,255,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "AI PROCESSING..." : "START AI ANALYSIS"}
          </button>
        </div>

        {/* PROCESSING SCREEN */}
        {loading && (
          <div className="max-w-3xl mt-6">
            <ProcessingScreen onCancel={cancelAnalysis} />
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="mt-12 space-y-8">

            {/* TOP ROW — Video + Threat Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* VIDEO */}
              <div className="rounded-3xl border border-cyan-400/20 bg-black/40 p-4 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">
                <h3 className="text-xl font-bold text-cyan-300 mb-4 tracking-widest">
                  PROCESSED SURVEILLANCE FEED
                </h3>
                <video
                  muted
                  key={result.processed_video}
                  controls
                  autoPlay
                  className="w-full rounded-2xl border border-cyan-400/20"
                >
                  <source src={`${API_URL}/${result.processed_video}`} type="video/mp4" />
                </video>
                <div className="mt-3 flex gap-4 text-xs text-gray-500">
                  <span>FRAMES: {result.total_frames}</span>
                  <span>FILE: {result.filename}</span>
                </div>
              </div>

              {/* THREAT PANEL */}
              <div className="rounded-3xl border border-red-500/20 bg-black/40 p-6 backdrop-blur-xl">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black tracking-widest text-red-400">
                    THREAT INTELLIGENCE
                  </h2>
                  <div className={`px-4 py-2 rounded-full text-sm font-bold tracking-widest ${
                    analysis?.alert
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}>
                    {analysis?.alert ? "HIGH RISK" : "NORMAL"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                    <p className="text-gray-400 text-xs tracking-widest mb-2">PEOPLE DETECTED</p>
                    <h3 className="text-5xl font-black text-cyan-400">{analysis?.people_detected}</h3>
                  </div>
                  <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5">
                    <p className="text-gray-400 text-xs tracking-widest mb-2">SYSTEM STATUS</p>
                    <h3 className="text-lg font-bold text-purple-300">{analysis?.message}</h3>
                  </div>
                </div>

                {/* INCIDENT FEED */}
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-red-300 mb-3 tracking-widest">LIVE INCIDENT FEED</h3>
                  <div className="space-y-3">
                    {analysis?.interactions?.length ? (
                      analysis.interactions.map((interaction, index) => (
                        <div key={index} className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-300 text-sm">
                          🚨 {interaction}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-green-300 text-sm">
                        No suspicious interactions detected
                      </div>
                    )}
                  </div>
                </div>

                {/* POSE EVENTS */}
                {analysis?.pose_events && analysis.pose_events.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-yellow-300 mb-3 tracking-widest">POSE ANALYSIS</h3>
                    <div className="space-y-3">
                      {analysis.pose_events.map((event, index) => (
                        <div key={index} className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-yellow-300 text-sm">
                          ⚠️ {event}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM ROW — Performance Metrics */}
            {result.metrics && (
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-cyan-300 mb-6 tracking-widest">
                  ⚡ PERFORMANCE METRICS
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(result.metrics).map(([key, value]) => (
                    <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-gray-500 text-xs tracking-widest mb-2">
                        {key.replace(/_/g, " ").toUpperCase()}
                      </p>
                      <p className="text-2xl font-black text-cyan-400">{value}s</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}