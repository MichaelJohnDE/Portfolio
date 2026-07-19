"use client";

import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] flex flex-col items-center justify-center bg-background">
      <div className="relative w-24 h-24 flex items-center justify-center mb-8">
        {/* Outer Geometric Shape */}
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.8, 1, 0.8, 1], borderRadius: ["20%", "50%", "20%", "50%", "20%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border-2 border-outline"
        />
        {/* Middle Geometric Shape */}
        <motion.div
          animate={{ rotate: [0, -90, -180, -270, -360], scale: [0.8, 1, 0.8, 1, 0.8], borderRadius: ["50%", "20%", "50%", "20%", "50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 border-2 border-brand-cyan"
        />
        {/* Inner Geometric Shape */}
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.6, 1, 0.6, 1], borderRadius: ["20%", "50%", "20%", "50%", "20%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 bg-brand-emerald opacity-80"
        />
      </div>

      {/* Logo/Text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-xl font-black tracking-tighter text-text-primary">
          MJDE<span className="text-brand-cyan">.</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted">
          Loading
        </span>
      </motion.div>
    </div>
  )
}
