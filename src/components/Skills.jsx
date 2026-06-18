import React from 'react'
import { motion } from 'framer-motion'
import { SKILLS_DATA } from '../data/content'

const Skills = () => {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low px-[5%] md:px-[6%] lg:px-[8%]" id="skills">
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">
            Competencies
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Technical Arsenal</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {SKILLS_DATA.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-surface-container p-6 rounded-lg border border-outline-variant/20 signature-shadow transition-transform hover:-translate-y-1 group"
            >
              <div className="text-primary mb-4 block group-hover:scale-110 transition-transform origin-left">
                {React.cloneElement(category.icon, { size: 32, className: 'text-primary' })}
              </div>
              <h3 className="font-label-caps text-label-caps text-on-surface leading-tight">
                {category.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
