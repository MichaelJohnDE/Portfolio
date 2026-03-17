import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "PALIHOG App",
      subtitle: "Full-Stack Developer | Capstone Project",
      description: "A campus-based task app that connects students for errands. Features real-time tracking, a mobile interface, and a dedicated admin portal.",
      image: "assets/images/asdLogo.png",
      tags: ["React Native", "Laravel", "Firebase", "Expo"],
      details: [
        "Built a mobile app for students to post and accept campus tasks.",
        "Developed a web-based admin portal for managing users and tasks.",
        "Used Firebase for real-time status updates and location tracking."
      ],
      link: "palihog-docs.html"
    },
    {
      title: "St. Michael Lights & Sounds",
      subtitle: "Frontend Advertisement Site",
      description: "A professional dark-themed website for an event lighting and sound company. Featuring smooth animations, an interactive video player, and a mobile-friendly design.",
      image: "assets/images/stmichael_preview.png",
      tags: ["React 19", "Tailwind CSS 4", "Framer Motion", "Cloudflare Pages"],
      details: [
        "Designed a 'Nocturnal' dark theme that fits the event industry vibe.",
        "Added a smart video player that starts playing when users scroll to it.",
        "Included smooth soundwave animations for a more interactive experience."
      ],
      link: "stmichael-docs.html"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden flex flex-col h-full"
            >
              <div className="p-8 bg-black/20 flex items-center justify-center h-64 border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-secondary font-medium mb-4 text-sm">{project.subtitle}</p>
                <p className="text-text-secondary mb-6 leading-relaxed text-sm flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.link} className="btn btn-outline py-2 px-6 text-sm w-full justify-center">
                    <ExternalLink size={16} className="mr-2" /> View Documentation
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
