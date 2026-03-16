import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "PALIHOG App",
      subtitle: "Primary Developer | Capstone Project",
      description: "A campus task-management Minimum Viable Product (MVP). Allowed users to browse and accept tasks seamlessly with real-time tracking.",
      image: "assets/images/asdLogo.png",
      tags: ["React Native", "Laravel", "Firebase", "Expo"],
      details: [
        "Built mobile app using React Native for user interactions and real-time location tracking.",
        "Developed web-based admin portal using Laravel.",
        "Integrated Firebase for real-time data synchronization."
      ],
      link: "palihog-docs.html"
    }
  ]

  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-16 text-center"
        >
          Featured <span className="gradient-text gradient-secondary">Projects</span>
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="p-12 bg-white flex items-center justify-center min-h-[300px]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto max-h-[300px] object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="text-primary font-medium mb-6">{project.subtitle}</p>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.link} className="btn btn-outline py-2 px-6 text-sm">
                    <ExternalLink size={16} /> View Documentation
                  </a>
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
