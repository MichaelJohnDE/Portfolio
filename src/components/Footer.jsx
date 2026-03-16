import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="contact" className="pt-24 pb-12 px-6 md:px-20 border-t border-white/5">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Let's Work <br />
              <span className="gradient-text gradient-secondary">Together</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-lg mb-12">
              I'm currently looking for new opportunities. Whether you have a question or just
              want to say hi, I'll try my best to get back to you!
            </p>

            <a 
              href="mailto:encisomichael4@gmail.com" 
              className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 px-6 sm:px-8 py-4 text-base sm:text-lg font-medium hover:text-primary group w-full sm:w-max overflow-hidden"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-primary" size={20} />
                </div>
                <span className="truncate">encisomichael4@gmail.com</span>
              </div>
              <ArrowUpRight className="hidden sm:block text-text-muted group-hover:text-primary transition-colors ml-auto" size={20} />
            </a>
          </motion.div>

          {/* Additional info or links could go here if needed */}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-text-muted text-sm px-2">
          <p>© 2026 Michael John Danville Enciso. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a 
              href="https://github.com/MichaelJohnDE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/michael-john-danville-enciso-416235189" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
