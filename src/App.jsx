import React, { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'

// Lazy load complex sections for better performance
const Hero = lazy(() => import('./components/Hero'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Certifications = lazy(() => import('./components/Certifications'))
const Footer = lazy(() => import('./components/Footer'))
const ThreeBackground = lazy(() => import('./components/ThreeBackground'))
const ResumeModal = lazy(() => import('./components/ResumeModal'))

function App() {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden font-['Outfit']">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Decorative Blur Shapes */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Footer />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>
    </div>
  )
}

export default App
