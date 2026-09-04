"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        {/* Outer Geometric Shape */}
        <motion.div
          initial={{ rotate: 0, scale: 1, borderRadius: "20%" }}
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.8, 1, 0.8, 1], borderRadius: ["20%", "50%", "20%", "50%", "20%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border-[1.5px] border-outline"
        />
        {/* Middle Geometric Shape */}
        <motion.div
          initial={{ rotate: 0, scale: 0.8, borderRadius: "50%" }}
          animate={{ rotate: [0, -90, -180, -270, -360], scale: [0.8, 1, 0.8, 1, 0.8], borderRadius: ["50%", "20%", "50%", "20%", "50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 border-[1.5px] border-brand-cyan"
        />
        {/* Inner Geometric Shape */}
        <motion.div
          initial={{ rotate: 0, scale: 1, borderRadius: "20%" }}
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 0.6, 1, 0.6, 1], borderRadius: ["20%", "50%", "20%", "50%", "20%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 bg-brand-emerald opacity-80"
        />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-sm uppercase tracking-[0.2em] font-bold text-text-muted">
          Loading
        </span>
      </motion.div>
    </div>
  );
}
