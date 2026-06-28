"use client"
import { motion } from "framer-motion"
import { Video, ScanSearch, PersonStanding, AlertTriangle, BarChart3, Database } from "lucide-react"
import FadeIn from "@/components/ui/FadeIn"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

const CAPABILITIES = [
  { icon: Video, title: "Video Analysis", desc: "Frame-by-frame breakdown of uploaded CCTV footage, built for surveillance-grade inputs." },
  { icon: ScanSearch, title: "Object Detection", desc: "YOLOv8-powered detection of people, vehicles, and motion across crowded scenes." },
  { icon: PersonStanding, title: "Pose Estimation", desc: "Skeletal tracking that reads body posture and movement, not just bounding boxes." },
  { icon: AlertTriangle, title: "Threat Intelligence", desc: "Heuristic and majority-vote reasoning that turns raw detections into a threat verdict." },
  { icon: BarChart3, title: "Analytics", desc: "Trends across every processed video — threats, people counts, processing time." },
  { icon: Database, title: "Incident Database", desc: "Every analysis permanently stored in Postgres, ready for search and reporting." },
]

export default function Capabilities() {
  return (
    <section className="relative z-10 px-10 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-400/5" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-400/5" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-400/5" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute top-1/2 left-1/2 w-[400px] h-px origin-left bg-gradient-to-r from-cyan-400/30 to-transparent" />
        </motion.div>
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }} className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 30}%` }} />
        ))}
        <motion.div animate={{ y: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }} className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>

      <FadeIn className="text-center mb-12">
        <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">CORE CAPABILITIES</p>
        <h2 style={display} className="text-4xl font-bold tracking-tight">What VigilXi Can Do</h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur-xl overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.08),transparent_60%)]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-500" />
              <div className="relative w-14 h-14 mb-5">
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-300" />
                <div className="absolute inset-1 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30 group-hover:scale-125 transition-all duration-500" />
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={mono} className="text-xs text-cyan-400/40 font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 style={display} className="text-lg font-semibold text-cyan-300 tracking-wide mb-2 group-hover:text-white transition-colors duration-300">{cap.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">{cap.desc}</p>
              <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span style={mono} className="text-xs text-cyan-400/60 tracking-widest">ACTIVE</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}