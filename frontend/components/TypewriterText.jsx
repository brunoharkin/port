import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, speed = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`gradient-headline ${className}`}>
      {displayText}
      <span className="typewriter-cursor-blink" style={{ color: '#fff', textShadow: '0 0 8px #000' }}>|</span>
    </span>
  );
};

export default TypewriterText; 