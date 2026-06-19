import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

const ThemeToggleFAB = () => {
  const { theme, toggleTheme } = useTheme()
  // The icon should show the destination theme (opposite of current)
  const showMoon = theme === 'light'

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center rounded-full bg-surface-variant/80 hover:bg-surface-variant text-on-surface-variant hover:text-primary backdrop-blur-md border border-outline-variant/30 shadow-lg transition-colors group overflow-hidden relative w-12 h-12"
        aria-label="Toggle Theme"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ rotate: showMoon ? -10 : 90 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-on-surface-variant group-hover:text-primary transition-colors"
        >
          {/* Mask that cuts out the moon crescent */}
          <mask id="moon-mask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <motion.circle
              initial={false}
              animate={{
                cx: showMoon ? 16 : 28,
                cy: showMoon ? 6 : -8,
                r: 9
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              fill="black"
            />
          </mask>

          {/* Main central circle (Sun core or Moon body) */}
          <motion.circle
            fill={showMoon ? "currentColor" : "none"}
            mask="url(#moon-mask)"
            cx="12"
            cy="12"
            initial={false}
            animate={{
              r: showMoon ? 9 : 5
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />

          {/* Sun Rays */}
          <motion.g
            initial={false}
            animate={{
              opacity: showMoon ? 0 : 1,
              scale: showMoon ? 0.3 : 1,
              rotate: showMoon ? 45 : 0
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.g>
        </motion.svg>
      </motion.button>
    </div>
  )
}

export default ThemeToggleFAB
