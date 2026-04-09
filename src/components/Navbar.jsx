import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'

const Navbar = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}>
      <div className="container-wide md:pt-0 max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <a href="#hero" className="text-xl font-bold tracking-tight flex items-center gap-2 group">
          <span className="text-text-primary">MJDE</span>
          <span className="text-brand-cyan group-hover:text-brand-emerald transition-colors">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors hover:-translate-y-0.5 duration-200"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-zinc-500 text-text-primary transition-all ml-4"
          >
            <FileText size={16} /> Resume
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-text-primary">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full glass-header flex flex-col items-center py-6 gap-6 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-text-secondary hover:text-brand-cyan transition-colors text-lg"
          >
            {link.name}
          </a>
        ))}
        <button 
          onClick={() => {
            onOpenResume()
            setMobileMenuOpen(false)
          }}
          className="flex items-center gap-2 text-text-primary text-lg"
        >
          <FileText size={18} /> Resume
        </button>
      </div>
    </nav>
  )
}

export default Navbar
