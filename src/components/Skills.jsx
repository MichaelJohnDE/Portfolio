import React from 'react'
import { SKILLS_DATA } from '../data/content'
import { motion } from 'framer-motion'

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-zinc-950">
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Technical <span className="text-accent">Architecture</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((cat, idx) => (
            <motion.div 
              key={cat.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bento-card p-8 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-emerald/50 transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="text-xl mb-6 font-semibold tracking-tight">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.skills.map(skill => (
                  <span 
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-background border border-zinc-800 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all cursor-default"
                  >
                    <img 
                      src={skill.path || `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} 
                      alt={skill.name}
                      className="w-4 h-4 object-contain brightness-90 group-hover:brightness-110"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
