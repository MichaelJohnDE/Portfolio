import React from 'react'
import { ExternalLink, Activity, Zap, Search, MonitorPlay } from 'lucide-react'
import { PROJECTS_DATA } from '../data/content'
import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-zinc-950">
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Featured <span className="text-accent">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bento-card flex flex-col h-full group"
            >
              <div className="p-8 bg-zinc-900/50 flex items-center justify-center h-64 border-b border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 relative z-10"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold tracking-tight text-text-primary">{project.title}</h3>
                  <a href={project.link} className="text-text-muted hover:text-brand-cyan transition-colors bg-surface p-2 rounded-lg border border-border group-hover:border-brand-cyan/30">
                    <ExternalLink size={18} />
                  </a>
                </div>
                
                <p className="text-brand-cyan font-medium mb-4 text-sm tracking-wide uppercase">{project.subtitle}</p>
                <p className="text-text-secondary mb-6 leading-relaxed text-sm flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                     <span key={tag} className="px-2.5 py-1 bg-surface border border-border rounded-full text-[11px] font-medium text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
