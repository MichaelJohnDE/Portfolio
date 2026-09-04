"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import Image from 'next/image'

const Certifications = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-[5%] md:px-[6%] lg:px-[8%] w-full mx-auto" id="certifications">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Verification</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Validated Expertise</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data || []).map((cert, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-outline-variant border-opacity-30 rounded-xl bg-surface-container-low hover:border-primary transition-colors flex flex-col group overflow-hidden"
          >
            {cert.image && (
              <div 
                className="h-48 w-full border-b border-outline-variant border-opacity-30 overflow-hidden bg-surface-container-lowest cursor-pointer relative"
                onClick={() => setSelectedImage(cert.image)}
              >
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                </div>
                <Image src={cert.image} alt={cert.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 opacity-90" />
              </div>
            )}
            <div className="p-8 flex-grow flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="text-primary group-hover:scale-110 transition-transform origin-left mt-1 flex-shrink-0">
                  {cert.icon && Icons[cert.icon] ? React.createElement(Icons[cert.icon] as any, { size: 32, className: 'text-primary' }) : null}
                </div>
                <div>
                  <h4 className="font-headline-md text-body-lg font-bold text-on-surface leading-tight mb-2">{cert.title}</h4>
                  <p className="text-on-surface-variant font-body-md">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <a 
          href="https://www.linkedin.com/in/mjde/details/certifications/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-surface-container border border-outline-variant/30 hover:border-primary/50 text-on-surface px-8 py-4 rounded-xl font-label-caps tracking-wide transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group"
        >
          View More on LinkedIn
          <span className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-primary transition-colors">open_in_new</span>
        </a>
      </motion.div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center">
            <button 
              className="absolute -top-12 right-0 md:-right-8 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <div className="relative w-full h-[90vh]">
              <Image 
                src={selectedImage} 
                alt="Certification view" 
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Certifications
