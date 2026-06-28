import { useState, useEffect } from "react"
import { animate } from "framer-motion"

export function useAnimatedCounter(target: number, inView: boolean) {
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