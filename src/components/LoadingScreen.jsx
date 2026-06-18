import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Initializing')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onLoadingComplete, 500)
          return 100
        }

        const next = prev + 1
        if (next > 50) {
          setPhase('Synchronizing')
        }
        return next
      })
    }, 15) // Total ~1.5 seconds (0.75s per phase)
    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[50%] border-4 border-brand-cyan border-t-transparent border-l-transparent opacity-40 shadow-[0_0_20px_rgba(var(--brand-cyan),0.3)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-[50%] border-4 border-brand-emerald border-b-transparent border-r-transparent opacity-60 shadow-[0_0_15px_rgba(var(--brand-emerald),0.3)]"
        />

        {/* Logo/Text in center */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative flex items-center justify-center"
        >
          <span className="text-3xl font-black tracking-tighter text-text-primary">
            MJDE<span className="text-brand-cyan">.</span>
          </span>
        </motion.div>
      </div>

      {/* Progress Info */}
      <div className="mt-12 w-64">
        <div className="flex justify-between items-end mb-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-text-muted"
            >
              {phase}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm font-mono text-brand-cyan">{progress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-outline-variant/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-emerald"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
    </motion.div>
  )
}

export default LoadingScreen
