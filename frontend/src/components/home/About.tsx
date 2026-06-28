"use client"
import FadeIn from "@/components/ui/FadeIn"

const mono = { fontFamily: "var(--font-geist-mono)" }

export default function About() {
  return (
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
  )
}