import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// Using native Three.js geometry instead of broken Drei exports
import { motion } from 'framer-motion';
import './SkillsOrb.css';

// 3D Orb Component
function AnimatedOrb({ color, isHovered }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.scale.setScalar(isHovered ? 1.15 : 1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8} 
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
}

export default function SkillsOrb({ skill, color, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="skills-orb"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="orb-3d">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />
          <AnimatedOrb color={color} isHovered={isHovered} />
        </Canvas>
      </div>
      
      <motion.div 
        className="skill-icon"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 360 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      <motion.div 
        className="skill-label"
        animate={{
          color: isHovered ? color : '#ffffff',
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {skill}
      </motion.div>
      
      <motion.div 
        className="skill-description"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.3 }}
      >
        Specialized
      </motion.div>
      
      <div className="orb-glow" style={{ backgroundColor: color }} />
    </motion.div>
  );
} 