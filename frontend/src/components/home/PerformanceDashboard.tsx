"use client"

import { motion } from "framer-motion"
import FadeIn from "@/components/ui/FadeIn"


const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

interface Metrics {
  frame_extraction?: number
  yolo_detection?: number
  threat_analysis?: number
  pose_analysis?: number
  video_rendering?: number
  total_processing?: number
  frames_read?: number
  frames_processed?: number
  frames_skipped?: number
  average_yolo_per_frame?: number
  processing_fps?: number
  yolo_runtime_percent?: number
  alerts_generated?: number
  snapshots_generated?: number
}

function BarMetric({
  label,
  value,
  max,
  unit,
  color,
  delay,
}: {
  label: string
  value: number
  max: number
  unit: string
  color: string
  delay: number
}) {
  const pct = Math.min((value / max) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <p style={mono} className="text-xs text-gray-500 tracking-widest">{label}</p>
       <p style={mono} className={`text-xs font-bold ${color}`}>
  {value < 0.001 ? "<0.001" : value}{unit}
</p>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, 0.5)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color === "text-cyan-400" ? "from-cyan-400/60 to-cyan-400" : color === "text-red-400" ? "from-red-400/60 to-red-400" : color === "text-yellow-400" ? "from-yellow-400/60 to-yellow-400" : color === "text-purple-400" ? "from-purple-400/60 to-purple-400" : color === "text-green-400" ? "from-green-400/60 to-green-400" : "from-orange-400/60 to-orange-400"}`}
        />
      </div>
    </motion.div>
  )
}

function StatBadge({
  label,
  value,
  unit,
  color,
  delay,
  pulse,
}: {
  label: string
  value: number | string
  unit?: string
  color: string
  delay: number
  pulse?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`relative rounded-2xl border bg-black/60 p-4 text-center backdrop-blur-xl overflow-hidden group ${
        color === "text-cyan-400" ? "border-cyan-400/20" :
        color === "text-red-400" ? "border-red-500/20" :
        color === "text-yellow-400" ? "border-yellow-500/20" :
        color === "text-purple-400" ? "border-purple-500/20" :
        color === "text-green-400" ? "border-green-500/20" :
        "border-orange-500/20"
      }`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        color === "text-cyan-400" ? "bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06),transparent_70%)]" :
        color === "text-red-400" ? "bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.06),transparent_70%)]" :
        color === "text-yellow-400" ? "bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.06),transparent_70%)]" :
        color === "text-purple-400" ? "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_70%)]" :
        color === "text-green-400" ? "bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.06),transparent_70%)]" :
        "bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.06),transparent_70%)]"
      }`} />

      {pulse && (
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
            color === "text-cyan-400" ? "bg-cyan-400" :
            color === "text-red-400" ? "bg-red-400" :
            color === "text-yellow-400" ? "bg-yellow-400" :
            color === "text-purple-400" ? "bg-purple-400" :
            color === "text-green-400" ? "bg-green-400" :
            "bg-orange-400"
          }`}
        />
      )}

      <p style={mono} className="text-gray-600 text-xs tracking-widest mb-1">{label}</p>
      <p style={display} className={`text-2xl font-black ${color}`}>
        {value}<span className="text-xs ml-1 font-normal text-gray-500">{unit}</span>
      </p>
    </motion.div>
  )
}

export default function PerformanceDashboard({ metrics }: { metrics: Metrics }) {
  const totalTime = metrics.total_processing ?? 1

  return (
    <FadeIn className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
          <h3 style={display} className="text-lg font-bold text-cyan-300 tracking-widest">
            PERFORMANCE METRICS
          </h3>
        </div>
        <div style={mono} className="text-xs text-gray-600 tracking-widest">
          TOTAL: {metrics.total_processing}s
        </div>
      </div>

      <div className="p-6 space-y-8">

        {/* PIPELINE TIMINGS */}
        <div>
          <p style={mono} className="text-xs tracking-[0.3em] text-cyan-400/60 mb-4">
            PIPELINE TIMINGS
          </p>
          <div className="space-y-4">
            <BarMetric label="FRAME EXTRACTION" value={metrics.frame_extraction ?? 0} max={totalTime} unit="s" color="text-cyan-400" delay={0} />
            <BarMetric label="YOLO DETECTION" value={metrics.yolo_detection ?? 0} max={totalTime} unit="s" color="text-red-400" delay={0.1} />
            <BarMetric label="POSE ANALYSIS" value={metrics.pose_analysis ?? 0} max={totalTime} unit="s" color="text-purple-400" delay={0.2} />
            <BarMetric label="THREAT ANALYSIS" value={metrics.threat_analysis ?? 0} max={totalTime} unit="s" color="text-yellow-400" delay={0.3} />
            <BarMetric label="VIDEO RENDERING" value={metrics.video_rendering ?? 0} max={totalTime} unit="s" color="text-green-400" delay={0.4} />
          </div>
        </div>

        {/* YOLO DOMINANCE INDICATOR */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <p style={mono} className="text-xs text-red-400/60 tracking-widest">YOLO RUNTIME DOMINANCE</p>
            <p style={mono} className="text-xs font-bold text-red-400">{metrics.yolo_runtime_percent}%</p>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${metrics.yolo_runtime_percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-500"
            />
          </div>
          <p style={mono} className="text-xs text-gray-600 mt-2">
            YOLO inference accounts for {metrics.yolo_runtime_percent}% of total processing time — primary optimization target
          </p>
        </div>

        {/* FRAME STATS */}
        <div>
          <p style={mono} className="text-xs tracking-[0.3em] text-cyan-400/60 mb-4">FRAME STATISTICS</p>
          <div className="grid grid-cols-3 gap-3">
            <StatBadge label="FRAMES READ" value={metrics.frames_read ?? 0} unit="frames" color="text-cyan-400" delay={0} pulse />
            <StatBadge label="PROCESSED" value={metrics.frames_processed ?? 0} unit="frames" color="text-green-400" delay={0.1} pulse />
            <StatBadge label="SKIPPED" value={metrics.frames_skipped ?? 0} unit="frames" color="text-yellow-400" delay={0.2} />
          </div>
        </div>

        {/* PERFORMANCE STATS */}
        <div>
          <p style={mono} className="text-xs tracking-[0.3em] text-cyan-400/60 mb-4">PERFORMANCE</p>
          <div className="grid grid-cols-3 gap-3">
            <StatBadge label="AVG YOLO/FRAME" value={metrics.average_yolo_per_frame ?? 0} unit="s/frame" color="text-red-400" delay={0} />
            <StatBadge label="PROCESSING FPS" value={metrics.processing_fps ?? 0} unit="FPS" color="text-purple-400" delay={0.1} pulse />
            <StatBadge label="TOTAL TIME" value={metrics.total_processing ?? 0} unit="s" color="text-cyan-400" delay={0.2} />
          </div>
        </div>

        {/* INCIDENT STATS */}
        <div>
          <p style={mono} className="text-xs tracking-[0.3em] text-cyan-400/60 mb-4">INCIDENT SUMMARY</p>
          <div className="grid grid-cols-2 gap-3">
            <StatBadge label="ALERTS GENERATED" value={metrics.alerts_generated ?? 0} unit="alerts" color="text-red-400" delay={0} pulse />
            <StatBadge label="SNAPSHOTS SAVED" value={metrics.snapshots_generated ?? 0} unit="files" color="text-green-400" delay={0.1} />
          </div>
        </div>

      </div>
    </FadeIn>
  )
}