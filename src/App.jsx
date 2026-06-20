import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SEO from './components/SEO'
import LoadingScreen from './components/LoadingScreen'
import { ReactLenis } from 'lenis/react'
import ThemeToggleFAB from './components/ThemeToggleFAB'

import Home from './pages/Home'
import FSUUDocs from './pages/FSUUDocs'
import PalihogDocs from './pages/PalihogDocs'
import StMichaelDocs from './pages/StMichaelDocs'
import LeVoyageDocs from './pages/LeVoyageDocs'
import RetailPosDocs from './pages/RetailPosDocs'

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
    <ReactLenis root>
      <SEO />
      <BrowserRouter>
        {isLoading ? (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Home isResumeOpen={isResumeOpen} setIsResumeOpen={setIsResumeOpen} />} />
            <Route path="/projects/fsuu" element={<FSUUDocs />} />
            <Route path="/projects/palihog" element={<PalihogDocs />} />
            <Route path="/projects/stmichael" element={<StMichaelDocs />} />
            <Route path="/projects/levoyage" element={<LeVoyageDocs />} />
            <Route path="/projects/retail-pos" element={<RetailPosDocs />} />
          </Routes>
        )}
        <ThemeToggleFAB />
      </BrowserRouter>
    </ReactLenis>
  )
}

export default App
