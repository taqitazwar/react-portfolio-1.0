import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="card-background">
        <div className="card-gradient" />
        <div className="card-grid" />
      </div>
      
      <div className="card-content">
        <motion.div 
          className="card-header"
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="project-title">{project.title}</h3>
          <div className="project-icon">
            {index % 4 === 0 && '📱'}
            {index % 4 === 1 && '🎮'}
            {index % 4 === 2 && '🌍'}
            {index % 4 === 3 && '📊'}
          </div>
        </motion.div>
        
        <p className="project-description">{project.description}</p>
        
        <div className="tech-stack">
          {project.tech.map((tech, i) => (
            <motion.span 
              key={i}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        
        <motion.div 
          className="card-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-link"
          >
            <motion.button 
              className="view-project-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project →
            </motion.button>
          </a>
        </motion.div>
      </div>
      
      <div className="card-shine" />
      
      <motion.div 
        className="floating-particles"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [-20, -40, -20],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 