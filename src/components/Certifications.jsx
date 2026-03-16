import React from 'react'
import { motion } from 'framer-motion'
import { Award, Shield, FileSpreadsheet, BarChart3 } from 'lucide-react'

const Certifications = () => {
  const certs = [
    {
      title: "Career Service Professional",
      issuer: "Civil Service Commission | Rating: 88.33%",
      date: "Jul 2025",
      icon: <Award className="text-secondary" size={24} />
    },
    {
      title: "Info Sec & Data Privacy Practitioner",
      issuer: "East West IESI",
      date: "Dec 2024",
      icon: <Shield className="text-secondary" size={24} />
    },
    {
      title: "Microsoft Office Specialist (2019)",
      issuer: "Certiport | Access Expert & Excel Associate",
      date: "Nov - Dec 2024",
      icon: <FileSpreadsheet className="text-secondary" size={24} />
    },
    {
      title: "SEO Fundamentals Certified",
      issuer: "HubSpot Academy",
      date: "Dec 2025",
      icon: <BarChart3 className="text-secondary" size={24} />
    }
  ]

  return (
    <section id="certifications" className="section-padding bg-bg-secondary/30">
      <div className="container-wide">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-16 text-center"
        >
          Certifications & <span className="gradient-text gradient-primary">Eligibility</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 flex flex-col items-center text-center justify-center hover:border-primary/50 group"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.1)] group-hover:shadow-secondary/20 transition-all">
                {cert.icon}
              </div>
              <h4 className="text-lg font-bold mb-2 text-text-primary">{cert.title}</h4>
              <p className="text-sm text-text-secondary mb-4">{cert.issuer}</p>
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{cert.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
