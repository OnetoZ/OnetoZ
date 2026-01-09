import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';

const INTRO_LINES = [
    "Hey… welcome.",
    "I’m the guide behind OnetoZ.",
    "If you’re here, you’re not just looking for a website.",
    "You’re looking for growth.",
    "Do you want more than just a website?"
];

const FoxDialogue = ({ position, onHoverStart, onHoverEnd, onComplete }) => {
    const [lineIndex, setLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [finalResponse, setFinalResponse] = useState(null);

    // Current script source
    const currentSource = finalResponse ? [finalResponse] : INTRO_LINES;
    const currentLine = currentSource[finalResponse ? 0 : lineIndex];

    useEffect(() => {
        // If we have finished the intro lines and haven't chosen a response, show options
        if (!finalResponse && lineIndex === INTRO_LINES.length - 1 && !isTyping && displayedText === currentLine) {
            setShowOptions(true);
            return;
        }

        if (finalResponse && !isTyping && displayedText === currentLine) {
            // Finished showing final response. Wait a bit, then close.
            const timeout = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1000); // 1-second reading time (Quick exit)
            return () => clearTimeout(timeout);
        }

        if (lineIndex >= INTRO_LINES.length && !finalResponse) {
            return;
        }

        if (isTyping) {
            if (displayedText.length < currentLine.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(currentLine.slice(0, displayedText.length + 1));
                }, 40);
                return () => clearTimeout(timeout);
            } else {
                // Line finished typing
                if (showOptions && !finalResponse) {
                    // Stay waiting for option
                    return;
                }

                // Wait reading time then advance
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            // Advance to next line (if not at options)
            if (!showOptions && !finalResponse && lineIndex < INTRO_LINES.length - 1) {
                setDisplayedText("");
                setLineIndex(prev => prev + 1);
                setIsTyping(true);
            }
        }
    }, [lineIndex, displayedText, isTyping, showOptions, finalResponse, onComplete, currentLine]);

    const handleOption = (choice) => {
        setIsTyping(true);
        setDisplayedText("");
        setShowOptions(false);
        // Stop reacting when clicked
        if (onHoverEnd) onHoverEnd();

        if (choice === 'YES') {
            setFinalResponse("Good. You’re thinking ahead.");
        } else {
            setFinalResponse("Then you might be settling for less.");
        }
    };

    if (!displayedText) return null;
    const isMobile = window.innerWidth < 768;

    return (
        <>
            {/* SPEECH BUBBLE (Head) */}
            <Html position={position} center className="fox-dialogue-bubble">
                <div style={{
                    position: 'relative',
                    background: 'white',
                    padding: isMobile ? '12px 20px' : '15px 25px',
                    borderRadius: '30px',
                    borderBottomLeftRadius: isMobile ? '30px' : '0px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    minWidth: isMobile ? '260px' : '300px',
                    maxWidth: isMobile ? '280px' : '450px',
                    marginBottom: '40px',
                    marginLeft: isMobile ? '0' : '40px',
                    border: '2px solid #000',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <style>{`
                        .blinking-cursor { animation: blink 1s step-end infinite; color: #000; }
                        @keyframes blink { 50% { opacity: 0; } }
                    `}</style>

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onComplete}
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: '#333',
                            lineHeight: '1',
                            padding: '0',
                            zIndex: 10
                        }}
                    >
                        ✕
                    </button>

                    {displayedText}
                    <span className="blinking-cursor">|</span>

                    {/* SKIP BUTTON */}
                    {!showOptions && !finalResponse && (
                        <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', marginTop: '10px' }}>
                            <button
                                onClick={() => {
                                    setLineIndex(INTRO_LINES.length - 1);
                                    setDisplayedText(INTRO_LINES[INTRO_LINES.length - 1]);
                                    setIsTyping(false);
                                    setShowOptions(true);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '1px solid #999',
                                    color: '#666',
                                    fontSize: '11px',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    padding: '0 2px',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                SKIP &raquo;
                            </button>
                        </div>
                    )}

                    <svg viewBox="0 0 20 20" style={{
                        position: 'absolute', bottom: '-19px',
                        left: isMobile ? '50%' : '-1px',
                        transform: isMobile ? 'translateX(-50%)' : 'scaleX(-1)',
                        width: '20px', height: '20px'
                    }}>
                        <path d="M20 0 L0 0 L10 15 Z" fill="white" stroke="#000" strokeWidth="2" />
                        <path d="M18 0 L2 0 L10 12 Z" fill="white" />
                    </svg>
                </div>
            </Html>

            {/* OPTIONS (Legs/Feet) */}
            {showOptions && (
                <Html position={isMobile ? [0, 1.5, 0] : [0.5, 0.5, 2]} center>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        <button
                            style={buttonStyle}
                            onMouseEnter={() => onHoverStart && onHoverStart('Fox_Sit_Yes')}
                            onMouseLeave={() => onHoverEnd && onHoverEnd()}
                            onClick={() => handleOption('YES')}
                        >
                            YES
                        </button>
                        <button
                            style={buttonStyle}
                            onMouseEnter={() => onHoverStart && onHoverStart('Fox_Sit_NO')}
                            onMouseLeave={() => onHoverEnd && onHoverEnd()}
                            onClick={() => handleOption('NO')}
                        >
                            NO
                        </button>
                    </div>
                </Html>
            )}

        </>
    );
};

const buttonStyle = {
    background: '#000',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '8px',
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    pointerEvents: 'auto'
};

export default FoxDialogue;
