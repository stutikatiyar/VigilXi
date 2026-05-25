"use client"

import { useState } from "react"

import { uploadVideo } from "@/services/api"
import Image from "next/image"

export default function AnalyzePage() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<{
  filename: string
  status: string
  total_frames: number
  processed_video: string
  snapshot?: string
  analysis: {
    alert: boolean
    message: string
    people_detected: number
    interactions: string[]
  }
} | null>(null)

  async function handleUpload() {

    if (!selectedFile) return

    try {

      setLoading(true)

      const response = await uploadVideo(selectedFile)
      console.log("BACKEND RESPONSE:", response)

      console.log(response)

      setResult(response)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  const analysis = result?.analysis

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-6xl font-black tracking-[0.3em] text-cyan-400">
          VIGILX
        </h1>

        <p className="mt-4 text-gray-400 tracking-widest">
          AI SURVEILLANCE ANALYSIS WORKSPACE
        </p>

      </div>

      {/* UPLOAD SECTION */}

      <div className="max-w-3xl rounded-3xl border border-cyan-400/20 bg-black/40 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">

        <label className="group relative flex flex-col items-center justify-center h-52 rounded-3xl border border-dashed border-cyan-400/20 bg-gradient-to-br from-cyan-400/5 to-transparent cursor-pointer overflow-hidden transition duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]">

          <div className="absolute top-4 left-6 text-xs text-cyan-400/60 tracking-widest">
            FEED_01
          </div>

          <div className="absolute bottom-4 right-6 text-xs text-cyan-400/60 tracking-widest">
            AI_ACTIVE
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

          <div className="flex flex-col items-center">

            <p className="text-2xl font-black tracking-widest text-cyan-300">
              UPLOAD SURVEILLANCE FOOTAGE
            </p>

            <p className="mt-3 text-sm text-gray-500 tracking-widest">
              MP4 / CCTV / SECURITY FEED
            </p>

            {selectedFile && (

              <p className="mt-5 text-green-400 font-bold">
                {selectedFile.name}
              </p>

            )}

          </div>

        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-8 w-full px-10 py-4 rounded-2xl bg-cyan-400 text-black font-black tracking-widest text-lg hover:scale-[1.02] transition duration-300 shadow-[0_0_30px_rgba(0,255,255,0.35)] disabled:opacity-50"
        >
          {loading
            ? "PROCESSING..."
            : "START AI ANALYSIS"}
        </button>

      </div>

      {/* RESULTS */}

      {result && (
        
        
        

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

          {/* VIDEO PANEL */}

          <div className="rounded-3xl border border-cyan-400/20 bg-black/40 p-4 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">

            <h3 className="text-xl font-bold text-cyan-300 mb-4 tracking-widest">
              PROCESSED SURVEILLANCE FEED
            </h3>

            <video muted
              key={result.processed_video}
              controls
              autoPlay
              className="w-full rounded-2xl border border-cyan-400/20"
            >
              <source
                src={`http://127.0.0.1:8000/${result.processed_video}`}
                type="video/mp4"
              />
            </video>
            <pre className="text-green-400 text-xs">
  {JSON.stringify(result, null, 2)}
</pre>
            {/* {typeof result?.snapshot === "string" && (

  <div className="mt-8 rounded-3xl border border-yellow-400/20 bg-black/40 p-4">

    <h3 className="text-xl font-bold text-yellow-300 tracking-widest mb-4">
      INCIDENT SNAPSHOT
    </h3>

    <Image
    src={`http://127.0.0.1:8000/${result.snapshot}`}
    alt="Incident Snapshot"
    width={900}
    height={600}
    unoptimized
    className="w-full rounded-2xl border border-yellow-400/20"
/>

  </div>

)} */}

          </div>

          {/* ANALYSIS PANEL */}

          <div className="rounded-3xl border border-red-500/20 bg-black/40 p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-black tracking-widest text-red-400">
                THREAT INTELLIGENCE
              </h2>

              <div
                className={`px-4 py-2 rounded-full text-sm font-bold tracking-widest ${
                  analysis?.alert
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}
              >
                {analysis?.alert
                  ? "HIGH RISK"
                  : "NORMAL"}
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">

                <p className="text-gray-400 text-sm tracking-widest mb-2">
                  PEOPLE DETECTED
                </p>

                <h3 className="text-5xl font-black text-cyan-400">
                  {analysis?.people_detected}
                </h3>

              </div>

              <div className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5">

                <p className="text-gray-400 text-sm tracking-widest mb-2">
                  SYSTEM STATUS
                </p>

                <h3 className="text-xl font-bold text-purple-300">
                  {analysis?.message}
                </h3>

              </div>

            </div>

            {/* INCIDENT FEED */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-red-300 mb-4 tracking-widest">
                LIVE INCIDENT FEED
              </h3>

              <div className="space-y-4">

                {analysis?.interactions?.length  ? (

                  analysis.interactions?.map(
                    (interaction: string, index: number) => (

                      <div
                        key={index}
                        className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300 hover:scale-[1.02] transition-all duration-300"
                      >
                        🚨 {interaction}
                      </div>

                    )
                  )

                ) : (

                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-300">
                    No suspicious interactions detected
                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}