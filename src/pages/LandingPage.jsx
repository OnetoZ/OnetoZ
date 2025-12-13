import React, { useEffect, useRef } from 'react'
import './LandingPage.css'
// NOTE: Assuming image files are available in the correct relative path
import ozLogo from './image/OZ logo.png' 
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

export default function LandingPage() {
  const heroContentRef = useRef(null); 
  const heroBackgroundRef = useRef(null); 
  const heroSectionRef = useRef(null); 
  const scrollPositionRef = useRef(0); // Store scroll position

  useEffect(() => {
    let ticking = false; // rAF flag to prevent multiple requests

    // --- FUNCTION TO APPLY TRANSFORMATIONS ---
    const updateElements = () => {
        const scrollY = scrollPositionRef.current;
        const maxScroll = 600; // Total scroll distance for fade/parallax effect

        // Fixed Nav Logic
        const header = document.querySelector('.lp-topBar');
        if (header) {
            if (scrollY > 10) header.classList.add('lp-fixed');
            else header.classList.remove('lp-fixed');
        }

        // --- HERO PARALLAX & FADE TRANSITION ---
        if (heroContentRef.current) {
            // Parallax: Content moves slightly faster (reduced from 0.9 to 0.7 for smoothness)
            const contentTransform = `translateY(${scrollY * 0.7}px)`;
            
            // Fade Out: Opacity transition from 1 to 0 over the first 600px of scroll
            const scrollRange = Math.min(scrollY, maxScroll);
            const opacity = 1 - (scrollRange / maxScroll); 
            
            heroContentRef.current.style.transform = contentTransform;
            heroContentRef.current.style.opacity = opacity; 
        }
        
        // Background logo (moves very slow - 0.1x speed)
        if (heroBackgroundRef.current) {
            heroBackgroundRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
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
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // Empty dependency array means this runs once on mount

  const scrollToSection = (sectionId) => {
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
    <div className="lp-page">
      <div className="lp-container">
        {/* TOP BAR - Navigation kept transparent and grid icon updated */}
        {/* NOTE: The initial styling of lp-topBar in CSS should ensure it is transparent by default */}
        <div className="lp-topBar lp-enter-up">
          {/* Small logo at the top (left) */}
          <img src={ozLogo} alt="OZ" className="lp-brandLogoSmall lp-pop" />
          <div className="lp-navPill">
            <div className="lp-navItem" onClick={() => scrollToSection('home')}>HOME</div>
            <div className="lp-navItem" onClick={() => scrollToSection('projects')}>PROJECTS</div>
            <div className="lp-navItem" onClick={() => scrollToSection('process')}>PROCESS</div> 
            <div className="lp-navItem" onClick={() => scrollToSection('contact')}>CONTACT</div>
            <div className="lp-navItem" onClick={() => window.location.href = '/about-us-page'}>ABOUT US</div>
          </div>
          {/* 2x2 grid icon */}
          <div className="lp-gridWrap lp-pop">
            <span className="lp-gridSquare-top-left" />
            <span className="lp-gridSquare-top-right" />
            <span className="lp-gridSquare-bottom-left" />
            <span className="lp-gridSquare-bottom-right" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION - STICKY CONTAINER FOR SMOOTH TRANSITION */}
        {/* ========================================================================= */}
        <div id="home" className="lp-hero" ref={heroSectionRef}>
          
          {/* OZ circle logo (Background Element) - Slower Parallax */}
          <img 
            src={ozLogo} 
            alt="OZ" 
            className="lp-logoHeroOZ lp-fade-in" 
            ref={heroBackgroundRef} 
            // Added will-change for performance hint
            style={{ animationDelay: '0.2s', willChange: 'transform' }}
          />
          
          <div className="lp-heroContent" ref={heroContentRef} style={{ willChange: 'transform, opacity' }}>
            
            <div className="lp-tagline lp-fade-in" style={{ animationDelay: '0.6s' }}>
                DIGITAL GROWTH PARTNERS FOR TAMIL NADU BUSINESSES
            </div>

            {/* Massive Typography for WOW effect */}
            <div className="lp-quote lp-letters" data-text="Connecting Minds, Creating Tomorrow">
              {animateText('Design. Build. Grow. Repeat.')}
            </div>
            
            <div className="lp-sub lp-fade-in" style={{ animationDelay: '1.2s' }}>
              We don't just build stunning websites and apps; we build complete <b>Digital Growth Engines</b> designed for maximum local SEO, mobile performance, and measurable revenue growth in your specific market.
            </div>
            
            <div className="lp-ctaRow lp-fade-in" style={{ animationDelay: '1.5s' }}>
              <button className="lp-cta lp-slide-left" onClick={() => scrollToSection('what-we-offer')}>UNLOCK YOUR GROWTH</button>
              <button className="lp-cta lp-slide-right" onClick={() => scrollToSection('contact')}>GET A QUOTE</button>
            </div>
          </div>
        </div>
        
        {/* The rest of the content is wrapped in a container that scrolls over the sticky hero */}
        <div className="lp-scrollContent">

            {/* ========================================================================= */}
            {/* CONTENT SECTION 1: Differentiator (Digital Growth Engine) */}
            {/* ========================================================================= */}
            <section id="what-we-offer" className="lp-differentiatorSection lp-scroll-reveal">
              <div className="lp-growthEngineText">
                <h2 className="lp-differentiator-title">
                  The Digital Growth Engine
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
            </section>


            {/* ========================================================================= */}
            {/* CONTENT SECTION 2: Process (How We Work) */}
            {/* ========================================================================= */}
            <section id="process" className="lp-processSection lp-scroll-reveal">
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
            </section>


            {/* VIDEO / YOUTUBE SECTION */}
            <section className="lp-videoSection lp-scroll-reveal" id="video">
              <div className="lp-videoContainer lp-pop-in-stagger" style={{ animationDelay: '0.2s' }}>
                <div className="lp-videoCard">
                  <span className="lp-videoPlaceholderText">OnetoZ Case Study Preview - Click to Play</span>
                </div>
              </div>
              
              <div className="lp-videoContent lp-pop-in-stagger" style={{ animationDelay: '0.5s' }}>
                <h2 className="lp-video-title">Our Growth Philosophy: Minimal Design, Maximal Impact.</h2>
                <p className="lp-videoCaption">
                  We blend minimal design with scalable intelligence, crafting solutions
                  that adapt and grow with you. At OnetoZ, every interface is
                  made to feel effortless and timeless. <strong> Watch our latest case study on YouTube. </strong>
                </p>
                <button className="lp-cta lp-cta-primary" onClick={() => alert('Redirecting to YouTube Channel')}>
                    Visit Our YouTube Channel →
                </button>
              </div>
            </section>
        </div> {/* End of lp-scrollContent */}
      </div>
    </div>
  )
}