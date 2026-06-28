"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import OrbitNode from "./OrbitNode"

interface OrbitItem {
  label: string
  color: string
}

interface OrbitProps {
  radius: number
  duration: number
  reverse?: boolean
  items: OrbitItem[]
}

export default function Orbit({ radius, duration, reverse = false, items }: OrbitProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
      }}
    >
      <div
        className="absolute inset-0 rounded-full border border-cyan-400/10"
        style={{ boxShadow: "0 0 25px rgba(34,211,238,0.08)" }}
      />

      {items.map((item, index) => {
        const angle = (360 / items.length) * index
        const radian = (angle * Math.PI) / 180
        const x = radius + Math.cos(radian) * radius
        const y = radius + Math.sin(radian) * radius

        return (
          <div
            key={item.label}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <OrbitNode label={item.label} color={item.color} />
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}