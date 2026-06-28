"use client";

import FadeIn from "@/components/ui/FadeIn";
import Orbit from "./Orbit";
import AIEngine from "./AIEngine";

const display = { fontFamily: "var(--font-display)" };
const mono = { fontFamily: "var(--font-geist-mono)" };

const FRONTEND = [
  { label: "Next.js", color: "#22d3ee" },
  { label: "React", color: "#22d3ee" },
  { label: "Tailwind", color: "#22d3ee" },
];

const BACKEND = [
  { label: "FastAPI", color: "#f97316" },
  { label: "Python", color: "#f97316" },
  { label: "REST API", color: "#f97316" },
];

const AI = [
  { label: "YOLOv8", color: "#a855f7" },
  { label: "OpenCV", color: "#a855f7" },
  { label: "Pose AI", color: "#a855f7" },
  { label: "Threat AI", color: "#a855f7" },
];

const DATABASE = [
  { label: "Supabase", color: "#22c55e" },
  { label: "PostgreSQL", color: "#22c55e" },
  { label: "Storage", color: "#22c55e" },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden pt-20 pb-36">

      <FadeIn className="text-center mb-20">
        <p style={mono} className="text-xs tracking-[0.4em] text-cyan-400 mb-4">
          SYSTEM ARCHITECTURE
        </p>
        <h2 style={display} className="text-5xl font-bold">
          Technology Stack
        </h2>
      </FadeIn>

      <div className="relative w-[560px] h-[560px] mx-auto">

        <AIEngine />

        {/* AI Models — inner orbit */}
        <Orbit radius={120} duration={18} items={AI} />

        {/* Backend — middle orbit */}
        <Orbit radius={200} duration={28} reverse items={BACKEND} />

        {/* Frontend + Database — outer orbit */}
        <Orbit radius={290} duration={42} items={[...FRONTEND, ...DATABASE]} />

      </div>

    </section>
  )
}