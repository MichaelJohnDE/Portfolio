"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'

import Link from 'next/link';
import Image from 'next/image';

const Projects = ({ data }: { data?: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState('All');

  const allJobTypes = React.useMemo(() => {
    const set = new Set<string>();
    (data || []).forEach(p => {
      if (p.roles && Array.isArray(p.roles)) {
        p.roles.forEach((r: string) => {
          if (r && r.trim()) set.add(r.trim());
        });
      }
    });
    return Array.from(set);
  }, [data]);

  const filteredProjects = React.useMemo(() => {
    if (selectedJobType === 'All') return data || [];
    return (data || []).filter(p => p.roles && p.roles.includes(selectedJobType));
  }, [data, selectedJobType]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface px-[5%] md:px-[6%] lg:px-[8%]" id="projects">
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Selected Works</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Featured Projects</h2>
          </div>
        </motion.div>

        {allJobTypes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <button 
              onClick={() => { setSelectedJobType('All'); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-xs font-label-caps uppercase tracking-wider transition-all ${
                selectedJobType === 'All' 
                  ? 'bg-primary text-on-primary shadow-sm' 
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/40'
              }`}
            >
              All Projects
            </button>
            {allJobTypes.map(job => (
              <button 
                key={job}
                onClick={() => { setSelectedJobType(job); setShowAll(false); }}
                className={`px-4 py-2 rounded-full text-xs font-label-caps uppercase tracking-wider transition-all ${
                  selectedJobType === job 
                    ? 'bg-primary text-on-primary shadow-sm' 
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/40'
                }`}
              >
                {job}
              </button>
            ))}
          </div>
        )}
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
              <div className="relative h-56 overflow-hidden bg-surface-container-low flex items-center justify-center">
                {project.images && project.images.length > 0 ? (
                  <Image
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 opacity-90" 
                    alt={project.title} 
                    src={project.images[0]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-20">image</span>
                )}
              </div>
              <div className="p-8 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2 line-clamp-2">
                  {project.title}
                </h3>
                
                {/* Job Types */}
                {project.roles && project.roles.length > 0 && (
                  <div className="flex items-center mb-4 text-primary">
                    <span className="font-label-caps text-[10px] tracking-widest uppercase truncate">
                      {project.roles.join('  •  ')}
                    </span>
                  </div>
                )}
                
                {/* Metadata: Project Type & Team Size */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
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
                
                {/* Description */}
                <p className="text-on-surface-variant font-body-md mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mt-auto flex flex-col gap-6">
                  {/* Tech Stack Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-surface-bright border border-outline-variant/30 text-on-surface-variant px-2.5 py-1 rounded-md font-label-caps text-[9px] tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="bg-surface-bright border border-outline-variant/30 text-on-surface-variant px-2 py-1 rounded-md font-label-caps text-[9px] tracking-wider uppercase flex items-center justify-center">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Action Link */}
                  <Link href={project.link} className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all w-fit mt-auto">
                    EXPLORE <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProjects.length > 6 && (
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
