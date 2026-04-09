import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import SEO from './components/SEO'

// Lazy load sections for better performance
const Hero = lazy(() => import('./components/Hero'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Certifications = lazy(() => import('./components/Certifications'))
const Footer = lazy(() => import('./components/Footer'))
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
    <>
      <SEO />
      {isLoading ? (
        <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen font-sans bg-background">
          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          <main className="relative z-10 w-full pt-10">
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
        </div>
      )}
    </>
  )
}

export default App
