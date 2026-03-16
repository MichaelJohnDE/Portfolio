import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      date: "Jan 2026 - Present",
      role: "Frontend Developer Intern (OJT)",
      company: "Strategic Communications & Auxiliary Resource Office, FSUU",
      description: [
        "Assisting with frontend development within a 4-member full-stack team to build the official FSUU website.",
        "Translating finalized designs into responsive, modern web components.",
        "Streamlined UI/UX workflow by converting legacy Canva layouts to interactive Figma prototypes."
      ]
    },
    {
      date: "Jun 2025 - Dec 2025",
      role: "Primary Full-Stack Developer",
      company: "PALIHOG App Capstone Project",
      description: [
        "Architected a 'Modern Monolith' full-stack ecosystem using React Native (Expo) for mobile, and Laravel 12 with React/Inertia.js for the admin portal.",
        "Engineered real-time features including map geolocation grids, live bidding logic, and chat threads using Firebase backend.",
        "Implemented robust zero-trust security architecture enforcing mathematical data validation and strict Role-Based Access Controls (RBAC) via Firestore rules."
      ]
    },
    {
      date: "Jan 2025 - Apr 2025",
      role: "Collaborative Full-Stack Developer",
      company: "UrianWorks E-Commerce | Academic Project",
      description: [
        "Collaborated within a 3-member team to build an exclusive student e-commerce platform.",
        "Co-developed the backend and frontend architecture using Laravel 12, React 19, and Inertia.js.",
        "Assisted in implementing a robust dual-authentication system combining session-based web auth and JWT API guards via Laravel Passport."
      ]
    }
  ]

  return (
    <section id="experience" className="section-padding bg-bg-secondary/30">
      <div className="container-wide max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-20 text-center"
        >
          Relevant <span className="gradient-text gradient-primary">Experience</span>
        </motion.h2>

        <div className="relative border-l-2 border-white/5 pl-8 md:pl-12 space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[43px] md:-left-[59px] top-1 w-5 h-5 rounded-full bg-bg-main border-4 border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />
              
              <div className="glass-card p-10 hover:shadow-2xl hover:shadow-primary/5">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold border border-secondary/20">
                    <Calendar size={14} /> {exp.date}
                  </span>
                  <span className="text-primary font-medium flex items-center gap-2">
                    <Briefcase size={16} /> {exp.company}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-text-primary">{exp.role}</h3>
                
                <ul className="space-y-4 text-text-secondary leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
