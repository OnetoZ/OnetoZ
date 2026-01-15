import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import Squares from '../components/Backgrounds/Squares'
// NOTE: Assuming image files are available in the correct relative path
import ozLogo from './image/OZ logo.png'
import ThreeScene from '../components/Three'
// Assuming onetoZLogo is not needed in the center anymore

// Component Data for the Growth Pillars
const growthPillars = [
  {
    icon: '🌐',
    title: 'World-Class Digital Product',
    desc: 'Custom web development, local SEO optimization, and mobile performance built for your specific market—not a generic template.',
  },
  {
    icon: '📈',
    title: 'Data-Driven Growth Consulting',
    desc: 'Ongoing marketing automation, conversion tracking, and quarterly strategy reviews to ensure consistent growth and ROI.',
  },
  {
    icon: '🎯',
    title: 'Tamil Nadu Market Focus',
    desc: 'Exclusive focus on Hospitality, Education, and Retail sectors in TN, giving you a competitive edge over national agencies.',
  },
  {
    icon: '✅',
    title: 'Measured on Your Success',
    desc: 'Our partnership is defined by your real business results and growth, moving beyond simple project completion metrics.',
  },
];


// Internal Component for Typewriter Effect
const Typewriter = ({ text }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0); // Reset on text change
    const interval = setInterval(() => {
      setCount((prev) => (prev >= text.length ? prev : prev + 1));
    }, 50); // Typing speed
    return () => clearInterval(interval);
  }, [text]);

  return <span>{text.substring(0, count)}<span style={{ borderRight: '2px solid rgba(255,255,255,0.8)', marginLeft: '2px', animation: 'blink 1s step-end infinite' }}></span></span>;
};

// Internal Component for Text Rotation
const TextRotator = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); // 'in', 'out'

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFadeState('in');
      }, 600);
    }, 3000); // Increased to 4s to allow typing to finish comfortably

    return () => clearInterval(interval);
  }, [phrases.length]);

  const currentPhrase = phrases[index];
  const isTypingPhrase = currentPhrase === "Design. Build. Grow. Repeat.";

  return (
    <div
      className="lp-quote"
      style={{
        minHeight: '1.2em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
        opacity: fadeState === 'in' ? 1 : 0,
        transform: fadeState === 'in' ? 'translateY(0px)' : 'translateY(10px)',
        willChange: 'opacity, transform'
      }}
    >
      {isTypingPhrase ? <Typewriter text={currentPhrase} /> : currentPhrase}
    </div>
  );
};

export default function LandingPage({ isDarkMode, toggleDarkMode }) {
  const heroContentRef = useRef(null);
  const heroBackgroundRef = useRef(null);
  const heroSectionRef = useRef(null);
  const scrollPositionRef = useRef(0); // Store scroll position
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately and repeatedly to override browser behavior
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      scrollPositionRef.current = 0;
    };

    // Call immediately
    forceScrollTop();

    // Call again after a short delay to ensure it takes effect
    const timeoutId = setTimeout(forceScrollTop, 10);

    let ticking = false; // rAF flag to prevent multiple requests

    // --- FUNCTION TO APPLY TRANSFORMATIONS ---
    const updateElements = () => {
      const scrollY = scrollPositionRef.current;
      const maxScroll = 500; // Faster fade out

      // Fixed Nav Logic
      const header = document.querySelector('.lp-topBar');
      if (header) {
        if (scrollY > 10) header.classList.add('lp-fixed');
        else header.classList.remove('lp-fixed');
      }

      // --- HERO PARALLAX & FADE TRANSITION ---
      if (heroContentRef.current) {
        // Parallax: Content moves faster to clear the way for the next section
        const contentTransform = `translateY(${scrollY * 1.2}px)`;

        // Fade Out: Opacity transition from 1 to 0 over the first 600px of scroll
        const scrollRange = Math.min(scrollY, maxScroll);
        const opacity = 1 - (scrollRange / maxScroll);

        heroContentRef.current.style.transform = contentTransform;
        heroContentRef.current.style.opacity = opacity;
      }

      // Background logo (moves very slow - 0.1x speed)
      if (heroBackgroundRef.current) {
        heroBackgroundRef.current.style.transform = `translateX(-50%) translateY(${scrollY * 0.1}px)`;
      }

      // --- Scroll Reveal for Sections (can stay outside rAF for performance gain if only class toggle is used) ---
      // However, keeping it in the scroll handler is fine too.
      document.querySelectorAll('.lp-scroll-reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Reveals when the element is 20% into the viewport
        if (rect.top < windowHeight * 0.8) {
          el.classList.add('visible');
        }
      });

      ticking = false; // Reset the flag
    };


    // --- SYNCHRONOUS SCROLL LISTENER (only updates position and requests animation) ---
    const onScroll = () => {
      scrollPositionRef.current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateElements);
        ticking = true;
      }
    }

    // Initial call to set state correctly on load/refresh
    updateElements();

    window.addEventListener('scroll', onScroll, { passive: true }); // Use passive: true for performance

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means this runs once on mount

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      // Use getBoundingClientRect for modern, reliable position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to wrap text in <span> for letter animation
  const animateText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ animationDelay: `${0.04 * index}s` }}>{char === ' ' ? '\u00A0' : char}</span>
    ));
  };


  return (
    <div className={`lp-page ${isDarkMode ? 'lp-dark-theme' : ''}`}>
      {/* TOP BAR - Moved container inside or managed separately */}
      <div className="lp-topBar lp-enter-up">
        <img src={ozLogo} alt="OnetoZ Technologies - Digital Growth Partners" className="lp-brandLogoSmall lp-pop" />
        <div className="lp-navPill">
          <div className="lp-navItem" onClick={() => scrollToSection('home')}>HOME</div>
          <div className="lp-navItem" onClick={() => scrollToSection('projects')}>PROJECTS</div>
          <div className="lp-navItem" onClick={() => scrollToSection('process')}>PROCESS</div>
          <div className="lp-navItem" onClick={() => scrollToSection('contact')}>CONTACT</div>
          <div className="lp-navItem" onClick={() => navigate('/about-us-page')}>ABOUT US</div>
        </div>

        {/* Desktop Theme Toggle */}
        <div className="lp-gridWrap lp-pop lp-desktop-only" onClick={toggleDarkMode}>
          <span className="lp-gridSquare-top-left" />
          <span className="lp-gridSquare-top-right" />
          <span className="lp-gridSquare-bottom-left" />
          <span className="lp-gridSquare-bottom-right" />
        </div>

        {/* Mobile Hamburger Menu */}
        <div
          className={`lp-hamburger ${isMobileMenuOpen ? 'lp-hamburger-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lp-mobile-menu ${isMobileMenuOpen ? 'lp-mobile-menu-open' : ''}`}>
        <div className="lp-mobile-menu-content">
          <div className="lp-mobile-nav-item" onClick={() => scrollToSection('home')}>HOME</div>
          <div className="lp-mobile-nav-item" onClick={() => scrollToSection('projects')}>PROJECTS</div>
          <div className="lp-mobile-nav-item" onClick={() => scrollToSection('process')}>PROCESS</div>
          <div className="lp-mobile-nav-item" onClick={() => scrollToSection('contact')}>CONTACT</div>
          <div className="lp-mobile-nav-item" onClick={() => { navigate('/about-us-page'); setIsMobileMenuOpen(false); }}>ABOUT US</div>

          {/* Theme Toggle in Mobile Menu */}
          <div className="lp-mobile-theme-toggle" onClick={toggleDarkMode}>
            <div className="lp-gridWrap lp-pop">
              <span className="lp-gridSquare-top-left" />
              <span className="lp-gridSquare-top-right" />
              <span className="lp-gridSquare-bottom-left" />
              <span className="lp-gridSquare-bottom-right" />
            </div>
            <span>Toggle Theme</span>
          </div>
        </div>
      </div>

      <div id="home" className="lp-hero" ref={heroSectionRef}>
        {isDarkMode && (
          <div className="lp-heroSquares">
            <Squares
              speed={0.5}
              squareSize={80}
              direction='diagonal'
              borderColor='rgba(255, 249, 234, 0.05)'
              hoverFillColor='rgba(163, 139, 87, 0.1)'
            />
          </div>
        )}

        {/* OZ circle logo (Background Element) */}
        <img
          src={ozLogo}
          alt="OnetoZ Digital Growth Engine Logo"
          className="lp-logoHeroOZ lp-fade-in"
          ref={heroBackgroundRef}
          style={{ animationDelay: '0.2s', preserveAspectRatio: 'xMidYMid meet' }}
        />

        {/* 3D Fox Model Performance Overlay */}
        {isDarkMode && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          >
            <ThreeScene modelPath="/models/fox/scene.gltf" />
          </div>
        )}

        <div className="lp-heroContent" ref={heroContentRef} style={{ willChange: 'transform, opacity' }}>

          <h1 className="lp-tagline lp-fade-in" style={{ animationDelay: '0.6s' }}>
            Onetoz Technologies | Digital Growth Partners & Startup Tech Agency in Coimbatore
          </h1>


          {/* Text Rotator for Hero Section */}
          <TextRotator
            phrases={[
              "Connecting Minds. Creating Tomorrow.",
              "Think Smart. Build Right.",
              "Strategy First. Growth Always.",
              "Simple by Design. Powerful by Impact.",
              "Design. Build. Grow. Repeat."
            ]}
          />

          <div className="lp-sub lp-fade-in" style={{ animationDelay: '1.2s' }}>
            We build high-performance <strong>websites</strong>, <strong>mobile apps</strong>, and <strong>Digital Growth Engines</strong> designed for maximum local SEO and revenue growth for startups in <strong>Coimbatore</strong> and across <strong>Tamil Nadu</strong>.
          </div>

          <div className="lp-ctaRow lp-fade-in" style={{ animationDelay: '1.5s' }}>
            <button className="lp-cta lp-cta-primary lp-slide-left" onClick={() => scrollToSection('what-we-offer')}>UNLOCK YOUR GROWTH</button>
            <button className="lp-cta lp-slide-right" onClick={() => scrollToSection('contact')}>GET A QUOTE</button>
          </div>
        </div>
      </div>

      <div className="lp-scrollContent">
        {/* ========================================================================= */}
        {/* CONTENT SECTION 1: Differentiator (Digital Growth Engine) */}
        {/* ========================================================================= */}
        <section id="what-we-offer" className="lp-differentiatorSection lp-scroll-reveal">
          <div className="lp-container">
            <div className="lp-growthEngineText">
              <h2 className="lp-differentiator-title">
                The Digital Growth Engine for Your Business
              </h2>
              <p className="lp-differentiator-subtitle">
                Turning your vision into measurable business results in Tamil Nadu.
              </p>
            </div>
            <div className="lp-pillarsGrid-2x2">
              {growthPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="lp-pillar-2x2 lp-pop-in-stagger"
                  style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                >
                  <div className="lp-pillarIcon-2x2">{pillar.icon}</div>
                  <h3 className="lp-pillarTitle-2x2">{pillar.title}</h3>
                  <p className="lp-pillarDesc-2x2">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* CONTENT SECTION 2: Process (How We Work) */}
        {/* ========================================================================= */}
        <section id="process" className="lp-processSection lp-scroll-reveal">
          <div className="lp-container">
            <h2 className="lp-processTitle">Your Roadmap to Digital Leadership</h2>
            <p className="lp-processSubtitle">A collaborative, four-step process designed for measurable growth.</p>

            <div className="lp-processFlow">
              {/* Steps are unchanged from previous version, retaining fixed number/text positions */}
              <div className="lp-processStep lp-pop-in-stagger" style={{ animationDelay: '0.2s' }}>
                <div className="lp-processNumber">01</div>
                <h3 className="lp-processHeader">Define the Vision</h3>
                <p className="lp-processDesc">In-depth consultation to clarify your market, customer journey, and specific growth targets in the TN market.</p>
              </div>
              <div className="lp-processConnector lp-pop-in-stagger" style={{ animationDelay: '0.4s' }}>→</div>

              <div className="lp-processStep lp-pop-in-stagger" style={{ animationDelay: '0.6s' }}>
                <div className="lp-processNumber">02</div>
                <h3 className="lp-processHeader">Build the Engine</h3>
                <p className="lp-processDesc">Custom, high-performance website and digital products developed with maximum local SEO and mobile focus.</p>
              </div>
              <div className="lp-processConnector lp-pop-in-stagger" style={{ animationDelay: '0.8s' }}>→</div>

              <div className="lp-processStep lp-pop-in-stagger" style={{ animationDelay: '1.0s' }}>
                <div className="lp-processNumber">03</div>
                <h3 className="lp-processHeader">Activate Growth</h3>
                <p className="lp-processDesc">Implementation of marketing automation, conversion tracking, and initial data-driven campaigns.</p>
              </div>
              <div className="lp-processConnector lp-pop-in-stagger" style={{ animationDelay: '1.2s' }}>→</div>

              <div className="lp-processStep lp-pop-in-stagger" style={{ animationDelay: '1.4s' }}>
                <div className="lp-processNumber">04</div>
                <h3 className="lp-processHeader">Optimize & Scale</h3>
                <p className="lp-processDesc">Quarterly strategy reviews and continuous iteration based on real business metrics to ensure sustained growth.</p>
              </div>
            </div>

            <div className="lp-processCtaRow">
              <button id="meeting" className="lp-cta lp-cta-primary lp-slide-up lp-pop-in-stagger" style={{ animationDelay: '1.6s' }} onClick={() => scrollToSection('contact')}>BOOK A GROWTH MEETING</button>
            </div>
          </div>
        </section>


        {/* VIDEO / YOUTUBE SECTION */}
        <section className="lp-videoSection lp-scroll-reveal" id="video">
          <div className="lp-container">
            <div className="lp-videoWrapper">
              <div className="lp-videoContainer lp-pop-in-stagger" style={{ animationDelay: '0.2s' }}>
                <div className="lp-videoCard">
                  <span className="lp-videoPlaceholderText">OnetoZ Case Study Preview <br />Video coming soon</span>
                </div>
              </div>

              <div className="lp-videoContent lp-pop-in-stagger" style={{ animationDelay: '0.5s' }}>
                <h2 className="lp-video-title">Our Growth Philosophy: Minimal Design,<br /> Maximal Impact.</h2>
                <p className="lp-videoCaption">
                  We blend minimal design with scalable intelligence, crafting solutions that adapt and grow with you. At OnetoZ, every interface is made to feel effortless and timeless. <strong>Watch our latest case study on YouTube.</strong>
                </p>
                <button className="lp-video-cta" onClick={() => alert('Redirecting to YouTube Channel')}>
                  Visit Our YouTube Channel →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div >
  )
}