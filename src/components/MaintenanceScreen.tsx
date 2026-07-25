'use client';

import { PowerOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">

      {/* Animated Scanline */}
      <motion.div
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
        className="absolute left-0 w-full h-[2px] bg-brand-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-40 pointer-events-none"
      />

      {/* Background Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-2xl h-[80vw] max-h-2xl bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mb-8"
        >
          <motion.div
            layoutId="lockdown-icon-container"
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
            className="w-24 h-24 bg-surface-container/50 backdrop-blur-md rounded-3xl border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          >
            <PowerOff size={40} />
          </motion.div>
        </motion.div>

        {/* Animated Title */}
        <motion.h1 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-[12vw] sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-brand-cyan/70 tracking-tight whitespace-nowrap mb-6"
        >
          Offline
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg text-on-surface-variant max-w-lg mx-auto mb-12"
        >
          The public portfolio is currently offline. Please check back later.
        </motion.p>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-mono tracking-widest uppercase"
        >
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          Offline
        </motion.div>
      </div>
    </div>
  );
}
