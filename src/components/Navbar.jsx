import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' }
  ]

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-outline-variant/20 ${scrolled ? 'bg-surface/80 glass-nav shadow-lg' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] h-16">
          <a href="#about" className="font-headline-md text-headline-md font-bold tracking-tight flex items-center group">
            <span className="text-on-surface">MJDE</span>
            <span className="text-primary group-hover:text-secondary transition-colors">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={onOpenResume}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity"
            >
              Resume
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-primary"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <div className={`md:hidden fixed top-16 left-0 w-full bg-surface/95 glass-nav border-b border-outline-variant/20 flex flex-col items-center py-6 gap-6 transition-all duration-300 z-40 ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors text-lg"
          >
            {link.name}
          </a>
        ))}
        <button 
          onClick={() => {
            onOpenResume()
            setMobileMenuOpen(false)
          }}
          className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-caps text-label-caps mt-2"
        >
          Resume
        </button>
      </div>
    </>
  )
}

export default Navbar

