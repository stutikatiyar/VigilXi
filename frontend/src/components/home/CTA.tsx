"use client"
import Link from "next/link"
import FadeIn from "@/components/ui/FadeIn"

const display = { fontFamily: "var(--font-display)" }

export default function CTA() {
  return (
    <FadeIn className="relative z-10 px-10 pb-28">
      <div className="max-w-3xl mx-auto rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-transparent p-12 text-center backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.1)]">
        <h2 style={display} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to analyze surveillance footage?
        </h2>
        <p className="text-gray-400 mb-8">Upload a video and let VigilXi do the watching.</p>
        <Link href="/analyze">
          <button className="bg-cyan-400 text-black px-10 py-4 rounded-xl font-bold tracking-wide hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
            Launch System →
          </button>
        </Link>
      </div>
    </FadeIn>
  )
}