import React from 'react'
import { motion } from 'framer-motion'
import { EXPERIENCE_DATA } from '../data/content'

const Experience = () => {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-[5%] md:px-[6%] lg:px-[8%] w-full mx-auto" id="experience">
      <div className="grid md:grid-cols-12 gap-gutter">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-4"
        >
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Trajectory</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Development Experience</h2>
          <p className="text-on-surface-variant font-body-md">A summary of my practical web development experience, ranging from academic projects to professional internships.</p>
        </motion.div>
        
        <div className="md:col-span-8 space-y-12">
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 border-l border-outline-variant group"
            >
              <div className={`absolute -left-[6.5px] top-2 w-3 h-3 rounded-full ring-4 ring-background transition-colors duration-300 ${index === 0 ? 'bg-primary' : 'bg-outline-variant group-hover:bg-primary'}`}></div>
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-2 block uppercase">{item.date}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface flex flex-wrap items-center">
                <span>{item.role}</span>
                {item.connector === 'at' ? (
                  <span className="mx-2 text-on-surface-variant font-normal lowercase">at</span>
                ) : (
                  <span className="text-primary mx-2 font-bold">{item.connector || '|'}</span>
                )}
                <span>{item.company}</span>
              </h3>
              <div className="font-body-md text-on-surface-variant mt-4 space-y-2">
                {item.description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
