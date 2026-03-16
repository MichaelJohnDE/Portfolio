import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Server, Smartphone, Rocket, ShieldCheck, Palette } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: "Web Development",
      icon: <Layout className="text-primary" size={24} />,
      skills: [
        { name: "HTML5", slug: "html5", color: "E34F26" },
        { name: "CSS3", path: "/assets/images/css3-logo.png" },
        { name: "TypeScript", slug: "typescript", color: "3178C6" },
        { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
        { name: "React", slug: "react", color: "61DAFB" },
        { name: "Inertia.js", slug: "inertia", color: "9553E9" },
        { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" }
      ]
    },
    {
      title: "Backend & Database",
      icon: <Server className="text-primary" size={24} />,
      skills: [
        { name: "Laravel", slug: "laravel", color: "FF2D20" },
        { name: "PHP", slug: "php", color: "777BB4" },
        { name: "MySQL", slug: "mysql", color: "4479A1" },
        { name: "Firebase", slug: "firebase", color: "FFCA28" },
        { name: "Passport", slug: "jsonwebtokens", color: "000000" }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="text-primary" size={24} />,
      skills: [
        { name: "React Native", slug: "react", color: "61DAFB" },
        { name: "Expo", slug: "expo", color: "000020" }
      ]
    },
    {
      title: "DevOps & Workflow",
      icon: <Rocket className="text-primary" size={24} />,
      skills: [
        { name: "Git", slug: "git", color: "F05032" },
        { name: "GitHub", slug: "github", color: "181717" },
        { name: "Vite", slug: "vite", color: "646CFF" }
      ]
    },
    {
      title: "Security & Architecture",
      icon: <ShieldCheck className="text-primary" size={24} />,
      skills: [
        { name: "RBAC Rules", slug: "dependabot", color: "444444" },
        { name: "JWT", slug: "jsonwebtokens", color: "000000" },
        { name: "Firestore Rules", slug: "firebase", color: "FFCA28" }
      ]
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="text-primary" size={24} />,
      skills: [
        { name: "Figma", slug: "figma", color: "F24E1E" },
        { name: "Canva", path: "/assets/images/Canva-icon.png" }
      ]
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
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <span 
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-text-secondary hover:bg-white/10 hover:text-text-primary hover:border-white/20 transition-all cursor-default group/skill"
                  >
                    <img 
                      src={skill.path || `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`} 
                      alt={skill.name}
                      className="w-4 h-4 object-contain transition-all"
                    />
                    {skill.name}
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
