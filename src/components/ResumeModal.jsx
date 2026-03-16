import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

const ResumeModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-bg-main/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative glass-card w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col bg-bg-secondary shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold">
                My <span className="gradient-text gradient-primary">Resume</span>
              </h3>
              <div className="flex items-center gap-4">
                <a 
                  href="assets/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary py-2 px-5 text-sm"
                >
                  <Download size={16} /> Download
                </a>
                <button 
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0a0a0c]">
              <div className="flex justify-center">
                <img 
                  src="assets/images/resume.png" 
                  alt="Resume" 
                  className="max-w-full h-auto rounded-sm shadow-2xl shadow-black block"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
