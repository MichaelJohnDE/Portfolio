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
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false)
  
  // Check if we should skip loading (e.g. returning from a docs page)
  const queryParams = new URLSearchParams(window.location.search)
  const shouldSkip = queryParams.get('skipLoading') === 'true'
  const [isLoading, setIsLoading] = React.useState(!shouldSkip)

  React.useEffect(() => {
    if (shouldSkip) {
      // Remove query param from URL so refresh still shows loading
      const url = new URL(window.location)
      url.searchParams.delete('skipLoading')
      window.history.replaceState({}, document.title, url.pathname)
    }
  }, [shouldSkip])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div 
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen overflow-hidden font-['Outfit']"
        >
          {/* 3D Background */}
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          {/* Decorative Blur Shapes */}
          <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0" />

          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          <main className="relative z-10">
            <Suspense fallback={null}>
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
