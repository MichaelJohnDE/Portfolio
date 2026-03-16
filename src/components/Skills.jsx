import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Server, Smartphone, Rocket, ShieldCheck, Palette } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: "Web Development",
      icon: <Layout className="text-primary" size={24} />,
      skills: ["HTML5/CSS3", "TypeScript", "JavaScript", "React", "Inertia.js", "Tailwind CSS"]
    },
    {
      title: "Backend & Database",
      icon: <Server className="text-primary" size={24} />,
      skills: ["Laravel (PHP)", "MySQL", "Firebase", "RESTful APIs", "Passport (OAuth2)"]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="text-primary" size={24} />,
      skills: ["React Native", "Expo"]
    },
    {
      title: "DevOps & Workflow",
      icon: <Rocket className="text-primary" size={24} />,
      skills: ["Git", "GitHub Actions", "CI/CD", "Vite"]
    },
    {
      title: "Security & Architecture",
      icon: <ShieldCheck className="text-primary" size={24} />,
      skills: ["RBAC Rules", "JWT/Passport", "Firestore Rules"]
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="text-primary" size={24} />,
      skills: ["Figma", "Canva"]
    }
  ]

  return (
    <section id="skills" className="section-padding">
      <div className="container-wide">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-16 text-center"
        >
          Technical <span className="gradient-text gradient-secondary">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-xl mb-6">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-text-secondary hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
