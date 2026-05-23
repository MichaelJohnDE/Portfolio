import React from 'react'
import { FileText, Github, Linkedin, Mail } from 'lucide-react'
import { HERO_DATA } from '../data/content'
import { motion } from 'framer-motion'

const Hero = ({ onOpenResume }) => {
  return (
    <section id="hero" className="section-padding min-h-screen flex items-center bg-background relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(39,39,42,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(39,39,42,0.4)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start pt-10"
        >

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-text-primary block">{HERO_DATA.name}</span>
            <span className="text-brand-cyan block mt-2 text-4xl min-[400px]:text-5xl sm:text-6xl md:text-8xl drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] whitespace-nowrap">{HERO_DATA.lastName}.</span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {HERO_DATA.roles.map(role => (
              <span key={role} className="badge bg-surface border-border text-text-secondary">{role}</span>
            ))}
          </div>

          <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
            {HERO_DATA.summary}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary px-8">
              View Projects
            </a>
            <button onClick={onOpenResume} className="btn btn-outline px-8">
              <FileText size={18} /> Resume
            </button>
          </div>

          {/* Social Links Mini-Bento */}
          <div className="mt-12 flex gap-4">
            <a href="https://github.com/MichaelJohnDE" target="_blank" rel="noreferrer" className="w-12 h-12 bento-card items-center justify-center text-text-secondary hover:text-white hover:border-brand-cyan group">
              <Github size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/michael-john-danville-enciso-416235189" target="_blank" rel="noreferrer" className="w-12 h-12 bento-card items-center justify-center text-text-secondary hover:text-white hover:border-brand-emerald group">
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href={`mailto:${HERO_DATA.email}`} className="w-12 h-12 bento-card items-center justify-center text-text-secondary hover:text-white hover:border-brand-cyan group">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right Content - Code Display */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="w-full max-w-lg bento-card p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors" />
            </div>
            <pre className="font-mono text-[15px] leading-loose text-text-secondary overflow-x-auto relative z-10">
              <code className="block">
                <span className="text-brand-cyan">const</span> <span className="text-text-primary">developer</span> = {'{\n'}
                {'  '}name: <span className="text-brand-emerald">'{HERO_DATA.name} {HERO_DATA.lastName}'</span>,{'\n'}
                {'  '}primarySkills: [<span className="text-brand-emerald">'React'</span>, <span className="text-brand-emerald">'Laravel'</span>],{'\n'}
                {'  '}focus: <span className="text-brand-emerald">'Technical SEO Optimization'</span>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default Hero
