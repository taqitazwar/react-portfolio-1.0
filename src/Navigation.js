import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'aboutme', label: 'About Me', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'minigames', label: 'Mini Games', icon: '🎮' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    
    // Scroll to top with multiple fallbacks for mobile browsers
    const scrollToTop = () => {
      // Method 1: Try smooth scroll
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Method 2: Force instant scroll
        window.scrollTo(0, 0);
      }
      
      // Method 3: Additional fallback for stubborn mobile browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Execute immediately and also with a small delay
    scrollToTop();
    setTimeout(scrollToTop, 100);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Desktop Menu */}
        <div className="nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handlePageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => handlePageChange(item.id)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 