"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

export default function StatCard({
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
    >
      <p style={mono} className="text-gray-500 text-xs tracking-widest mb-2">{label}</p>
      <h3 style={display} className={`text-4xl font-bold ${color}`}>
        {typeof value === "number" ? count : value}
      </h3>
    </motion.div>
  )
}