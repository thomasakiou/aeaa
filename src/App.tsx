import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Programme from './pages/Programme'
import Registration from './pages/Registration'
import Submission from './pages/Submission'
import Contact from './pages/Contact'
import About from './pages/About'
import HostOrganisation from './pages/HostOrganisation'
import HostCountry from './pages/HostCountry'
import Gallery from './pages/Gallery'
import Speakers from './pages/Speakers'
import ExcursionSites from './pages/ExcursionSites'
import Venue from './pages/Venue'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import './index.css'

function App() {
    const [showBackToTop, setShowBackToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 320)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about/host-organisation" element={<HostOrganisation />} />
                    <Route path="/about/host-country" element={<HostCountry />} />
                    <Route path="/about/gallery" element={<Gallery />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/programme" element={<Programme />} />
                    <Route path="/programme/speakers" element={<Speakers />} />
                    <Route path="/programme/excursion-sites" element={<ExcursionSites />} />
                    <Route path="/programme/venue" element={<Venue />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/submission" element={<Submission />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
            {showBackToTop && (
                <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top" title="Back to top">
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    )
}

export default App
