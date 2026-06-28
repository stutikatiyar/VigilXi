"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTypingEffect } from "@/hooks/useTypingEffect"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

export default function Hero({ backendOnline }: { backendOnline: boolean }) {
  const heroLine1 = useTypingEffect("SEE EVERY", 80)
  const heroLine2 = useTypingEffect("THREAT.", 80)

  const pills = [
    {
      label: backendOnline ? "Backend Online" : "Backend Offline",
      color: backendOnline ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400",
      dot: backendOnline ? "bg-green-400" : "bg-red-400",
    },
    { label: "YOLO Loaded", color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400", dot: "bg-cyan-400" },
    { label: "Pose Detection Active", color: "border-purple-500/30 bg-purple-500/10 text-purple-400", dot: "bg-purple-400" },
    { label: "Threat Engine Running", color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400", dot: "bg-yellow-400" },
  ]

  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={mono}
        className="border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 rounded-full text-xs tracking-[0.3em] text-cyan-300 mb-6 shadow-lg shadow-cyan-500/20"
      >
        AI SURVEILLANCE INTELLIGENCE
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={display}
        className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
      >
        <span className="text-white">{heroLine1}</span>
        <br />
        <span className="text-cyan-400">{heroLine2}</span>
        <span className="animate-pulse text-cyan-400">|</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-8 max-w-2xl text-gray-400 text-lg leading-relaxed"
      >
        Transform surveillance footage into actionable security intelligence —
        powered by Computer Vision, Pose Estimation, and AI Threat Analysis.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {pills.map((pill, i) => (
          <motion.span
            key={pill.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + i * 0.1 }}
            className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full border shadow-lg ${pill.color}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${pill.dot}`} />
            {pill.label}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="mt-10 flex gap-4"
      >
        <Link href="/analyze">
          <button className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
            Launch System
          </button>
        </Link>
        <Link href="/analytics">
          <button className="border border-white/20 px-8 py-3 rounded-xl hover:bg-white/5 transition duration-300">
            View Analytics
          </button>
        </Link>
      </motion.div>
    </section>
  )
}