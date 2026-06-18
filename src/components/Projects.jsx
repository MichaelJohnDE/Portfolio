import React from 'react'
import { motion } from 'framer-motion'
import { PROJECTS_DATA } from '../data/content'
import { Link } from 'react-router-dom'

const Projects = () => {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface px-[5%] md:px-[6%] lg:px-[8%]" id="projects">
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Selected Works</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Featured Projects</h2>
          </div>
          <a className="text-primary font-label-caps text-label-caps border-b border-primary hover:opacity-70 transition-all pb-1" href="#">View Full Portfolio</a>
        </motion.div>
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Project Card 0 */}
          {PROJECTS_DATA[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-4 lg:col-span-4 group relative bg-surface-container rounded-xl overflow-hidden signature-shadow signature-shadow-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-surface-container-low">
                <img 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  alt={PROJECTS_DATA[0].title} 
                  src={PROJECTS_DATA[0].image}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {PROJECTS_DATA[0].tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{PROJECTS_DATA[0].title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-label-caps tracking-widest uppercase bg-surface-bright text-primary">
                    <span className="material-symbols-outlined text-[14px]">
                      {PROJECTS_DATA[0].projectType === 'Solo Project' ? 'person' : 'group'}
                    </span>
                    {PROJECTS_DATA[0].projectType}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    {PROJECTS_DATA[0].teamSize}
                  </span>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
                  {PROJECTS_DATA[0].description}
                </p>
                <Link to={PROJECTS_DATA[0].link} className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all w-fit">
                  EXPLORE <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Project Card 1 */}
          {PROJECTS_DATA[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-4 lg:col-span-4 group bg-surface-container rounded-xl overflow-hidden signature-shadow signature-shadow-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-surface-container-low">
                <img 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  alt={PROJECTS_DATA[1].title} 
                  src={PROJECTS_DATA[1].image}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {PROJECTS_DATA[1].tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{PROJECTS_DATA[1].title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-label-caps tracking-widest uppercase bg-surface-bright text-primary">
                    <span className="material-symbols-outlined text-[14px]">
                      {PROJECTS_DATA[1].projectType === 'Solo Project' ? 'person' : 'group'}
                    </span>
                    {PROJECTS_DATA[1].projectType}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    {PROJECTS_DATA[1].teamSize}
                  </span>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
                  {PROJECTS_DATA[1].description}
                </p>
                <Link to={PROJECTS_DATA[1].link} className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all w-fit">
                  EXPLORE <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Project Card 2 */}
          {PROJECTS_DATA[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-4 lg:col-span-4 group bg-surface-container rounded-xl overflow-hidden signature-shadow signature-shadow-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-surface-container-low">
                <img 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  alt={PROJECTS_DATA[2].title} 
                  src={PROJECTS_DATA[2].image}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {PROJECTS_DATA[2].tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{PROJECTS_DATA[2].title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-label-caps tracking-widest uppercase bg-surface-bright text-primary">
                    <span className="material-symbols-outlined text-[14px]">
                      {PROJECTS_DATA[2].projectType === 'Solo Project' ? 'person' : 'group'}
                    </span>
                    {PROJECTS_DATA[2].projectType}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    {PROJECTS_DATA[2].teamSize}
                  </span>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
                  {PROJECTS_DATA[2].description}
                </p>
                <Link to={PROJECTS_DATA[2].link} className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all w-fit">
                  EXPLORE <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}

export default Projects
