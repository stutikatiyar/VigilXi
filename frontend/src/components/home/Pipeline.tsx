"use client"
import { motion } from "framer-motion"
import FadeIn from "@/components/ui/FadeIn"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

const PIPELINE = ["Upload", "Frame Extraction", "YOLO Detection", "Pose Estimation", "Threat Analysis", "Incident Report", "Database"]

export default function Pipeline() {
  return (
    <section className="relative z-10 px-10 pb-24">
      <FadeIn className="text-center mb-16">
        <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">HOW VIGILXI WORKS</p>
        <h2 style={display} className="text-4xl font-bold tracking-tight">From Footage to Intelligence</h2>
      </FadeIn>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-0" />
          {PIPELINE.map((step, i) => (
            <FadeIn key={step} delay={i * 0.12} className="relative z-10 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 rounded-full border-2 border-cyan-400/50 bg-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_35px_rgba(0,255,255,0.5)] hover:border-cyan-400 transition-all duration-300 cursor-default"
              >
                <span style={mono} className="text-cyan-400 text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
              </motion.div>
              <p style={display} className="text-xs font-semibold text-cyan-300 tracking-wide text-center whitespace-nowrap">{step}</p>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 mt-2" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}