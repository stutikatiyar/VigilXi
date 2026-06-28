"use client";

import { motion } from "framer-motion";

export default function AIEngine() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

      {/* Outer Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl"
      />

      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-4 rounded-full border border-cyan-400/20"
      />

      {/* Second Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-7 rounded-full border border-cyan-400/10"
      />

      {/* Main Sphere */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            "0 0 30px rgba(34,211,238,0.4)",
            "0 0 70px rgba(34,211,238,0.8)",
            "0 0 30px rgba(34,211,238,0.4)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="relative w-28 h-28 rounded-full
                   border border-cyan-400/30
                   bg-gradient-to-br
                   from-cyan-400/20
                   to-cyan-950/60
                   backdrop-blur-xl
                   flex flex-col
                   items-center
                   justify-center
                   overflow-hidden"
      >
        {/* Scanning Line */}
        <motion.div
          animate={{
            y: [-80, 80],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute
                     w-full
                     h-1
                     bg-cyan-300/30"
        />

        <p className="text-cyan-400 text-xs tracking-[0.35em]">
          CORE
        </p>

        <h2 className="text-white font-black text-xl tracking-widest">
          AI
        </h2>

        <p className="text-[10px] text-cyan-300 mt-1">
          SURVEILLANCE ENGINE
        </p>

        {/* Status */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="mt-3 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-400" />

          <span className="text-[10px] tracking-widest text-green-400">
            ONLINE
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}