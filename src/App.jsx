import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import './index.css'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.28, ease: [0.4, 0.0, 0.2, 1] } }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      {/* Global UI layer — always rendered above page content */}
      <CursorGlow />
      <ScrollProgress />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
