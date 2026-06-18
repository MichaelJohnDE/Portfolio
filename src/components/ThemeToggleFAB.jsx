import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeToggleFAB = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center p-3 rounded-full bg-surface-variant/80 hover:bg-surface-variant text-on-surface-variant hover:text-primary backdrop-blur-md border border-outline-variant/30 shadow-lg transition-colors group"
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="material-symbols-outlined text-[20px]"
          >
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default ThemeToggleFAB
