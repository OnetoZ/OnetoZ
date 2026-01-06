import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ProfileSection from './ProfileSection';
import './aboutpage.css';
import ozLogo from './image/OZ logo.png'
import './LandingPage.css'
import teamOnetoz from './about us image/team onetoz.jpeg'


const AboutUsPage = ({ isDarkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId) => {
        setIsMobileMenuOpen(false); // Close mobile menu when navigating
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={`about-us-page-wrapper ${isDarkMode ? 'dark-theme lp-dark-theme' : ''}`}>
            {/* 1. Navigation Bar (Internal implementation to avoid import issues) */}
            <div className="lp-topBar lp-enter-up">
                {/* Small logo at the top (left) */}
                <img src={ozLogo} alt="OZ" className="lp-brandLogoSmall lp-pop" />
                <div className="lp-navPill">
                    <div className="lp-navItem" onClick={() => navigate('/')}>HOME</div>
                    <div className="lp-navItem" onClick={() => navigate('/')}>PROJECTS</div>
                    <div className="lp-navItem" onClick={() => navigate('/')}>PROCESS</div>
                    <div className="lp-navItem" onClick={() => navigate('/')}>CONTACT</div>
                    <div className="lp-navItem" onClick={() => scrollToSection('about-section')}>ABOUT US</div>
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
                    <div className="lp-mobile-nav-item" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>HOME</div>
                    <div className="lp-mobile-nav-item" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>PROJECTS</div>
                    <div className="lp-mobile-nav-item" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>PROCESS</div>
                    <div className="lp-mobile-nav-item" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>CONTACT</div>
                    <div className="lp-mobile-nav-item" onClick={() => scrollToSection('about-section')}>ABOUT US</div>

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

            {/* 2. Engaging Introduction Content */}
            <section className="about-intro-section">
                <div className="intro-content-container">
                    <h1 className="intro-title">
                        Connecting Minds, <span className="highlight-text">Creating Tomorrow</span>
                    </h1>
                    <p className="intro-subtitle">
                        We are <b>OnetoZ:</b> Digital Growth Partners dedicated to turning bold visions into measurable business results for businesses in Tamil Nadu. Our philosophy is simple: **Minimal Design, Maximal Impact**.
                    </p>

                    <div className="value-cards">
                        <div className="value-card">
                            <span className="card-icon">🎯</span>
                            <h3>Focus on ROI</h3>
                            <p>Every strategy is measured by tangible business growth, not just vanity metrics.</p>
                        </div>
                        <div className="value-card">
                            <span className="card-icon">🛠️</span>
                            <h3>Full-Stack Expertise</h3>
                            <p>From UI/UX design to deep-dive AI development, we handle the entire digital pipeline.</p>
                        </div>
                        <div className="value-card">
                            <span className="card-icon">🤝</span>
                            <h3>TN Market Experts</h3>
                            <p>In-depth understanding of local SEO, customer journeys, and market specifics in Tamil Nadu.</p>
                        </div>
                    </div>
                </div>

                {/* Image Placeholder inspired by your reference images (Mygom/Better Invest engaging layouts) */}
                <div className="intro-image-container">
                    <img src={teamOnetoz} alt="Team OnetoZ" className="intro-image" />
                    <p className="image-caption">The OnetoZ team in action, Coimbatore, TN.</p>
                </div>
            </section>

            <hr className="divider" />

            {/* 3. The Animated Team Showcase */}
            <section className="about-team-section">
                <h2 className="team-section-title">Meet Our Digital Architects</h2>
                <p className="team-section-subtitle">
                    The passionate minds blending strategy, design, and code to build your Growth Engine. Scroll to meet the team.
                </p>
                <ProfileSection />
            </section>

            {/* 4. Enhanced Footer */}
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
};

export default AboutUsPage;
