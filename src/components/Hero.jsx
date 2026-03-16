import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Send, SquareDot } from 'lucide-react'

const Hero = ({ onOpenResume }) => {
  const [displayText, setDisplayText] = useState('')
  const fullText = "Full-Stack Developer"
  
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="container-wide px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <p className="text-xl text-text-secondary font-medium mb-2">Hello, I'm</p>
          <h1 className="text-6xl md:text-8xl mb-4 leading-[1.1]">
            Michael John <br />
            <span className="gradient-text gradient-primary">Danville Enciso</span>
          </h1>
          
          <div className="text-3xl font-semibold text-primary mb-6 min-h-[40px] flex items-center">
            {displayText}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[3px] h-[30px] bg-primary ml-1"
            />
          </div>

          <p className="text-lg text-text-muted mb-10 max-w-xl leading-relaxed">
            Adaptable Bachelor of Science in Information Technology student with practical, hands-on experience
            in full-stack development. Adept at bridging the gap between UI/UX design and functional system
            architecture.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <button 
              onClick={onOpenResume}
              className="btn btn-outline"
            >
              <FileText size={20} /> Resume
            </button>
            <a href="mailto:encisomichael4@gmail.com" className="btn btn-outline">
              <Send size={20} /> Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group hidden lg:block"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse-slow" />
          
          <div className="relative glass-card p-10 bg-bg-secondary/40">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            
            <pre className="font-mono text-sm md:text-base text-text-secondary leading-relaxed">
              <code>
                <span className="text-blue-400 italic">const</span> <span className="text-blue-300">developer</span> = {'{'}{'\n'}
                {'  '}name: <span className="text-green-300">'Danville Enciso'</span>,{'\n'}
                {'  '}role: <span className="text-green-300">'Full-Stack Dev'</span>,{'\n'}
                {'  '}skills: [<span className="text-green-300">'Laravel'</span>, <span className="text-green-300">'React'</span>],{'\n'}
                {'  '}passion: <span className="text-green-300">'Bridging UI/UX & Code'</span>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
