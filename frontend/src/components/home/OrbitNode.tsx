"use client";

import { motion } from "framer-motion";

interface OrbitNodeProps {
  label: string;
  color: string;
}

export default function OrbitNode({
  label,
  color,
}: OrbitNodeProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="absolute flex flex-col items-center cursor-default select-none"
    >
      {/* Outer Glow */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 8px ${color}`,
            `0 0 16px ${color}`,
            `0 0 8px ${color}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border"
        style={{
          borderColor: color,
          background: `${color}08`,
        }}
      >
        {/* Core */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-2 h-2 rounded-full"
          style={{
            background: color,
          }}
        />

        {/* Status Dot */}
        <motion.div
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
          style={{
            background: color,
          }}
        />
      </motion.div>

      {/* Label */}
      <motion.p
        whileHover={{
          color: "#67e8f9",
        }}
        className="mt-3 text-xs font-semibold tracking-wide text-white whitespace-nowrap"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}