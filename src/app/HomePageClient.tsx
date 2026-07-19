"use client";

import React, { Suspense, lazy, useState } from 'react'
import Navbar from '../components/Navbar'

// Lazy load sections for better performance
const Hero = lazy(() => import('../components/Hero'))
const Skills = lazy(() => import('../components/Skills'))
const Experience = lazy(() => import('../components/Experience'))
const Projects = lazy(() => import('../components/Projects'))
const Certifications = lazy(() => import('../components/Certifications'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))
const ResumeModal = lazy(() => import('../components/ResumeModal'))

const HomePageClient = ({ experiences, projects, certifications, skills, profile }) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  
  // Wait until profile is loaded (or use defaults)
  if (!profile) return null;

  return (
    <div className="relative min-h-screen font-sans bg-background text-on-surface">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} profile={profile} />

      <main className="relative z-10 w-full pt-10">
        <Suspense fallback={null}>
          <Hero onOpenResume={() => setIsResumeOpen(true)} profile={profile} />
          <Skills data={skills} />
          <Experience data={experiences} />
          <Projects data={projects} />
          <Certifications data={certifications} />
          <Contact profile={profile} />
          <Footer profile={profile} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} profile={profile} />
      </Suspense>
    </div>
  )
}

export default HomePageClient
