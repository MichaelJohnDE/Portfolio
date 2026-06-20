import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS_DATA } from '../data/content'
import { Link } from 'react-router-dom'

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? PROJECTS_DATA : PROJECTS_DATA.slice(0, 6);

  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface px-[5%] md:px-[6%] lg:px-[8%]" id="projects">
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Selected Works</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Featured Projects</h2>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-12 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 + ((index % 6) * 0.1) }}
              className="md:col-span-4 lg:col-span-4 group relative bg-surface-container rounded-xl overflow-hidden signature-shadow signature-shadow-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-surface-container-low">
                <img 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  alt={project.title} 
                  src={project.image}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{project.title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-label-caps tracking-widest uppercase bg-surface-bright text-primary">
                    <span className="material-symbols-outlined text-[14px]">
                      {project.projectType === 'Solo Project' ? 'person' : 'group'}
                    </span>
                    {project.projectType}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    {project.teamSize}
                  </span>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
                  {project.description}
                </p>
                <Link to={project.link} className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all w-fit">
                  EXPLORE <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {PROJECTS_DATA.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-surface-bright text-on-surface border border-outline-variant hover:bg-primary hover:text-on-primary transition-all font-label-caps text-label-caps uppercase tracking-widest"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
