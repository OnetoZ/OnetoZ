import React, { useRef, useEffect, useState, useCallback } from 'react';

const TestimonialSection = ({ isDarkMode }) => {
  // --- Testimonial Data ---
  const allTestimonials = [
    {
      quote: "The strategic roadmap OnetoZ built was instrumental. Minimal design, maximal impact is truly their philosophy.",
      name: "Sanjay Raj",
      role: "E-Commerce Founder",
      avatar: "https://i.pravatar.cc/80?img=12",
    },
    {
      quote: "Our new website functions like a complete 'Digital Growth Engine.' We saw a 30% jump in local SEO performance within a month.",
      name: "Priya Sharma",
      role: "Restaurant Chain Owner, TN",
      avatar: "https://i.pravatar.cc/80?img=32",
    },
    {
      quote: "The personalized consulting focused us entirely on conversion tracking and quantifiable ROI. No more guessing games.",
      name: "Gautam Rao",
      role: "FinTech Strategist",
      avatar: "https://i.pravatar.cc/80?img=48",
    },
    {
      quote: "OnetoZ gave us a competitive edge in the Tamil Nadu market. Their industry focus is unmatched.",
      name: "Anjali Menon",
      role: "Hospitality Group CEO",
      avatar: "https://i.pravatar.cc/80?img=6",
    },
    {
      quote: "Truly world-class digital product design. Effortless, timeless, and completely centered around our users.",
      name: "Heidi B.",
      role: "Director of Business Development",
      avatar: "https://i.pravatar.cc/80?img=18",
    },
    {
      quote: "Exceptional mobile performance and backend robustness. A full-stack solution that works flawlessly.",
      name: "Dimitra Spiliotopoulou",
      role: "Head of Sales at Indico Labs",
      avatar: "https://i.pravatar.cc/80?img=28",
    },
    {
      quote: "Ridiculously smooth delivery and flawless execution. The craft and care show in every detail.",
      name: "Alex Patel",
      role: "Product Lead",
      avatar: "https://i.pravatar.cc/80?img=5",
    },
    {
      quote: "Our team saves hours every week. The insights are incredibly actionable and easy to apply.",
      name: "Jane Smith",
      role: "Sales Manager",
      avatar: "https://i.pravatar.cc/80?img=10",
    },
    {
      quote: "The personalized feedback completely changed how I approach cold outreach. Response rates are up 25%.",
      name: "Mark O'Connell",
      role: "Senior SDR",
      avatar: "https://i.pravatar.cc/80?img=20",
    },
    {
      quote: "It's like having a coach reviewing every email before I hit send. Essential tool for modern sales.",
      name: "Elena Rodriguez",
      role: "Account Executive",
      avatar: "https://i.pravatar.cc/80?img=30",
    },
    {
      quote: "We've seen a significant increase in email engagement since implementing Lavender. Highly recommend!",
      name: "Chris Green",
      role: "VP of Sales",
      avatar: "https://i.pravatar.cc/80?img=40",
    },
    {
      quote: "Finally, an AI tool that actually understands sales communication. Game changer for productivity.",
      name: "Olivia White",
      role: "Sales Director",
      avatar: "https://i.pravatar.cc/80?img=50",
    },
  ];

  // --- Refs and State for Scroll/Drag Logic ---
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollIntervalRef = useRef(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Ref to store the total rotation applied to the scroll track
  const totalRotationRef = useRef(0);
  // Ref to track the previous scroll position
  const lastScrollLeftRef = useRef(0);

  // --- Auto-Scroll Logic for Mobile ---
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && trackRef.current && !isAutoScrollPaused) {
      // Start auto-scrolling
      autoScrollIntervalRef.current = setInterval(() => {
        if (trackRef.current && !isDragging) {
          const track = trackRef.current;
          const maxScroll = track.scrollWidth - track.clientWidth;

          // Scroll by 1px every 20ms (smooth scrolling)
          if (track.scrollLeft >= maxScroll) {
            // Reset to beginning when reaching the end
            track.scrollLeft = 0;
          } else {
            track.scrollLeft += 1;
          }
        }
      }, 20);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isDragging, isAutoScrollPaused]);

  // --- Drag Handlers ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(trackRef.current.scrollLeft);
    e.currentTarget.style.cursor = 'grabbing';
    setIsAutoScrollPaused(true); // Pause auto-scroll when dragging
  };

  const handleMouseLeave = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = 'grab';
    // Resume auto-scroll after a delay
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = 'grab';
    // Resume auto-scroll after a delay
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = () => {
    setIsAutoScrollPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  // Pause on hover (desktop)
  const handleMouseEnter = () => {
    setIsAutoScrollPaused(true);
  };

  const handleMouseLeaveTrack = () => {
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  // --- REMOVED ROLLING TIRE ANIMATION LOGIC ---
  // The user requested to remove rotation during scroll on mobile.
  const handleScroll = useCallback(() => {
    // Rotation logic removed as requested.
  }, []);

  useEffect(() => {
    const trackElement = trackRef.current;
    if (trackElement) {
      // Initialize last scroll position
      lastScrollLeftRef.current = trackElement.scrollLeft;

      // Attach scroll listener
      trackElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (trackElement) {
        trackElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);


  // --- Entrance Animation Logic ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Re-animate on scroll back
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.2 }
    );

    const timer = setTimeout(() => {
      const cardWrappers = document.querySelectorAll('.card-container');
      cardWrappers.forEach((wrapper) => {
        observer.observe(wrapper);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Initial card rotations (for the natural wavy look)
  const initialRotations = [-3, 1, -2, 3];

  // --- Render ---
  return (
    <div className={`feedback-section ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Increased gap from previous section */}
      <div className="feedback-header-content">
        <h1 className="feedback-title">Client Testimonials</h1>
        <p className="feedback-description">
          We cherish each customer message as a heartfelt vote of confidence. Your trust inspires our unwavering commitment to excellence and fuels our passion to exceed expectations.
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="feedback-marquee-container">
        <div
          className="feedback-track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
        >
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="card-container"
              style={{ '--animation-delay': `${i * 0.05}s` }}
            >
              <div
                className={`testimonial-card card-color-${(i % 4) + 1}`}
              >
                <div className="testimonial-quote">"{t.quote}"</div>
                <div className="testimonial-meta">
                  <img className="testimonial-avatar" src={t.avatar} alt={t.name} />
                  <div className="testimonial-info">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* --- General Setup and Spacing (Increased Gap) --- */
        .feedback-section {
          min-height: 80vh;
          background-color: #FFF9EA;
          color: #222;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden; 
          padding-top: 180px; /* Increased gap */
          padding-bottom: 120px;
          transition: background-color 0.4s, color 0.4s;
        }

        .feedback-section.dark-theme {
            background-color: #111111;
            color: #FFF9EA;
        }

        /* --- Header Styles --- */
        .feedback-header-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px 80px;
          text-align: center; 
        }
        .feedback-title { 
            font-size: 72px; 
            font-weight: 700; 
            margin-bottom: 30px; 
            color: #222; 
            letter-spacing: -1.5px;
            text-shadow: 0 3px 2px rgba(0,0,0,0.1);
            transition: color 0.4s;
        }

        .dark-theme .feedback-title {
            color: #FFF9EA;
        }
        .feedback-description { 
            font-size: 18px; 
            max-width: 750px; 
            margin: 0 auto; 
            line-height: 1.7; 
            color: #444; 
            font-weight: 400; 
            transition: color 0.4s;
        }

        .dark-theme .feedback-description {
            color: #9CA3AF;
        }

        /* --- Marquee/Scroll Container --- */
        .feedback-marquee-container {
            width: 100vw; 
            margin-left: calc(50% - 50vw); 
        }

        /* --- Scrollable Track with Fixed Rotation --- */
        .feedback-track { 
            display: flex; 
            overflow-x: scroll; 
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch; 
            cursor: grab; 
            padding: 50px 0;
            
            /* Hide scrollbar */
            scrollbar-width: none;
        }
        .feedback-track::-webkit-scrollbar { display: none; }
        
        /* --- Card Wrapper and Entrance Animation --- */
        .card-container {
            position: relative;
            flex-shrink: 0;
            
            /* Entrance animation state */
            opacity: 0;
            transform: scale(0.95) translateY(50px);
            transition: opacity 1000ms ease-out, transform 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.27);
            transition-delay: var(--animation-delay);
            
            margin-right: -40px; /* Overlap cards */
        }
        
        .card-container:first-child {
            margin-left: 32px; 
        }
        .card-container:last-child {
            margin-right: 64px; 
        }

        .card-container.is-visible {
            opacity: 1;
            transform: scale(1) translateY(0);
        }

        /* --- Individual Card Styles (Organic Shape, Hover, and Dynamic Rotation setup) --- */
        .testimonial-card {
          width: 360px; 
          height: 360px; 
          padding: 40px 32px; 
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          cursor: pointer;
          display: flex; 
          flex-direction: column;
          justify-content: space-between;
          
          /* Only transition on properties NOT controlled by scroll (box-shadow, hover transform) */
          transition: box-shadow 0.3s ease, transform 0.3s ease; 
          
          border-top-left-radius: 40px 60px;
          border-top-right-radius: 50px 30px;
          border-bottom-right-radius: 60px 40px;
          border-bottom-left-radius: 30px 50px;
          
          will-change: transform; /* Performance optimization for rotation */
          
          /* Initial rotation is set inline, dynamic rotation added via JS scroll handler */
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.4s;
        }

        .dark-theme .testimonial-card {
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        
        /* Color themes - Slightly muted for dark mode */
        .card-color-1 { background: #E9DFFB; } 
        .card-color-2 { background: #FFDDE2; } 
        .card-color-3 { background: #D6F6D9; } 
        .card-color-4 { background: #E5F6FF; } 

        .dark-theme .card-color-1 { background: #2D243D; }
        .dark-theme .card-color-2 { background: #3D2428; }
        .dark-theme .card-color-3 { background: #1B311D; }
        .dark-theme .card-color-4 { background: #1A2B3D; }        
        /* Hover and Active State: Scale up slightly */
        .testimonial-card:hover,
        .card-container.is-visible .testimonial-card { 
            transform: scale(1.05);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            z-index: 100; 
        }

        .testimonial-card:hover {
            transform: scale(1.08) translateY(-10px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
        
        /* --- Inner Card Content --- */
        .testimonial-quote { 
            font-size: 22px; 
            line-height: 1.4; 
            color: #111; 
            letter-spacing: -0.2px; 
            margin-bottom: 20px; 
            transition: color 0.4s;
        }

        .dark-theme .testimonial-quote {
            color: #FFF9EA;
        }
        .testimonial-meta { display: flex; align-items: center; gap: 14px; margin-top: auto; }
        .testimonial-avatar { 
            width: 48px; 
            height: 48px; 
            border-radius: 9999px; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
            object-fit: cover; 
        }
        .testimonial-name { font-weight: 700; color: #111; transition: color 0.4s; }
        .testimonial-role { color: #333; opacity: .8; font-weight: 500; font-size: 14px; transition: color 0.4s; }

        .dark-theme .testimonial-name { color: #FFF9EA; }
        .dark-theme .testimonial-role { color: #9CA3AF; }

        /* --- Responsive Adjustments --- */
        @media (max-width: 992px) {
          .feedback-title { font-size: 56px; }
          .card-container { margin-right: -30px; }
          .card-container:first-child { margin-left: 20px; }
          .card-container:last-child { margin-right: 40px; }
          .testimonial-card { width: 320px; height: 320px; padding: 30px 25px; }
          .testimonial-quote { font-size: 20px; line-height: 1.35; }
        }

        @media (max-width: 768px) {
          .feedback-title { font-size: 40px; }
          .feedback-header-content { padding-bottom: 50px; }
          .feedback-section { padding-top: 100px; padding-bottom: 80px; }
          .card-container { margin-right: -20px; }
          .card-container:first-child { margin-left: 10px; }
          .card-container:last-child { margin-right: 30px; }
          .testimonial-card { width: 260px; height: 260px; padding: 24px 18px; }
          .testimonial-quote { font-size: 16px; line-height: 1.4; }
          .testimonial-avatar { width: 40px; height: 40px; }
          .testimonial-name { font-size: 14px; }
          .testimonial-role { font-size: 12px; }
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;