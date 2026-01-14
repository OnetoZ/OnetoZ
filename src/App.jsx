import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Project from './pages/project-feedback.jsx'
import PricingSection from './pages/PricingSection.jsx'
import MeetingSection from './pages/MeetingSection.jsx'
import LoveLetters from './pages/LoveLetters.jsx'
import Footer from './pages/Footer.jsx'
import AboutUsPage from './pages/aboutpage.jsx'
import Preloader from './components/Preloader.jsx'

function MainContent({ isDarkMode, toggleDarkMode }) {
  const sectionStyle = { scrollMarginTop: '100px' };

  return (
    <>
      <div id="home" style={sectionStyle}>
        <LandingPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <div className={`main-layout-wrapper ${isDarkMode ? 'dark-theme' : ''}`} style={{ position: 'relative', zIndex: 25, backgroundColor: isDarkMode ? '#000000' : 'var(--color-light-bg)' }}>
        <div id="projects" style={sectionStyle}>
          <Project isDarkMode={isDarkMode} />
        </div>
        <div id="pricing" style={sectionStyle}>
          <PricingSection isDarkMode={isDarkMode} />
        </div>
        <div id="meeting" style={sectionStyle}>
          <MeetingSection isDarkMode={isDarkMode} />
        </div>
        <div id="love-letters" style={sectionStyle}>
          <LoveLetters isDarkMode={isDarkMode} />
        </div>
        <div id="contact" style={sectionStyle}>
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div >
    </>
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('onetoZ-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('onetoZ-theme', isDarkMode ? 'dark' : 'light');
    // Apply class to body for global style hooks
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/about-us-page" element={<AboutUsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="*" element={<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#000' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ marginTop: '20px', color: '#ff9d00', textDecoration: 'none', fontWeight: 'bold' }}>Return Home</a>
          </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}