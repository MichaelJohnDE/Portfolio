import React from 'react'
import { HERO_DATA } from '../data/content'

const Contact = () => {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-[5%] md:px-[6%] lg:px-[8%]" id="contact">
      <div className="w-full mx-auto bg-primary text-on-primary rounded-3xl p-12 md:p-24 text-center signature-shadow relative overflow-hidden">
        {/* Abstract Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[200%] bg-surface-bright rounded-full blur-[120px]"></div>
        </div>
        
        <h2 className="font-display text-headline-lg md:text-display relative z-10 mb-8">
          Ready to build something <br/>extraordinary?
        </h2>
        <p className="font-body-lg text-body-lg relative z-10 opacity-80 mb-12 max-w-2xl mx-auto">
          Currently open for opportunities and collaborations. Let's discuss how my skills align with your needs.
        </p>
        <a 
          className="relative z-10 bg-on-primary text-primary px-12 py-5 rounded-full font-label-caps text-label-caps signature-shadow hover:scale-105 transition-transform inline-block" 
          href={`mailto:${HERO_DATA.email}`}
        >
          START A CONVERSATION
        </a>
      </div>
    </section>
  )
}

export default Contact
