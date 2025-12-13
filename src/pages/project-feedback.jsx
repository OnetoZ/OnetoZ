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
                link: 'https://breezynapkins.com' // Added link
            },
            // Remaining items are for category illustration
            { name: 'Custom SaaS Solutions', description: 'Bespoke tools for business operations.', category: 'Web' },
            { name: 'API Integrations', description: 'Secure and scalable third-party connections.', category: 'Web' },
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
const ProjectSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    return (
        <div className="app-container">
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

                        <div className="modal-items-grid">
                            {selectedProject.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`modal-item ${item.isFeatured ? 'modal-item-featured' : ''}`}
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
            )}


            {/* The CSS is embedded here */}
            <style>{`
                /* Global Reset and Font */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #FFF9EA; 
                    color: ${ACCENT_COLOR_DARK};
                }

                .app-container {
                    min-height: 100vh;
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
                }

                .header-subtitle {
                    font-size: 24px;
                    font-weight: 500;
                    color: #4b5563;
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
                    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s;
                    z-index: 10;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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
                }

                .card-tagline {
                    font-size: 16px;
                    color: #6b7280;
                    margin-bottom: 20px;
                }
                
                .card-cta {
                    font-size: 14px;
                    font-weight: 600;
                    color: ${PRIMARY_COLOR_ACCENT};
                    align-self: flex-start;
                    padding: 8px 15px;
                    border-radius: 12px;
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    transition: background-color 0.2s, color 0.2s, transform 0.2s;
                    display: flex;
                    align-items: center;
                }

                .project-card-outer:hover .card-cta {
                    background-color: ${PRIMARY_COLOR_ACCENT};
                    color: ${CARD_BG};
                    transform: translateX(5px);
                }


                /* --- Modal Styles (Used for detailed view/click action) --- */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    z-index: 50;
                    background-color: rgba(0, 0, 0, 0.75);
                }

                .modal-content {
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 800px;
                    width: 100%;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    background-color: ${CARD_BG};
                    animation: fadeIn 0.3s ease-out;
                }

                .modal-close {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    padding: 8px;
                    border-radius: 9999px;
                    transition: background-color 0.2s;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                }

                .modal-close:hover {
                    background-color: #f3f4f6;
                }

                .modal-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 40px;
                    color: ${ACCENT_COLOR_DARK};
                }

                .modal-items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 24px;
                }

                .modal-item {
                    padding: 24px;
                    border-radius: 12px;
                    background-color: #f7f7f7;
                    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
                    border: 1px solid #e5e7eb;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .modal-item-featured {
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    border: 2px solid ${PRIMARY_COLOR_ACCENT};
                }
                .modal-item-featured .modal-item-name {
                    color: ${PRIMARY_COLOR_ACCENT};
                    text-shadow: 0 0 5px rgba(163, 139, 87, 0.5);
                }


                .modal-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    border-color: ${PRIMARY_COLOR_ACCENT};
                }

                .modal-item-icon-wrapper {
                    background-color: ${PRIMARY_COLOR_LIGHT};
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                }

                .modal-item-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: ${ACCENT_COLOR_DARK};
                }

                .modal-item-description {
                    font-size: 14px;
                    color: #666666;
                }

                .modal-item-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .modal-item-category-tag {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 4px 8px;
                    border-radius: 4px;
                    background-color: #e5e7eb;
                    color: #4b5563;
                }

                .modal-item-link-btn {
                    font-size: 12px;
                    font-weight: 600;
                    padding: 6px 12px;
                    border-radius: 8px;
                    background-color: ${PRIMARY_COLOR_ACCENT};
                    color: #fff;
                    text-decoration: none;
                    transition: background 0.2s;
                }
                .modal-item-link-btn:hover {
                    background-color: #8a7548;
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