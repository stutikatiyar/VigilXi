"use client"

import Link from "next/link"
import { incidents } from "@/data/incidents"
import { systemStatus } from "@/data/systemStatus"
import { useState } from "react"

export default function Home() {

  const [liveIncidents] = useState(incidents)

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,200,0.15),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,140,255,0.12),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_6px] animate-pulse" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md">

        <div>

          <h1 className="text-2xl font-bold tracking-[0.3em] text-cyan-400">
            SENTINEL-X
          </h1>

          <p className="text-xs text-gray-500 tracking-[0.4em] mt-1">
            AI SURVEILLANCE SYSTEM
          </p>

        </div>

        <div className="flex gap-4 text-sm text-gray-400">

          <button className="hover:text-cyan-400 transition">
            Dashboard
          </button>

          <button className="hover:text-cyan-400 transition">
            Incidents
          </button>

          <button className="hover:text-cyan-400 transition">
            Analytics
          </button>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">

        <div className="border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 rounded-full text-xs tracking-[0.3em] text-cyan-300 mb-6 shadow-lg shadow-cyan-500/20">
          REAL-TIME INCIDENT DETECTION
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">

          <span className="text-white">
            AI
          </span>{" "}

          <span className="text-cyan-400">
            SURVEILLANCE
          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-gray-400 text-lg leading-relaxed">
          Intelligent CCTV monitoring platform powered by Computer Vision and
          Generative AI for anomaly detection, incident analysis, and real-time
          surveillance reporting.
        </p>

        <div className="mt-10 flex gap-4">

          <Link href="/analyze">

            <button className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
              Launch System
            </button>

          </Link>

          <button className="border border-white/20 px-8 py-3 rounded-xl hover:bg-white/5 transition duration-300">
            View Analytics
          </button>

        </div>

      </section>

      {/* System Status */}

      <section className="relative z-10 px-10 pb-14">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

            <p className="text-gray-500 text-sm">
              CAMERAS ACTIVE
            </p>

            <h2 className="text-3xl font-bold text-cyan-400 mt-2">
              {systemStatus.camerasActive}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

            <p className="text-gray-500 text-sm">
              ACTIVE ALERTS
            </p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">
              {systemStatus.activeAlerts}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

            <p className="text-gray-500 text-sm">
              AI STATUS
            </p>

            <h2 className="text-2xl font-bold text-green-400 mt-4 animate-pulse">
              {systemStatus.aiStatus}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

            <p className="text-gray-500 text-sm">
              SYSTEM LATENCY
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-3">
              {systemStatus.latency}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">

            <p className="text-gray-500 text-sm">
              NEURAL ENGINE
            </p>

            <h2 className="text-2xl font-bold text-cyan-300 mt-4">
              {systemStatus.neuralEngine}
            </h2>

          </div>

        </div>

      </section>

      {/* CCTV Panels */}

      <section className="relative z-10 px-10 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            {
              title: "CAMERA 01",
              status: "ACTIVE",
              event: "Suspicious movement detected",
            },
            {
              title: "CAMERA 02",
              status: "MONITORING",
              event: "Normal activity",
            },
            {
              title: "CAMERA 03",
              status: "ALERT",
              event: "Potential fight detected",
            },
            {
              title: "CAMERA 04",
              status: "TRACKING",
              event: "Object tracking enabled",
            },
          ].map((cam, index) => (

            <div
              key={index}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
            >

              <div className="h-72 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">

                <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-xl tracking-[0.4em] font-bold">
                  LIVE FEED
                </div>

                <div className="absolute top-20 left-20 w-28 h-36 border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-pulse" />

                <div className="absolute top-4 left-4 flex items-center gap-2 text-red-500 text-sm font-semibold tracking-wider">

                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />

                  REC

                </div>

                <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
                  22:14:38
                </div>

              </div>

              <div className="p-5">

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold tracking-wide text-cyan-300">
                    {cam.title}
                  </h2>

                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 tracking-wider">
                    {cam.status}
                  </span>

                </div>

                <p className="mt-4 text-gray-400 text-sm">
                  {cam.event}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Incident Timeline */}

      <section className="relative z-10 px-10 pb-24">

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-cyan-400 tracking-wide">
              INCIDENT TIMELINE
            </h2>

            <div className="text-sm text-gray-500 tracking-widest">
              LIVE EVENT STREAM
            </div>

          </div>

          <div className="space-y-5 font-mono text-sm">

            {liveIncidents.map((incident) => (

              <div
                key={incident.id}
                className="border border-white/10 bg-black/40 rounded-xl px-5 py-4 shadow-lg"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-green-400 font-mono">
                      {incident.time} — {incident.message}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {incident.camera}
                    </p>

                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                      incident.threat === "HIGH"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : incident.threat === "MEDIUM"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }`}
                  >
                    {incident.threat}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>

  )

}