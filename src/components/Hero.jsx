import React from 'react'
import { motion } from 'framer-motion'
import { HERO_DATA } from '../data/content'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

const Hero = ({ onOpenResume }) => {

  return (
    <section id="about" className="pt-24 md:pt-32 pb-section-padding-mobile md:pb-section-padding-desktop px-[5%] md:px-[6%] lg:px-[8%] w-full overflow-hidden flex flex-col justify-center min-h-[70vh]">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 justify-between w-full text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 max-w-4xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-display text-on-surface mb-4 md:mb-6">
            Hi, I'm <br className="block sm:hidden" /><span className="text-primary">{HERO_DATA.name} <br className="hidden sm:block" />{HERO_DATA.lastName}</span>.<br />
            {/* Mobile role */}
            <span className="text-2xl sm:text-3xl mt-2 block md:hidden">{HERO_DATA.roles[0]}</span>
            {/* Desktop role */}
            <span className="hidden md:inline">{HERO_DATA.roles[0]}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 md:mb-10 max-w-2xl mx-auto md:mx-0">
            {HERO_DATA.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps signature-shadow hover:opacity-90 transition-all flex items-center justify-center text-center">
              View Projects
            </a>
            <button onClick={onOpenResume} className="border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-label-caps text-label-caps hover:bg-surface-container-low transition-all">
              View Resume
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end"
        >
          <div className="flex flex-col gap-4 w-full sm:w-80 md:w-96">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-2 text-center md:text-left block">
              Connect With Me
            </span>
            {HERO_DATA.socials.map((social, index) => {
              const Icon = social.icon === 'github' ? Github : social.icon === 'linkedin' ? Linkedin : Mail;
              
              return (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="bg-surface-container-high p-3 rounded-lg text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="flex flex-col flex-1 text-left">
                    <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      {social.platform}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {social.handle}
                    </span>
                  </div>
                  <div className="text-on-surface-variant group-hover:text-primary transition-transform group-hover:translate-x-1">
                    <ArrowRight size={20} />
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

