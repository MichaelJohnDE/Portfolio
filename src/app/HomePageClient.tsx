"use client";

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useLenis } from 'lenis/react'

import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ResumeModal from '../components/ResumeModal'

const HomePageClient = ({ experiences, projects, certifications, skills, profile }) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const lenis = useLenis()

  // Handle hash scrolling on mount (e.g. returning from a project subpage to /#projects)
  useEffect(() => {
    if (lenis && window.location.hash) {
      const hash = window.location.hash;
      // Small delay for Lenis to initialize properly
      const timer = setTimeout(() => {
        lenis.scrollTo(hash, { offset: -80, immediate: true });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lenis]);
  
  // Wait until profile is loaded (or use defaults)
  if (!profile) return null;

  return (
    <div className="relative min-h-screen font-sans bg-background text-on-surface">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} profile={profile} />

      <main className="relative z-10 w-full pt-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} profile={profile} />
        <Skills data={skills} />
        <Experience data={experiences} />
        <Projects data={projects} />
        <Certifications data={certifications} />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </main>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} profile={profile} />
    </div>
  )
}

export default HomePageClient
