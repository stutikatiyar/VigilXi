"use client"
import { motion } from "framer-motion"
import FadeIn from "@/components/ui/FadeIn"
import StatCard from "@/components/ui/StatCard"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

interface SystemStatus {
  videos_processed: number
  active_alerts: number
  neural_engine: string
}

const STAT_CARDS = [
  {
    key: "videos",
    label: "VIDEOS PROCESSED",
    color: "text-cyan-400",
    border: "border-cyan-400/20",
    dot: "bg-cyan-400",
    glow: "rgba(0,255,255,0.06)",
    ringColor: "rgba(0,255,255,0.15)",
  },
  {
    key: "alerts",
    label: "ACTIVE ALERTS",
    color: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
    glow: "rgba(255,0,0,0.06)",
    ringColor: "rgba(255,0,0,0.15)",
  },
]

export default function Stats({
  status,
  backendOnline,
}: {
  status: SystemStatus | null
  backendOnline: boolean
}) {
  return (
    <section className="relative z-10 px-10 pb-24 overflow-hidden">

      {/* Animated grid */}
      <motion.div
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px]"
      />

      {/* Scan line */}
      <motion.div
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-cyan-400/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-cyan-400/20 pointer-events-none" />

      <FadeIn className="text-center mb-12">
        <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">PROJECT STATISTICS</p>
        <h2 style={display} className="text-4xl font-bold tracking-tight">Live From The System</h2>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto relative z-10">

        {/* Videos + Alerts */}
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`group relative rounded-2xl border ${card.border} bg-black/60 p-6 text-center backdrop-blur-xl overflow-hidden`}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${card.glow}, transparent 70%)` }}
            />

            {/* Pulse ring on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ border: `1px solid ${card.ringColor}` }}
            />

            {/* Status dot */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className={`absolute top-3 right-3 w-2 h-2 rounded-full ${card.dot}`}
            />

            <p style={mono} className="text-gray-500 text-xs tracking-widest mb-3">{card.label}</p>
            <StatCard
              label=""
              value={card.key === "videos" ? status?.videos_processed ?? 0 : status?.active_alerts ?? 0}
              color={card.color}
            />
          </motion.div>
        ))}

        {/* Neural Engine */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -4 }}
          className="group relative rounded-2xl border border-purple-500/20 bg-black/60 p-6 text-center backdrop-blur-xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_70%)]" />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute top-3 right-3 w-2 h-2 rounded-full bg-purple-400"
          />

          {/* Spinning ring decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 w-16 h-16 rounded-full border border-purple-400/10"
          />

          <p style={mono} className="text-gray-500 text-xs tracking-widest mb-3">NEURAL ENGINE</p>
          <h3 style={display} className="text-2xl font-bold text-purple-300 mt-1 group-hover:text-purple-200 transition-colors">
            {status?.neural_engine ?? "—"}
          </h3>
        </motion.div>

        {/* Backend Status */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.36, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -4 }}
          className={`group relative rounded-2xl border bg-black/60 p-6 text-center backdrop-blur-xl overflow-hidden ${
            backendOnline ? "border-green-500/20" : "border-red-500/20"
          }`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            backendOnline
              ? "bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.06),transparent_70%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08),transparent_70%)]"
          }`} />

          {/* Pulsing status indicator */}
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: backendOnline ? [1, 1.4, 1] : [1, 1.8, 1],
            }}
            transition={{ duration: backendOnline ? 2 : 0.6, repeat: Infinity }}
            className={`absolute top-3 right-3 w-2 h-2 rounded-full ${backendOnline ? "bg-green-400" : "bg-red-400"}`}
          />

          {/* Outer ring for online state */}
          {backendOnline && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full border border-green-400/50"
            />
          )}

          <p style={mono} className="text-gray-500 text-xs tracking-widest mb-3">BACKEND STATUS</p>
          <h3 style={display} className={`text-2xl font-bold mt-1 transition-colors ${
            backendOnline ? "text-green-400 group-hover:text-green-300" : "text-red-400 group-hover:text-red-300"
          }`}>
            {backendOnline ? "ONLINE" : "OFFLINE"}
          </h3>
        </motion.div>

      </div>
    </section>
  )
}