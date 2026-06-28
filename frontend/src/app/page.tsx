"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Capabilities from "@/components/home/Capabilities"
import Pipeline from "@/components/home/Pipeline"
import TechStack from "@/components/home/TechStack"
import Stats from "@/components/home/Stats"
import CTA from "@/components/home/CTA"
import Footer from "@/components/home/Footer"


const API_URL = "https://proving-grudging-earflap.ngrok-free.dev"

interface SystemStatus {
  videos_processed: number
  processing_jobs: number
  active_alerts: number
  ai_status: string
  neural_engine: string
}

export default function Home() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [backendOnline, setBackendOnline] = useState(false)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch(`${API_URL}/system-status`, {
  headers: { "ngrok-skip-browser-warning": "true" },
})
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.15),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,140,255,0.12),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <Navbar />
      <Hero backendOnline={backendOnline} />
      <About />
      <Capabilities />
      <Pipeline />
      <TechStack />
      <Stats status={status} backendOnline={backendOnline} />
      <CTA />
      <Footer />
    </main>
  )
}