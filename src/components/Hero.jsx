import React from 'react'
import { motion } from 'framer-motion'
import { HERO_DATA } from '../data/content'

const Hero = ({ onOpenResume }) => {
  return (
    <section id="about" className="pt-32 pb-section-padding-mobile md:pb-section-padding-desktop px-[5%] md:px-[6%] lg:px-[8%] w-full overflow-hidden flex flex-col justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="font-display text-display text-on-surface mb-6">
          Hi, I'm <span className="text-primary">{HERO_DATA.name} <br className="hidden sm:block" />{HERO_DATA.lastName}</span>.<br />
          {HERO_DATA.roles[0]}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
          {HERO_DATA.summary}
        </p>
        <div className="flex gap-4">
          <a href="#projects" className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps signature-shadow hover:opacity-90 transition-all flex items-center justify-center text-center">
            View Projects
          </a>
          <button onClick={onOpenResume} className="border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-label-caps text-label-caps hover:bg-surface-container-low transition-all">
            View Resume
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

