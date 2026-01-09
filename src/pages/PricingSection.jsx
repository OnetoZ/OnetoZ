import React, { useRef, useState, useEffect } from 'react';
import { Check, Smartphone, Globe, Layers, ArrowRight } from 'lucide-react';

const PricingCard = ({
  title,
  subtitle,
  price,
  features,
  ctaText,
  isHighlighted,
  badge,
  icon,
  index
}) => {
  return (
    <div className={`pricing-card ${isHighlighted ? 'highlight-card' : ''}`} style={{ '--item-index': index }}>
      {badge && (
        <span className="card-badge">
          {badge}
        </span>
      )}

      <div className="card-header-pricing">
        <div className={`icon-container ${isHighlighted ? 'icon-highlighted' : ''}`}>
          {icon}
        </div>
        <h3 className="card-title-pricing">{title}</h3>
        <p className="card-subtitle-pricing">{subtitle}</p>
      </div>

      <div className="price-container">
        <div className="price-row">
          <span className="price-amount">{price}</span>
        </div>
        <p className="price-disclaimer">*Starting price, varies by features</p>
      </div>

      <ul className="features-list">
        {features.map((feature, idx) => (
          <li key={idx} className="feature-item">
            <Check size={18} className="check-icon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`cta-button-pricing ${isHighlighted ? 'cta-highlighted' : ''}`}>
        {ctaText}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const PricingSection = ({ isDarkMode }) => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const pricingData = [
    {
      title: "Static Website",
      subtitle: "Perfect for small shops & local businesses",
      price: "₹3,000",
      features: ["Clean & fast website", "Mobile-friendly design", "Business info & contact page"],
      ctaText: "Get a Simple Website",
      icon: <Globe size={24} />
    },
    {
      title: "Fullstack Website",
      subtitle: "For growing businesses that need more",
      price: "₹19,000",
      features: ["Admin panel & login", "Dynamic content", "Scalable for future growth"],
      ctaText: "Build My Website",
      isHighlighted: true,
      badge: "Most Chosen",
      icon: <Layers size={24} />
    },
    {
      title: "Mobile App",
      subtitle: "For brands ready to go mobile-first",
      price: "₹25,000",
      features: ["Android app", "Modern UI", "Business-ready features"],
      ctaText: "Discuss My App Idea",
      icon: <Smartphone size={24} />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 768) {
      const container = scrollRef.current;
      const middleCard = container.children[1];
      if (middleCard) {
        const scrollPos = middleCard.offsetLeft - (container.offsetWidth / 2) + (middleCard.offsetWidth / 2);
        container.scrollLeft = scrollPos;
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className={`pricing-section-wrapper ${isVisible ? 'is-visible' : ''} ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="pricing-container-main">
        <div className="pricing-header">
          <h2 className="pricing-main-title">
            Simple Pricing. Real Results.
          </h2>
          <p className="pricing-main-subtitle">
            Built for small businesses stepping into tech.
          </p>
        </div>

        <div className="cards-wrapper">
          <div
            ref={scrollRef}
            className="pricing-cards-scroll"
          >
            {pricingData.map((data, index) => (
              <PricingCard key={index} {...data} index={index} />
            ))}
          </div>
        </div>

        <div className="trust-line">
          <p>
            Final pricing depends on features. We always suggest what’s best for your business — not what’s expensive.
          </p>
        </div>

        <div className="mobile-indicator">
          {pricingData.map((_, i) => (
            <div
              key={i}
              className={`indicator-dot ${activeIndex === i ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .pricing-section-wrapper {
          padding: 100px 32px;
          background-color: #FFF9EA;
          transition: background-color 0.4s;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .pricing-section-wrapper.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pricing-section-wrapper.dark-theme {
          background-color: #111111;
        }

        .pricing-container-main {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .pricing-main-title {
          font-size: 48px;
          font-weight: 800;
          color: #222;
          margin-bottom: 16px;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }

        .dark-theme .pricing-main-title {
          color: #FFF9EA;
        }

        .pricing-main-subtitle {
          font-size: 20px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .dark-theme .pricing-main-subtitle {
          color: #9CA3AF;
        }

        .cards-wrapper {
          position: relative;
          margin-bottom: 40px;
        }

        .pricing-cards-scroll {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          padding: 32px 10px;
          scrollbar-width: none; /* Firefox */
          justify-content: center;
        }

        .pricing-cards-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        /* Pricing Card */
        .pricing-card {
          flex: 0 0 320px;
          background-color: #ffffff;
          border-radius: 32px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          transform: translateY(30px);
        }

        .is-visible .pricing-card {
          animation: cardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--item-index) * 0.1s + 0.3s);
        }

        @keyframes cardReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .dark-theme .pricing-card {
          background-color: #1A1A1A;
          border-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .pricing-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #A38B57;
        }

        .dark-theme .pricing-card:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }

        .highlight-card {
          border: 1px solid #A38B57;
          background-color: #ffffff;
        }

        .card-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #A38B57;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px rgba(163, 139, 87, 0.3);
        }

        .card-header-pricing {
          margin-bottom: 24px;
        }

        .icon-container {
          width: 56px;
          height: 56px;
          background-color: #f3f4f6;
          color: #4b5563;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .dark-theme .icon-container {
          background-color: #2a2a2a;
          color: #9ca3af;
        }

        .icon-highlighted {
          background-color: #FFF9EA;
          color: #A38B57;
        }

        .dark-theme .icon-highlighted {
          background-color: rgba(163, 139, 87, 0.2);
        }

        .card-title-pricing {
          font-size: 24px;
          font-weight: 800;
          color: #222;
          margin-bottom: 4px;
        }

        .dark-theme .card-title-pricing {
          color: #FFF9EA;
        }

        .card-subtitle-pricing {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }

        .dark-theme .card-subtitle-pricing {
          color: #9ca3af;
        }

        .price-container {
          margin-bottom: 32px;
        }

        .price-amount {
          font-size: 36px;
          font-weight: 800;
          color: #222;
          letter-spacing: -1px;
        }

        .dark-theme .price-amount {
          color: #FFF9EA;
        }

        .price-disclaimer {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 16px;
        }

        .dark-theme .feature-item {
          color: #9ca3af;
        }

        .check-icon {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cta-button-pricing {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #222;
          color: #ffffff;
        }

        .dark-theme .cta-button-pricing {
          background-color: #FFF9EA;
          color: #111;
        }

        .cta-highlighted {
          background-color: #A38B57;
          color: #ffffff;
        }

        .cta-button-pricing:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }

        .cta-button-pricing:active {
          transform: scale(0.98);
        }

        .trust-line {
          text-align: center;
          margin-top: 16px;
        }

        .trust-line p {
          font-size: 14px;
          color: #9ca3af;
          font-style: italic;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .mobile-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }

        @media (min-width: 768px) {
          .mobile-indicator {
            display: none;
          }
        }

        .indicator-dot {
          height: 6px;
          width: 6px;
          border-radius: 99px;
          background-color: #e5e7eb;
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          width: 32px;
          background-color: #A38B57;
        }

        @media (max-width: 767px) {
          .pricing-section-wrapper {
            padding: 80px 16px;
          }
          .pricing-card {
            flex: 0 0 calc(100vw - 32px);
            min-width: 280px;
            padding: 30px 20px;
          }
          .pricing-cards-scroll {
            justify-content: flex-start;
            gap: 16px;
            padding: 20px 0;
          }
          .pricing-main-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
