import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

const ResumeModal = ({ isOpen, onClose }) => {
  const scrollRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lock background scroll using position:fixed trick
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Attach a native wheel listener directly to the modal scroll container
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.scrollBy({
        top: e.deltaY * 1.5, // slightly faster to compensate for smooth delay
        behavior: 'smooth'
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

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
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-primary text-on-primary py-2 px-5 text-sm rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Download
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 bg-surface-container-high border border-outline-variant/20 shadow-xl rounded-xl py-2 min-w-[150px] z-[3000] overflow-hidden"
                      >
                        <a 
                          href="/assets/resume.pdf" 
                          download="Michael_John_Danville_Enciso_Resume.pdf" 
                          rel="noopener noreferrer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-surface-variant/50 transition-colors text-sm font-label-caps text-on-surface"
                        >
                          <i className="fas fa-file-pdf text-red-500 text-lg"></i> PDF Document
                        </a>
                        <div className="h-px bg-outline-variant/10 w-full"></div>
                        <a 
                          href="/assets/images/resume-dev.jpg" 
                          download="Michael_John_Danville_Enciso_Resume.jpg" 
                          rel="noopener noreferrer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-surface-variant/50 transition-colors text-sm font-label-caps text-on-surface"
                        >
                          <i className="fas fa-file-image text-brand-cyan text-lg"></i> JPG Image
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button 
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0a0a0c]">
              <div className="flex justify-center">
                <img 
                  src="assets/images/resume-dev.jpg" 
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
