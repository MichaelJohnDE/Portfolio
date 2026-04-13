import React from 'react'
import { Calendar, Briefcase } from 'lucide-react'
import { EXPERIENCE_DATA } from '../data/content'
import { motion } from 'framer-motion'

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-brand-emerald/5 opacity-20 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)' }} />
      <div className="container-wide max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
          Relevant <span className="text-accent-alt">Experience</span>
        </h2>

        <div className="relative border-l-2 border-zinc-800 pl-8 md:pl-12 space-y-16">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[43px] md:-left-[59px] top-1 w-5 h-5 rounded-full bg-background border-4 border-brand-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform z-10" />
              
              <div className="bento-card p-8 group-hover:-translate-y-1 transition-transform">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <span className="badge border-brand-emerald/30 text-brand-emerald bg-brand-emerald/10">
                    <Calendar size={14} className="mr-1.5" /> {exp.date}
                  </span>
                  <span className="text-text-primary font-medium flex items-center gap-2 text-sm">
                    <Briefcase size={16} className="text-text-muted" /> {exp.company}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-text-primary tracking-tight">{exp.role}</h3>
                
                <ul className="space-y-4 text-text-secondary leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base group/item">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-emerald/50 shrink-0 group-hover/item:bg-brand-emerald transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
