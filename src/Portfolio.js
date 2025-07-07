import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

// Enhanced 3D Background for Portfolio
const PortfolioBackground = () => {
  const meshRef = useRef();
  const mesh2Ref = useRef();
  
  return (
    <group>
      <mesh ref={meshRef} position={[2, 0, -3]}>
        <octahedronGeometry args={[1]} />
        <meshPhongMaterial color="#6366f1" opacity={0.2} transparent />
      </mesh>
      
      <mesh ref={mesh2Ref} position={[-2, 1, -4]}>
        <dodecahedronGeometry args={[0.8]} />
        <meshPhongMaterial color="#06b6d4" opacity={0.3} transparent />
      </mesh>
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
};

const Portfolio = ({ setCurrentPage }) => {
  const portfolioRef = useRef();

  useEffect(() => {
    // Portfolio page animations
    gsap.fromTo('.portfolio-header',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Portfolio cards - Right to Left animation
    gsap.fromTo('.portfolio-card',
      { x: 150, opacity: 0, scale: 0.9, rotateY: 10 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Back button - Left to Right animation
    gsap.fromTo('.back-btn',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );

    // Project tech tags - Right to Left animation
    gsap.fromTo('.tech-tag-large',
      { x: 80, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.project-tech-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  const projects = [
    {
      title: 'Hiking Adventure App',
      description: 'A comprehensive Flutter application designed for hiking enthusiasts. Features include GPS tracking, offline maps, weather integration, and social sharing capabilities. Users can plan routes, track their progress, and share adventures with the community.',
      fullDescription: 'Built with Flutter for cross-platform compatibility, this app integrates with Firebase for real-time data sync and Google Maps API for advanced mapping features. The offline functionality ensures hikers can access maps even without internet connectivity.',
      icon: '🏔️',
      tech: ['Flutter', 'Firebase', 'Google Maps API', 'GPS Tracking', 'SQLite'],
      github: 'https://github.com/yourusername/hiking-app',
      category: 'Mobile App',
      year: '2024'
    },
    {
      title: 'Dear Diary - Secure Journal',
      description: 'A privacy-focused digital diary application with end-to-end encryption. Features mood tracking, photo attachments, and cloud synchronization. The app ensures complete privacy with local encryption and secure cloud backup.',
      fullDescription: 'Developed using Flutter with SQLite for local storage and AES encryption for data security. The app includes mood analytics, search functionality, and customizable themes. Cloud sync is implemented with Firebase with client-side encryption.',
      icon: '📖',
      tech: ['Flutter', 'SQLite', 'AES Encryption', 'Firebase', 'Cloud Sync'],
      github: 'https://github.com/yourusername/dear-diary',
      category: 'Mobile App',
      year: '2024'
    },
    {
      title: 'Hanoi Explorer',
      description: 'A smart city guide app for exploring Hanoi, Vietnam. Features AR navigation, local recommendations, cultural insights, and real-time translation. Helps tourists and locals discover hidden gems and navigate the city efficiently.',
      fullDescription: 'Built with Flutter and integrated with multiple APIs including Google Places, Translation services, and AR Core. The app uses machine learning for personalized recommendations and includes offline capabilities for maps and basic information.',
      icon: '🏛️',
      tech: ['Flutter', 'AR Core', 'Google Places API', 'ML Kit', 'Translation API'],
      github: 'https://github.com/yourusername/hanoi-explorer',
      category: 'Mobile App',
      year: '2024'
    },
    {
      title: 'Kivi Board Game',
      description: 'A strategic board game implementation with intelligent AI opponents. Features multiple difficulty levels, multiplayer support, and sophisticated game logic. The AI uses minimax algorithm with alpha-beta pruning for optimal gameplay.',
      fullDescription: 'Developed in Java using Swing for the GUI. The game engine implements advanced AI strategies and supports both human vs AI and AI vs AI gameplay. Features include game state saving, replay functionality, and statistics tracking.',
      icon: '🎮',
      tech: ['Java', 'Swing', 'AI/Minimax', 'Game Engine', 'Multithreading'],
      github: 'https://github.com/yourusername/kivi-board-game',
      category: 'Desktop Game',
      year: '2023'
    },
    {
      title: 'Movie Search Web App',
      description: 'A responsive web application for discovering movies and TV shows. Features advanced search, personalized recommendations, watchlist management, and detailed movie information with ratings and reviews.',
      fullDescription: 'Built with vanilla HTML5, CSS3, and JavaScript. Integrates with The Movie Database (TMDb) API for comprehensive movie data. Features include infinite scrolling, local storage for favorites, and responsive design for all devices.',
      icon: '🎬',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'TMDb API', 'Local Storage'],
      github: 'https://github.com/yourusername/movie-search',
      category: 'Web App',
      year: '2023'
    },
    {
      title: 'Stock Data Analysis Tool',
      description: 'A comprehensive Python tool for stock market analysis and prediction. Features data visualization, technical indicators, portfolio tracking, and machine learning models for price prediction.',
      fullDescription: 'Developed using Python with pandas for data manipulation, matplotlib for visualization, and scikit-learn for machine learning. The tool can analyze historical data, identify trends, and make predictions using various ML algorithms.',
      icon: '📊',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn', 'NumPy'],
      github: 'https://github.com/yourusername/stock-analysis',
      category: 'Data Analysis',
      year: '2023'
    }
  ];

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Mobile App': return '📱';
      case 'Web App': return '🌐';
      case 'Desktop Game': return '🎮';
      case 'Data Analysis': return '📊';
      default: return '💻';
    }
  };

  return (
    <div className="portfolio" ref={portfolioRef}>
      <div className="scroll-progress"></div>
      
      {/* Portfolio Background */}
      <div className="portfolio-background">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <PortfolioBackground />
        </Canvas>
      </div>

      <div className="portfolio-container">
        <button 
          className="back-btn"
          onClick={() => setCurrentPage('home')}
        >
          ← Back to Home
        </button>

        <div className="portfolio-header">
          <h1 className="portfolio-title">My Projects</h1>
          <p className="portfolio-subtitle">
            A collection of my work showcasing skills in mobile development, web technologies, and data analysis
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="card-header">
                <div className="project-icon-large">
                  {project.icon}
                </div>
                <div className="project-meta">
                  <div className="category-badge">
                    <span className="category-icon">{getCategoryIcon(project.category)}</span>
                    <span>{project.category}</span>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
              </div>

              <div className="card-content">
                <h3 className="project-title-large">{project.title}</h3>
                <p className="project-description-short">{project.description}</p>
                <p className="project-description-full">{project.fullDescription}</p>
                
                <div className="project-tech-grid">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag-large">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <a 
                  href={project.github} 
                  className="project-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View on GitHub</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-footer">
          <div className="footer-content">
            <h3>Let's Build Something Amazing Together</h3>
            <p>I'm always open to discussing new opportunities and interesting projects.</p>
            <div className="contact-links">
              <a href="mailto:ttazwar@mun.ca" className="contact-btn">
                Get In Touch
              </a>
              <a href="https://github.com/taqitazwar" className="contact-btn secondary" target="_blank" rel="noopener noreferrer">
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 