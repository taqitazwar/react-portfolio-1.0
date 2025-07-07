import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Projects from './Projects';
import Contact from './Contact';
import MiniGames from './MiniGames';
import AboutMe from './AboutMe';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollDirection, setScrollDirection] = useState('down');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorDirection, setCursorDirection] = useState({ angle: 0, velocity: 0 });
  const [isInsideTrail, setIsInsideTrail] = useState(true);
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const previousPosition = useRef({ x: 0, y: 0 });
  const velocityHistory = useRef([]);

  // Scroll direction tracking for animations
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update cursor color based on position relative to trail
  useEffect(() => {
    const cursorColor = isInsideTrail ? '#000000' : '#ffffff';
    const strokeColor = isInsideTrail ? '#ffffff' : '#000000';
    const cursorSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="${cursorColor}" stroke="${strokeColor}" stroke-width="2"/></svg>`;
    const interactiveCursorSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="${cursorColor}" stroke="${strokeColor}" stroke-width="2"/></svg>`;
    
    document.body.style.cursor = `url('${cursorSvg}') 8 8, auto`;
    
    // Update interactive elements cursor
    const existingStyle = document.getElementById('custom-cursor-style');
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      button, a, .interactive, .clickable {
        cursor: url('${interactiveCursorSvg}') 10 10, pointer !important;
      }
    `;
    document.head.appendChild(style);
  }, [isInsideTrail]);

  // Smooth cursor chasing effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      if (e.target && (
          e.target.tagName === 'BUTTON' || 
          e.target.tagName === 'A' || 
          (e.target.classList && e.target.classList.contains('interactive')) || 
          (e.target.classList && e.target.classList.contains('clickable')) ||
          e.target.closest('button') ||
          e.target.closest('a')
      )) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && (
          e.target.tagName === 'BUTTON' || 
          e.target.tagName === 'A' || 
          (e.target.classList && e.target.classList.contains('interactive')) || 
          (e.target.classList && e.target.classList.contains('clickable')) ||
          e.target.closest('button') ||
          e.target.closest('a')
      )) {
        setIsHovering(false);
      }
    };

    // Smooth cursor animation with directional morphing
    const animateCursor = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;
      
      // Store previous position for velocity calculation
      previousPosition.current = { ...currentPosition.current };
      
      // Smooth cursor movement with slow following
      currentPosition.current.x = lerp(
        currentPosition.current.x,
        mousePosition.current.x,
        0.02
      );
      
      currentPosition.current.y = lerp(
        currentPosition.current.y,
        mousePosition.current.y,
        0.02
      );

      // Calculate velocity and direction for morphing
      const velX = currentPosition.current.x - previousPosition.current.x;
      const velY = currentPosition.current.y - previousPosition.current.y;
      const velocity = Math.sqrt(velX * velX + velY * velY);
      
      // Add to velocity history for smoothing
      velocityHistory.current.push(velocity);
      if (velocityHistory.current.length > 5) {
        velocityHistory.current.shift();
      }
      
      // Calculate average velocity for smooth transitions
      const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
      
      // Calculate angle (direction of movement)
      let angle = Math.atan2(velY, velX) * (180 / Math.PI);
      
      // Only update angle if there's significant movement
      if (avgVelocity > 0.5) {
        setCursorDirection({
          angle: angle,
          velocity: Math.min(avgVelocity * 2, 10)
        });
      } else {
        setCursorDirection(prev => ({
          ...prev,
          velocity: prev.velocity * 0.9
        }));
      }

      // Check if cursor is inside or outside the elliptical trail
      const distanceX = mousePosition.current.x - currentPosition.current.x;
      const distanceY = mousePosition.current.y - currentPosition.current.y;
      
      // Elliptical trail dimensions: 45px wide, 60px tall
      const radiusX = 22.5;
      const radiusY = 30;
      
      // Check if point is inside ellipse
      const isInside = (distanceX * distanceX) / (radiusX * radiusX) + 
                       (distanceY * distanceY) / (radiusY * radiusY) <= 1;
      
      setIsInsideTrail(isInside);

      setCursorPosition({
        x: currentPosition.current.x,
        y: currentPosition.current.y
      });

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    // Start the animation loop
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'projects':
        return <Projects setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      case 'minigames':
        return <MiniGames setCurrentPage={setCurrentPage} />;
      case 'aboutme':
        return <AboutMe setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`App scroll-${scrollDirection}`}>
      {/* Custom Fluid Cursor Trail */}
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          transform: `translate(${cursorPosition.x - 22.5}px, ${cursorPosition.y - 30}px) rotate(${cursorDirection.angle}deg) scaleX(${1 + cursorDirection.velocity * 0.2}) scaleY(${Math.max(0.4, 1 - cursorDirection.velocity * 0.1)})`,
          transformOrigin: 'center',
        }}
      />
      
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App; 