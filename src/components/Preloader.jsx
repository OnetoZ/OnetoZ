import React, { useEffect, useState } from 'react';
import './Preloader.css';
import ozLogo from '../pages/image/OnetoZ_logo.png';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Cinematic timing:
    // Logo drag in: ~1s
    // Tagline: ~0.5s delay
    // "Fox go inside" (Zoom In/Out): ~1s
    // Total hold: ~3s before exit

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-container ${!isVisible ? 'preloader-hidden' : ''}`}>
      <div className="preloader-content">
        <div className="logo-wrapper">
          <img src={ozLogo} alt="OnetoZ" className="preloader-logo" />
        </div>
        <p className="preloader-tagline">Redefining Digital Excellence</p>
      </div>
    </div>
  );
}
