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
            What I Use
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Tech Stack</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILLS_DATA.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 signature-shadow transition-transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/10">
                <div className="text-primary bg-primary/10 p-3 rounded-xl group-hover:scale-110 transition-transform origin-left">
                  {React.cloneElement(category.icon, { size: 28, className: 'text-primary' })}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold tracking-wide">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/30 hover:border-primary/40 transition-all hover:shadow-md cursor-default group/skill">
                    {skill.icon ? (
                      <div className="w-5 h-5 flex items-center justify-center text-on-surface-variant group-hover/skill:text-primary transition-colors">
                        {React.cloneElement(skill.icon, { size: 18 })}
                      </div>
                    ) : skill.path ? (
                      <img src={skill.path} alt={skill.name} className="w-5 h-5 object-contain" />
                    ) : skill.slug ? (
                      <img src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} alt={skill.name} className="w-5 h-5 object-contain" />
                    ) : null}
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">{skill.name}</span>
                  </div>
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
