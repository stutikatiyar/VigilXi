"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Video, ScanSearch, PersonStanding, AlertTriangle, BarChart3, Database } from "lucide-react"

const API_URL = "https://legendary-palm-tree-xr597rpqpvfvj7v-8000.app.github.dev"

interface SystemStatus {
  videos_processed: number
  processing_jobs: number
  active_alerts: number
  ai_status: string
  neural_engine: string
}

const CAPABILITIES = [
  {
    icon: Video,
    title: "Video Analysis",
    desc: "Frame-by-frame breakdown of uploaded CCTV footage, built for surveillance-grade inputs.",
  },
  {
    icon: ScanSearch,
    title: "Object Detection",
    desc: "YOLOv8-powered detection of people, vehicles, and motion across crowded scenes.",
  },
  {
    icon: PersonStanding,
    title: "Pose Estimation",
    desc: "Skeletal tracking that reads body posture and movement, not just bounding boxes.",
  },
  {
    icon: AlertTriangle,
    title: "Threat Intelligence",
    desc: "Heuristic and majority-vote reasoning that turns raw detections into a threat verdict.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Trends across every processed video — threats, people counts, processing time.",
  },
  {
    icon: Database,
    title: "Incident Database",
    desc: "Every analysis permanently stored in Postgres, ready for search and reporting.",
  },
]

const PIPELINE = [
  "Upload",
  "Frame Extraction",
  "YOLO Detection",
  "Pose Estimation",
  "Threat Analysis",
  "Incident Report",
  "Database",
]

const STACK = [
  { name: "Next.js", role: "Frontend framework" },
  { name: "FastAPI", role: "Backend API" },
  { name: "YOLOv8", role: "Object detection" },
  { name: "OpenCV", role: "Video processing" },
  { name: "Supabase", role: "Data platform" },
  { name: "PostgreSQL", role: "Incident database" },
]

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

// TYPING EFFECT HOOK
function useTypingEffect(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  return displayed
}

// ANIMATED COUNTER HOOK
function useAnimatedCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView || target === 0) return
    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return controls.stop
  }, [target, inView])
  return count
}

// FADE IN SECTION COMPONENT
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// STAT CARD WITH COUNTER
function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number | string
  color: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useAnimatedCounter(typeof value === "number" ? value : 0, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
    >
      <p style={mono} className="text-gray-500 text-xs tracking-widest mb-2">{label}</p>
      <h3 style={display} className={`text-4xl font-bold ${color}`}>
        {typeof value === "number" ? count : value}
      </h3>
    </motion.div>
  )
}

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [backendOnline, setBackendOnline] = useState(false)

  const heroLine1 = useTypingEffect("SEE EVERY", 80)
  const heroLine2 = useTypingEffect("THREAT.", 80)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(`${API_URL}/system-status`)
        const data = await res.json()
        setStatus(data)
        setBackendOnline(true)
      } catch {
        setBackendOnline(false)
      }
    }
    fetchStatus()
    const interval = setInterval(fetchStatus, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.15),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,140,255,0.12),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md"
      >
        <div>
          <h1 style={display} className="text-2xl font-bold tracking-[0.3em] text-cyan-400">VIGILXI</h1>
          <p style={mono} className="text-xs text-gray-500 tracking-[0.4em] mt-1">AI SURVEILLANCE SYSTEM</p>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/" className="text-cyan-400">Home</Link>
          <Link href="/analyze" className="hover:text-cyan-400 transition">Analyze</Link>
          <Link href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
          <Link href="/analytics" className="hover:text-cyan-400 transition">Analytics</Link>
        </div>
      </motion.nav>

      {/* HERO */}
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
          <span className="text-white">{heroLine1}</span>{" "}
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

        {/* Status Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            {
              label: backendOnline ? "Backend Online" : "Backend Offline",
              color: backendOnline ? "border-green-500/30 bg-green-500/10 text-green-400 shadow-green-500/20" : "border-red-500/30 bg-red-500/10 text-red-400",
              dot: backendOnline ? "bg-green-400" : "bg-red-400",
            },
            { label: "YOLO Loaded", color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-cyan-500/20", dot: "bg-cyan-400" },
            { label: "Pose Detection Active", color: "border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-purple-500/20", dot: "bg-purple-400" },
            { label: "Threat Engine Running", color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 shadow-yellow-500/20", dot: "bg-yellow-400" },
          ].map((pill, i) => (
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

      {/* ABOUT */}
      <FadeIn className="relative z-10 px-10 pb-24 max-w-3xl mx-auto text-center">
        <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-5">ABOUT VIGILXI</p>
        <p
          className="text-xl md:text-2xl font-normal text-gray-300 leading-snug"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          VigilXi is an AI-powered surveillance intelligence platform designed to
          analyze CCTV footage using{" "}
          <span className="text-cyan-400 font-medium">Computer Vision</span>,{" "}
          <span className="text-cyan-400 font-medium">Pose Estimation</span>, and{" "}
          <span className="text-cyan-400 font-medium">Threat Analysis</span>.
        </p>
        <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
          Rather than simply detecting objects, VigilXi interprets human activity,
          identifies suspicious interactions, and generates actionable incident
          reports for security operators.
        </p>
      </FadeIn>
{/* CORE CAPABILITIES */}
<section className="relative z-10 px-10 pb-24 overflow-hidden">

  {/* ANIMATED BACKGROUND ELEMENTS */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Rotating radar ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-400/5"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-400/5"
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-400/8"
    />

    {/* Radar sweep */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
    >
      <div className="absolute top-1/2 left-1/2 w-[400px] h-px origin-left bg-gradient-to-r from-cyan-400/30 to-transparent" />
    </motion.div>

    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3 + i,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut",
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 30}%`,
        }}
      />
    ))}

    {/* Scanning horizontal line */}
    <motion.div
      animate={{ y: ["-100%", "200%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
    />
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
            <div
              className="absolute inset-0 rounded-full border border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-300"
              style={{ transition: "transform 0.8s ease, border-color 0.3s" }}
            />
            <div className="absolute inset-1 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300 flex items-center justify-center">
              <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30 group-hover:scale-125 transition-all duration-500" />
          </div>

          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span style={mono} className="text-xs text-cyan-400/40 font-bold">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 style={display} className="text-lg font-semibold text-cyan-300 tracking-wide mb-2 group-hover:text-white transition-colors duration-300">
            {cap.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
            {cap.desc}
          </p>

          <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span style={mono} className="text-xs text-cyan-400/60 tracking-widest">ACTIVE</span>
          </div>
        </motion.div>
      )
    })}
  </div>
</section>
      {/* HOW IT WORKS */}
<section className="relative z-10 px-10 pb-24">
  <FadeIn className="text-center mb-16">
    <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">HOW VIGILXI WORKS</p>
    <h2 style={display} className="text-4xl font-bold tracking-tight">From Footage to Intelligence</h2>
  </FadeIn>

  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between relative">

      {/* Connecting line */}
      <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent z-0" />

      {PIPELINE.map((step, i) => (
        <FadeIn key={step} delay={i * 0.12} className="relative z-10 flex flex-col items-center">

          {/* Node */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-full border-2 border-cyan-400/50 bg-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_35px_rgba(0,255,255,0.5)] hover:border-cyan-400 transition-all duration-300 cursor-default"
          >
            <span style={mono} className="text-cyan-400 text-sm font-bold">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Label */}
          <p style={display} className="text-xs font-semibold text-cyan-300 tracking-wide text-center whitespace-nowrap">
            {step}
          </p>

          {/* Dot under label */}
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 mt-2" />

        </FadeIn>
      ))}
    </div>
  </div>
</section>

      {/* TECH STACK */}
      <section className="relative z-10 px-10 pb-24">
        <FadeIn className="text-center mb-12">
          <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">TECHNOLOGY STACK</p>
          <h2 style={display} className="text-4xl font-bold tracking-tight">Built On</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {STACK.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl hover:border-cyan-400/40 transition duration-300">
                <p style={display} className="text-base font-semibold text-white tracking-wide">{tech.name}</p>
                <p className="text-xs text-gray-500 mt-1">{tech.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECT STATISTICS */}
      <section className="relative z-10 px-10 pb-24">
        <FadeIn className="text-center mb-12">
          <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-3">PROJECT STATISTICS</p>
          <h2 style={display} className="text-4xl font-bold tracking-tight">Live From The System</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          <StatCard label="VIDEOS PROCESSED" value={status?.videos_processed ?? 0} color="text-cyan-400" />
          <StatCard label="ACTIVE ALERTS" value={status?.active_alerts ?? 0} color="text-red-400" />
          <StatCard label="NEURAL ENGINE" value={status?.neural_engine ?? "—"} color="text-purple-300" />
          <StatCard label="BACKEND STATUS" value={backendOnline ? "ONLINE" : "OFFLINE"} color={backendOnline ? "text-green-400" : "text-red-400"} />
        </div>
      </section>

      {/* CTA */}
      <FadeIn className="relative z-10 px-10 pb-28">
        <div className="max-w-3xl mx-auto rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-transparent p-12 text-center backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.1)]">
          <h2 style={display} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to analyze surveillance footage?
          </h2>
          <p className="text-gray-400 mb-8">
            Upload a video and let VigilXi do the watching.
          </p>
          <Link href="/analyze">
            <button className="bg-cyan-400 text-black px-10 py-4 rounded-xl font-bold tracking-wide hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
              Launch System →
            </button>
          </Link>
        </div>
      </FadeIn>

      <footer style={mono} className="relative z-10 border-t border-white/10 px-10 py-8 text-center text-xs text-gray-600 tracking-widest">
        VIGILXI — AI SURVEILLANCE INTELLIGENCE PLATFORM
      </footer>

    </main>
  )
}