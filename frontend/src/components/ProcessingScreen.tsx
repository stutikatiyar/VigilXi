"use client"

import { useEffect, useState } from "react"

const STAGES = [
  { id: 1, label: "Uploading footage", duration: 2000 },
  { id: 2, label: "Extracting frames", duration: 4000 },
  { id: 3, label: "Running YOLO detection", duration: 8000 },
  { id: 4, label: "Analyzing poses", duration: 5000 },
  { id: 5, label: "Generating incident report", duration: 3000 },
]

export default function ProcessingScreen({ onCancel }: { onCancel: () => void }) {
  const [currentStage, setCurrentStage] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    let stageIndex = 0

    function nextStage() {
      if (stageIndex < STAGES.length) {
        setCurrentStage(stageIndex)
        stageIndex++
        if (stageIndex < STAGES.length) {
          setTimeout(nextStage, STAGES[stageIndex - 1].duration)
        }
      }
    }

    nextStage()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".")
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-black/60 backdrop-blur-xl p-8">

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-cyan-300 text-lg font-bold tracking-widest">
            AI PROCESSING{dots}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition text-sm"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-5">
        {STAGES.map((stage, index) => {
          const isDone = index < currentStage
          const isActive = index === currentStage

          return (
            <div key={stage.id} className="flex items-center gap-4">

              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-500 ${
                isDone ? "bg-green-500/20 border-green-500/50 text-green-400"
                : isActive ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 animate-pulse"
                : "bg-white/5 border-white/10 text-gray-600"
              }`}>
                {isDone ? "✓" : stage.id}
              </div>

              <div className="flex-1">
                <p className={`text-sm font-medium tracking-wider transition-all duration-500 ${
                  isDone ? "text-green-400"
                  : isActive ? "text-cyan-300"
                  : "text-gray-600"
                }`}>
                  {stage.label.toUpperCase()}
                </p>
                {isActive && (
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full animate-pulse w-3/4" />
                  </div>
                )}
              </div>

              <div className={`text-xs tracking-widest ${
                isDone ? "text-green-400"
                : isActive ? "text-cyan-400 animate-pulse"
                : "text-gray-700"
              }`}>
                {isDone ? "DONE" : isActive ? "RUNNING" : "WAITING"}
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}