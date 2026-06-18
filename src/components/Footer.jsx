import React from 'react'
import { HERO_DATA } from '../data/content'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant border-opacity-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] gap-gutter">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <a className="font-label-caps text-label-caps text-on-surface font-bold" href="#">MJDE.</a>
            <span className="text-xs font-mono text-on-surface-variant opacity-50 border border-on-surface-variant/20 rounded px-2 py-0.5">V4.0</span>
          </div>
          <p className="text-on-surface-variant font-body-md mt-4">© {currentYear} {HERO_DATA.name} {HERO_DATA.lastName}. Powered by modern tools for maximum efficiency.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-8 md:mt-0">
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href="https://github.com/MichaelJohnDE" target="_blank" rel="noreferrer">GitHub</a>
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href="https://linkedin.com/in/michael-john-danville-enciso-416235189" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="text-on-surface-variant font-body-md hover:text-primary transition-colors" href={`mailto:${HERO_DATA.email}`}>Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
