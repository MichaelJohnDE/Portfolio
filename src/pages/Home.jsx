import React, { Suspense, lazy } from 'react'
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

const Home = ({ isResumeOpen, setIsResumeOpen }) => {
  return (
    <div className="relative min-h-screen font-sans bg-background text-on-surface">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="relative z-10 w-full pt-10">
        <Suspense fallback={null}>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>
    </div>
  )
}

export default Home
