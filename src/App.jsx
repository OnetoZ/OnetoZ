import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Project from './pages/project-feedback.jsx'
import MeetingSection from './pages/MeetingSection.jsx'
import LoveLetters from './pages/LoveLetters.jsx'
import Footer from './pages/Footer.jsx'
import AboutUsPage from './pages/aboutpage.jsx'
import Preloader from './components/Preloader.jsx'

function MainContent() {
  const sectionStyle = { scrollMarginTop: '100px' };

  return (
    <>
      <div id="home" style={sectionStyle}>
        <LandingPage />
      </div>
      <div id="projects" style={sectionStyle}>
        <Project />
      </div>
      {/* <div id="about-us" style={sectionStyle}>
        <ProfileSection />
      </div> */}
      <div id="meeting" style={sectionStyle}>
        <MeetingSection />
      </div>
      {/* <div id="what-we-offer" style={sectionStyle}>
        <WhatWeOffer />
      </div> */}
      <div id="love-letters" style={sectionStyle}>
        <LoveLetters />
      </div>
      <div id="contact" style={sectionStyle}>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us-page" element={<AboutUsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}