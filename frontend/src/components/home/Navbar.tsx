"use client"
import Link from "next/link"
import { motion } from "framer-motion"

const display = { fontFamily: "var(--font-display)" }
const mono = { fontFamily: "var(--font-geist-mono)" }

export default function Navbar() {
  return (
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
  )
}