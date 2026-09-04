"use client";

import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLenis } from 'lenis/react'
import Image from 'next/image'

const Navbar = ({ onOpenResume, profile }: { onOpenResume: () => void, profile: any }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const lenis = useLenis()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      
      if (lenis) {
        lenis.scrollTo(href, { offset: -80 }); // Offset for navbar
      } else {
        const element = document.querySelector(href);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' }
  ]

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-outline-variant/20 ${scrolled ? 'bg-surface-glass/60 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] h-16">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="flex items-center gap-3 group h-12">
            <div className="relative h-full aspect-square">
              <Image src="/assets/images/MJDBuilt_logo.png" alt="Logo" fill sizes="48px" priority className="object-contain" />
            </div>
            <div className="font-headline-md text-headline-md font-bold tracking-tight flex items-center">
              <span className="text-on-surface">{profile.logoText.replace('.', '')}</span>
              <span className="text-primary group-hover:text-secondary transition-colors">.</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
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
      <div className={`md:hidden fixed top-16 left-0 w-full bg-surface-glass/80 backdrop-blur-xl border-b border-outline-variant/20 flex flex-col items-center py-6 gap-6 transition-all duration-300 z-40 ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
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
