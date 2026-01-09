import React, { useState, useEffect, useRef } from 'react';
import { X, Globe, Smartphone, TrendingUp, ArrowRight } from 'lucide-react';

// --- Theme Colors matched to OnetoZ's light beige/dark text theme ---
const PRIMARY_COLOR_ACCENT = '#A38B57'; // Soft Gold/Brown for accents
const PRIMARY_COLOR_LIGHT = '#EFEAD4'; // Light Beige for background
const ACCENT_COLOR_DARK = '#222222'; // Dark text
const CARD_BG = '#ffffff'; // Card background

// --- Project Data with Breezy added and focus kept only on it ---
const projects = [
    {
        id: 1,
        title: 'Full Stack Development',
        icon: <Globe size={28} color={PRIMARY_COLOR_ACCENT} />,
        tagline: 'World-class web applications from front to back-end.',
        items: [
            // The required original client
            {
                name: 'Breezy (Live)',
                description: 'Full stack web development for an e-commerce platform.',
                category: 'Web',
                isFeatured: true,
                link: 'https://breezynapkins.com'
            },
            {
                name: 'Lumina',
                description: 'A high-end portfolio website designed to convey elegance, luxury, and modern minimalism. It features a bespoke animated entrance, butter-smooth scrolling, and a carefully curated aesthetic similar to premium brands.',
                category: 'Web',
                isFeatured: true,
                link: 'https://lumina-brand-assets.vercel.app/'
            },
            {
                name: 'OopsArt',
                description: 'A modern web platform for art enthusiasts to explore, share, and trade unique artworks. It combines the creativity and community aspects of social media with the functionality of an e-commerce platform to purchase or sell artworks seamlessly.',
                category: 'Web',
                isFeatured: true,
                link: 'https://oopsartv2.netlify.app/'
            },
            {
                name: 'RE:GEN!',
                description: 'Welcome to RE:GEN! We are redefining refurbished tech for the next generation. Premium quality, transparent pricing, and sustainable vibes. 🌱✨',
                category: 'Web',
                isFeatured: true,
                link: 'https://regen-laptop.vercel.app/'
            }
        ]
    },
    {
        id: 2,
        title: 'Mobile App Development',
        icon: <Smartphone size={28} color={PRIMARY_COLOR_ACCENT} />,
        tagline: 'Native and cross-platform apps for iOS and Android.',
        items: [
            { name: 'Prototyping & MVP Launch', description: 'Fast execution for new business ideas.', category: 'Mobile' },
            { name: 'Enterprise Apps', description: 'Tools for internal processes and data collection.', category: 'Mobile' },
        ]
    },
    {
        id: 3,
        title: 'Digital Marketing & SEO',
        icon: <TrendingUp size={28} color={PRIMARY_COLOR_ACCENT} />,
        tagline: 'Data-driven strategies for measurable online growth.',
        items: [
            { name: 'Local SEO & CRO', description: 'Targeting specific markets in Tamil Nadu.', category: 'Marketing' },
            { name: 'Content Strategy', description: 'Engaging content planning and execution.', category: 'Marketing' },
        ]
    },
];

// ... (ProjectCard component remains unchanged)

// --- Sub-Component: Project Card with Scroll Reveal Logic ---
const ProjectCard = ({ project, onClick, index }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.2, // Trigger when 20% of the item is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`project-card-outer group ${isVisible ? 'is-visible' : ''}`}
            style={{ '--animation-delay': `${index * 0.1}s` }} // Staggered delay
            onClick={() => onClick(project)}
        >
            <div className="project-card">
                <div className="card-header">
                    {project.icon}
                    <h3 className="card-title">{project.title}</h3>
                </div>
                <p className="card-tagline">{project.tagline}</p>
                <div className="card-cta">
                    Explore Projects
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </div>
            </div>
        </div>
    );
};


// --- Main Project Component ---
const ProjectSection = ({ isDarkMode }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`}>
            <div className="projects-section">

                {/* Header Section (Replicated from reference) */}
                <div className="header">
                    <h1 className="header-title">Our Capabilities</h1>
                    <h2 className="header-subtitle">Empowering Brands Through Digital Innovation</h2>
                </div>

                {/* Cards Grid */}
                <div className="cards-grid">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleProjectClick}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal (Detailed View) */}
            {selectedProject && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="modal-close"
                        >
                            <X size={24} color={ACCENT_COLOR_DARK} />
                        </button>

                        <h3 className="modal-title">
                            Projects for: {selectedProject.title}
                        </h3>

                        <div className="modal-scroll-container">
                            <div className="modal-items-grid">
                                {selectedProject.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`modal-item ${item.isFeatured ? 'modal-item-featured' : ''}`}
                                        style={{ '--item-index': idx }}
                                    >
                                        <div className="modal-item-icon-wrapper">
                                            {/* Use specific icons if desired, otherwise Globe is default */}
                                            {selectedProject.icon}
                                        </div>
                                        <h4 className="modal-item-name">
                                            {item.name}
                                        </h4>
                                        <p className="modal-item-description">
                                            {item.description}
                                        </p>

                                        <div className="modal-item-footer">
                                            <span className="modal-item-category-tag">{item.category}</span>

                                            {/* Conditionally Render Link Button */}
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="modal-item-link-btn"
                                                >
                                                    Visit Website
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* The CSS is embedded here */}
            <style>{`
                /* Global Reset and Font */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .app-container {
                    min-height: 100vh;
                    background-color: #FFF9EA;
                    color: ${ACCENT_COLOR_DARK};
                    transition: background-color 0.4s, color 0.4s;
                    width: 100%;
                }

                .app-container.dark-theme {
                    background-color: #000000;
                    color: #FFF9EA;
                }

                /* Section Layout */
                .projects-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 100px 32px;
                }

                .header {
                    text-align: center;
                    margin-bottom: 80px;
                }

                .header-title {
                    font-size: 48px;
                    font-weight: 800;
                    margin-bottom: 10px;
                    color: #000000;
                    letter-spacing: -1px;
                    transition: color 0.4s;
                }

                .dark-theme .header-title {
                    color: #FFF9EA;
                }

                .header-subtitle {
                    font-size: 24px;
                    font-weight: 500;
                    color: #4b5563;
                    transition: color 0.4s;
                }

                .dark-theme .header-subtitle {
                    color: #9CA3AF;
                }

                /* Cards Grid */
                .cards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 40px;
                }

                /* --- Project Card Styles --- */
                .project-card-outer {
                    cursor: pointer;
                    position: relative;
                    /* Initial state for scroll reveal (hidden/below) */
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                    transition: none; /* Disable transitions initially */
                }
                
                /* Scroll Reveal Animation */
                .project-card-outer.is-visible {
                    animation: popUpIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    animation-delay: var(--animation-delay); /* Use CSS variable for stagger */
                }

                @keyframes popUpIn {
                    0% { opacity: 0; transform: translateY(50px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                .project-card {
                    background-color: ${CARD_BG}; 
                    border-radius: 20px; /* Increased border radius for softer look */
                    padding: 35px;
                    height: 280px; 
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid ${PRIMARY_COLOR_LIGHT}; /* Subtle border */
                    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                    z-index: 10;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                }

                .dark-theme .project-card {
                    background-color: #1A1A1A;
                    border-color: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
                }
                
                .dark-theme .project-card-outer:hover .project-card {
                    border-color: ${PRIMARY_COLOR_ACCENT};
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
                }
                
                /* Hover effect on the card */
                .project-card-outer:hover .project-card {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                    border-color: ${PRIMARY_COLOR_ACCENT};
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 10px;
                }

                .card-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: ${ACCENT_COLOR_DARK};
                    transition: color 0.4s;
                }

                .dark-theme .card-title {
                    color: #FFF9EA;
                }

                .card-tagline {
                    font-size: 16px;
                    color: #6b7280;
                    margin-bottom: 20px;
                    transition: color 0.4s;
                }

                .dark-theme .card-tagline {
                    color: #9CA3AF;
                }
                
                .card-cta {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${PRIMARY_COLOR_ACCENT};
                    align-self: flex-start;
                    padding: 8px 15px;
                    border-radius: 12px;
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                }

                .dark-theme .card-cta {
                    background-color: #222;
                    color: ${PRIMARY_COLOR_ACCENT};
                }

                .project-card-outer:hover .card-cta {
                    background-color: ${PRIMARY_COLOR_ACCENT};
                    color: #FFF9EA;
                    transform: translateX(5px);
                }

                .dark-theme .project-card-outer:hover .card-cta {
                    background-color: ${PRIMARY_COLOR_ACCENT};
                    color: #111;
                }


                /* --- Modal Styles (Improved with Scrolling and Glassmorphism) --- */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    z-index: 1000;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    animation: fadeInOverlay 0.4s ease-out;
                }

                @keyframes fadeInOverlay {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-content {
                    border-radius: 32px;
                    padding: 48px;
                    max-width: 900px;
                    width: 100%;
                    max-height: 85vh;
                    position: relative;
                    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
                    background-color: ${CARD_BG};
                    animation: modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    transition: background-color 0.4s;
                    display: flex;
                    flex-direction: column;
                }

                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .dark-theme .modal-content {
                    background-color: #121212;
                    color: #FFF9EA;
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5),
                                inset 0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .modal-scroll-container {
                    overflow-y: auto;
                    padding-right: 12px;
                    margin-right: -12px;
                    flex: 1;
                }

                /* Custom Scrollbar for Modal */
                .modal-scroll-container::-webkit-scrollbar {
                    width: 6px;
                }
                .modal-scroll-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .modal-scroll-container::-webkit-scrollbar-thumb {
                    background: rgba(163, 139, 87, 0.2);
                    border-radius: 10px;
                }
                .modal-scroll-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(163, 139, 87, 0.4);
                }

                .modal-close {
                    position: absolute;
                    top: 28px;
                    right: 28px;
                    padding: 10px;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    background: rgba(0, 0, 0, 0.03);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }

                .dark-theme .modal-close {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .modal-close:hover {
                    background-color: #f3f4f6;
                    transform: rotate(90deg);
                }

                .dark-theme .modal-close:hover {
                    background-color: #222;
                }

                .modal-title {
                    font-size: 36px;
                    font-weight: 800;
                    margin-bottom: 32px;
                    color: ${ACCENT_COLOR_DARK};
                    transition: color 0.4s;
                    letter-spacing: -1px;
                }

                .dark-theme .modal-title {
                    color: #FFF9EA;
                }

                .modal-items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 24px;
                }

                .modal-item {
                    padding: 28px;
                    border-radius: 20px;
                    background-color: #fafafa;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid #eeeeee;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    opacity: 0;
                    animation: itemFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: calc(var(--item-index) * 0.1s + 0.2s);
                }

                @keyframes itemFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dark-theme .modal-item {
                    background-color: #1a1a1a;
                    border-color: rgba(255, 255, 255, 0.05);
                }
                
                .modal-item-featured {
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    border: 1px solid ${PRIMARY_COLOR_ACCENT};
                    box-shadow: 0 10px 20px rgba(163, 139, 87, 0.1);
                }

                .dark-theme .modal-item-featured {
                    background-color: rgba(163, 139, 87, 0.1);
                    border-color: ${PRIMARY_COLOR_ACCENT};
                }

                .modal-item-featured .modal-item-name {
                    color: ${PRIMARY_COLOR_ACCENT};
                }

                .modal-item:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
                    border-color: ${PRIMARY_COLOR_ACCENT};
                }

                .dark-theme .modal-item:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }

                .modal-item-icon-wrapper {
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                    transition: transform 0.3s ease;
                }

                .modal-item:hover .modal-item-icon-wrapper {
                    transform: scale(1.1) rotate(5deg);
                }

                .modal-item-name {
                    font-size: 20px;
                    font-weight: 700;
                    color: ${ACCENT_COLOR_DARK};
                    transition: color 0.4s;
                    line-height: 1.2;
                }

                .dark-theme .modal-item-name {
                    color: #FFF9EA;
                }

                .modal-item-description {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #555555;
                    transition: color 0.4s;
                    margin-bottom: 12px;
                }

                .dark-theme .modal-item-description {
                    color: #AAA;
                }

                .modal-item-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                
                .modal-item-category-tag {
                    font-size: 12px;
                    font-weight: 600;
                    padding: 6px 12px;
                    border-radius: 8px;
                    background-color: rgba(0, 0, 0, 0.05);
                    color: #555;
                    letter-spacing: 0.5px;
                }

                .dark-theme .modal-item-category-tag {
                    background-color: rgba(255, 255, 255, 0.05);
                    color: #999;
                }

                .modal-item-link-btn {
                    font-size: 13px;
                    font-weight: 700;
                    padding: 8px 16px;
                    border-radius: 10px;
                    background-color: ${PRIMARY_COLOR_ACCENT};
                    color: #fff;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    box-shadow: 0 4px 12px rgba(163, 139, 87, 0.2);
                }

                .modal-item-link-btn:hover {
                    background-color: #8a7548;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(163, 139, 87, 0.3);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                /* Responsive adjustments */
                @media (max-width: 1024px) {
                    .cards-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .cards-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .projects-section {
                        padding: 60px 20px;
                    }
                    .header-title {
                        font-size: 36px;
                    }
                    .header-subtitle {
                        font-size: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .modal-content {
                        padding: 20px;
                        border-radius: 16px;
                    }
                    .modal-items-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectSection;