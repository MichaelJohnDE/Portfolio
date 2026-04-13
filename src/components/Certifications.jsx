import React from 'react'
import { CERTIFICATIONS_DATA } from '../data/content'
import { motion } from 'framer-motion'

const Certifications = () => {
  return (
    <section id="certifications" className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-brand-cyan/5 opacity-20 pointer-events-none" style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }} />
      <div className="container-wide relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Certifications & <span className="text-accent">Eligibility</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bento-card p-8 flex flex-col items-center text-center justify-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:shadow-brand-cyan/10 group-hover:-translate-y-1 transition-all duration-300">
                {cert.icon}
              </div>
              <h4 className="text-lg font-bold mb-3 text-text-primary group-hover:text-brand-cyan transition-colors">{cert.title}</h4>
              <p className="text-sm text-text-secondary mb-4 flex-grow">{cert.issuer}</p>
              <span className="badge bg-background border-border text-text-primary px-3 py-1.5">{cert.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
