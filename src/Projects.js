import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ setCurrentPage }) => {
  const projectsRef = useRef();
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const [fallingDucks, setFallingDucks] = React.useState([]);

  useEffect(() => {
    // Animate page header on load
    gsap.fromTo('.page-header', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Project cards - Right to Left animation
    gsap.fromTo('.project-card', 
      { x: 150, opacity: 0, scale: 0.9, rotateY: 15 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.projects-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Featured projects - Right to Left animation
    gsap.fromTo('.featured-project', 
      { x: 200, opacity: 0, scale: 0.95 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.featured-projects',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Project filters - Right to Left animation
    gsap.fromTo('.filter-button', 
      { x: 50, opacity: 0 }, 
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.project-filters',
          start: "top 90%",
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
      id: 1,
      title: 'This Website',
      description: 'A modern, interactive personal portfolio website built with React. Features immersive 3D backgrounds, smooth animations, interactive mini-games, and responsive design. Showcases advanced web development skills with modern JavaScript frameworks and libraries.',
      icon: '🌐',
      category: 'Web',
      tech: ['React', 'JavaScript', 'Three.js', 'GSAP', 'Framer Motion', 'CSS3', 'HTML5'],
      github: 'https://github.com/taqitazwar/react-portfolio-1.0',
      featured: true,
      features: [
        'Interactive 3D Three.js backgrounds',
        'Smooth GSAP animations and transitions',
        'Responsive design for all devices',
        'Modern component-based architecture',
        'Dynamic navigation and routing',
      ],
      isPortfolio: true
    },
    {
      id: 2,
      title: 'ZeroWaste Intersession Project',
      description: 'A collaborative Flutter project focused on sustainability and waste reduction. Developed during intersession with team collaboration and modern mobile development practices. Have a look at our app running live!',
      icon: '♻️',
      category: 'Mobile',
      tech: ['Flutter', 'Dart', 'Team Collaboration', 'Sustainability'],
      github: 'https://github.com/taqitazwar/gr06-zerowaste-25-intersession',
      youtube: 'https://www.youtube.com/watch?v=a64HDa_a4Wc',
      featured: true,
      features: [
        'Sustainability focus',
        'Team collaboration',
        'Flutter mobile development',
        'Waste reduction features',
        'Modern development practices'
      ]
    },
    {
      id: 3,
      title: 'Wordnet Server',
      description: 'A Java socket-based word guessing game server implementing client-server architecture. Features multi-client support, real-time communication, and game state management.',
      icon: '🎯',
      category: 'Desktop',
      tech: ['Java', 'Socket Programming', 'Networking', 'Multi-threading'],
      github: 'https://github.com/taqitazwar/Wordnet-Server',
      youtube: 'https://youtu.be/-PH0_Q-QiKM',
      featured: true,
      features: [
        'Socket-based communication',
        'Multi-client support',
        'Real-time game logic',
        'Server-client architecture',
        'Thread management'
      ]
    },
    {
      id: 4,
      title: 'Hiking Adventure App',
      description: 'A comprehensive Flutter mobile application designed for outdoor enthusiasts. Features real-time GPS tracking, offline maps, trail recommendations, and Firebase integration for data management.',
      icon: '🏔️',
      category: 'Mobile',
      tech: ['Flutter', 'Dart', 'Firebase', 'GPS', 'Mobile Development'],
      github: 'https://github.com/taqitazwar/a4-discover-and-log-nl-hikes-taqitazwar',
      youtube: 'https://youtu.be/gmUKBqCLwPQ',
      featured: true,
      features: [
        'Real-time GPS tracking',
        'Firebase integration',
        'Trail recommendations',
        'Offline functionality',
        'User authentication'
      ]
    },
    {
      id: 5,
      title: '2D Rubik\'s Cube Solver',
      description: 'An intelligent 2D Rubik\'s cube solver implemented in Java. Features algorithm optimization, visual representation, and step-by-step solution generation with efficient solving techniques.',
      icon: '🧩',
      category: 'Desktop',
      tech: ['Java', 'Algorithms', 'Problem Solving', 'GUI'],
      github: 'https://github.com/taqitazwar/2D-Rubiks-Cube-Solver',
      youtube: 'https://youtu.be/ydkVJTvn0zc',
      featured: true,
      features: [
        'Algorithm optimization',
        'Visual cube representation',
        'Step-by-step solutions',
        'Efficient solving techniques',
        'Interactive GUI'
      ]
    },
    {
      id: 6,
      title: 'Dear Diary App',
      description: 'A privacy-focused personal diary application built with Flutter. Features secure local storage, mood tracking, and intuitive user interface for daily journaling and reflection.',
      icon: '📖',
      category: 'Mobile',
      tech: ['Flutter', 'Dart', 'SQLite', 'Mobile UI/UX'],
      github: 'https://github.com/taqitazwar/dear_diary_app',
      youtube: 'https://youtu.be/ip_eivE_AZY',
      featured: true,
      features: [
        'Secure local storage',
        'Mood tracking',
        'Daily journaling',
        'Intuitive UI design',
        'Privacy-focused architecture'
      ]
    },
    {
      id: 7,
      title: 'Expense Tracker',
      description: 'A personal finance management application for tracking daily expenses and budget management. Features intuitive interface and comprehensive expense categorization.',
      icon: '💰',
      category: 'Mobile',
      tech: ['Flutter', 'Dart', 'Local Storage', 'UI/UX'],
      github: 'https://github.com/taqitazwar/expense_tracker',
      youtube: 'https://youtu.be/c9j_gt3IjJI',
      featured: true,
      features: [
        'Personal finance tracking',
        'Expense categorization',
        'Budget management',
        'Intuitive user interface',
        'Local data storage'
      ]
    },
    {
      id: 8,
      title: 'Chicago School Data Explorer',
      description: 'Built a data analysis tool using SQL and Python to explore public school performance metrics in Chicago. Extracted insights through complex SQL queries and visualized results in Jupyter Notebooks. (April 2024)',
      icon: '🏫',
      category: 'Data Science',
      tech: ['Python', 'SQL', 'SQLite', 'pandas', 'Jupyter Notebook'],
      github: 'https://github.com/taqitazwar/Chicago-SQL-Project',
      featured: true,
      features: [
        'Complex SQL queries for data analysis',
        'Python-based data processing',
        'Jupyter Notebook visualizations',
        'School performance metrics analysis',
        'Interactive data exploration'
      ]
    },
    {
      id: 9,
      title: 'Hanoi Explorer App',
      description: 'An Android city explorer application for discovering Hanoi. Built with Flutter featuring local recommendations, cultural insights, and interactive city navigation for tourists and locals.',
      icon: '🏛️',
      category: 'Mobile',
      tech: ['Flutter', 'Dart', 'Android', 'Location Services'],
      github: 'https://github.com/taqitazwar/hanoi_explorer_app',
      youtube: 'https://youtube.com/shorts/cRWeD5Eg4M8',
      featured: false,
      features: [
        'Local recommendations',
        'Cultural insights',
        'Interactive navigation',
        'Tourist-friendly design',
        'Location-based services'
      ]
    },
    {
      id: 10,
      title: 'Stock Data Analysis',
      description: 'Built a multi-notebook data pipeline to extract and visualize stock market data using Python APIs and web scraping. Analyzed trends with real-time financial data and created visual plots for insights. (July 2024)',
      icon: '📈',
      category: 'Data Science',
      tech: ['Python', 'yfinance', 'BeautifulSoup', 'pandas', 'matplotlib'],
      github: 'https://github.com/taqitazwar/Stock-Data-Analysis',
      featured: false,
      features: [
        'Real-time stock market data extraction',
        'Web scraping for financial data',
        'Data visualization with matplotlib',
        'Trend analysis and insights',
        'Multi-notebook pipeline architecture'
      ]
    },
    {
      id: 11,
      title: 'Movie Search Web App',
      description: 'A responsive front-end web application that fetches and displays real-time movie data using the TMDb API. Integrated dynamic search, color-coded ratings, and smooth UI transitions. (December 2023)',
      icon: '🎬',
      category: 'Web',
      tech: ['HTML', 'CSS', 'JavaScript', 'TMDb API'],
      github: 'https://github.com/taqitazwar/Movie-Search-Web-App',
      youtube: 'https://youtu.be/gruYWaM-1tg',
      featured: false,
      features: [
        'Real-time movie data fetching',
        'Dynamic search functionality',
        'Color-coded rating system',
        'Responsive web design',
        'Smooth UI transitions'
      ]
    },
    {
      id: 12,
      title: 'Kivi Board Game',
      description: 'A Java-based digital recreation of the classic Kivi board game. Features strategic gameplay, AI opponents, and intuitive user interface with game state management.',
      icon: '🎲',
      category: 'Desktop',
      tech: ['Java', 'Game Development', 'GUI', 'AI Logic'],
      github: 'https://github.com/taqitazwar/Kivi-Board-Game',
      featured: false,
      features: [
        'Strategic board game logic',
        'AI opponent implementation',
        'User-friendly interface',
        'Game state management',
        'Classic board game recreation'
      ]
    }
  ];

  const categories = ['All', 'Mobile', 'Web', 'Data Science', 'Desktop'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Show only featured projects initially, or all if showAllProjects is true
  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.filter(project => project.featured);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Show all projects when a specific category is selected, reset to featured for 'All'
    setShowAllProjects(category !== 'All');
  };

  const handleShowMoreProjects = () => {
    setShowAllProjects(true);
  };

  const handleDontClickMe = () => {
    // Create WAYYYY more falling ducks (80 ducks!)
    const newDucks = [];
    for (let i = 0; i < 80; i++) {
      newDucks.push({
        id: Date.now() + i,
        x: Math.random() * (window.innerWidth - 50),
        delay: Math.random() * 4, // Longer delay range
        size: 25 + Math.random() * 30, // Varied sizes
        rotation: Math.random() * 360,
        animationDuration: 1.5 + Math.random() * 1.5, // Faster fall duration
        horizontalDrift: (Math.random() - 0.5) * 200 // Add horizontal movement
      });
    }
    
    setFallingDucks(newDucks);
    
    // Clear ducks after animation (faster timeout)
    setTimeout(() => {
      setFallingDucks([]);
    }, 6000);
  };

  return (
    <div className="projects-page" ref={projectsRef}>
      {/* Falling Ducks */}
      {fallingDucks.map(duck => (
        <div
          key={duck.id}
          className="falling-duck"
          style={{
            left: `${duck.x}px`,
            fontSize: `${duck.size}px`,
            animationDelay: `${duck.delay}s`,
            animationDuration: `${duck.animationDuration}s`,
            transform: `rotate(${duck.rotation}deg)`,
            '--horizontal-drift': `${duck.horizontalDrift}px`
          }}
        >
          🦆
        </div>
      ))}
      
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">
            A collection of my latest work and creative solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-icon">
                  {project.icon}
                </div>
                <div className="project-category">
                  {project.category}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {project.youtube && (
                <div className="project-video">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${
                      project.youtube.includes('/shorts/') 
                        ? project.youtube.split('/shorts/')[1]
                        : project.youtube.includes('youtu.be/')
                        ? project.youtube.split('youtu.be/')[1]
                        : project.youtube.split('v=')[1]
                    }`}
                    title="App Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      borderRadius: '10px',
                      marginBottom: '1rem'
                    }}
                  ></iframe>
                </div>
              )}

              <div className="project-actions">
                <a 
                  href={project.github} 
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-icon">🔗</span>
                  View Code
                </a>
                {project.isPortfolio && (
                  <button 
                    className="btn btn-secondary dont-click-btn"
                    onClick={handleDontClickMe}
                  >
                    <span className="btn-icon">🦆</span>
                    Don't Click Me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Projects Button */}
        {!showAllProjects && filteredProjects.length > displayedProjects.length && (
          <div className="show-more-projects">
            <button 
              className="btn btn-outline show-more-btn"
              onClick={handleShowMoreProjects}
            >
              <span className="btn-icon">📂</span>
              Show More Projects ({filteredProjects.length - displayedProjects.length} more)
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="back-to-home">
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects; 