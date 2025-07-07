import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DuckCatchGame.css';

export default function DuckCatchGame({ onGameEnd }) {
  const [ducks, setDucks] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const gameAreaRef = useRef();
  const duckIdRef = useRef(0);

  // Create random duck
  const createDuck = () => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    const newDuck = {
      id: duckIdRef.current++,
      x: Math.random() * (rect.width - 80),
      y: Math.random() * (rect.height - 80),
      speed: 0.5 + Math.random() * 1.5,
      direction: Math.random() * Math.PI * 2,
      size: 60 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    };

    setDucks(prev => [...prev, newDuck]);

    // Remove duck after 3 seconds if not caught
    setTimeout(() => {
      setDucks(prev => prev.filter(duck => duck.id !== newDuck.id));
    }, 3000);
  };

  // Move ducks
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setDucks(prev => prev.map(duck => {
        const gameArea = gameAreaRef.current;
        if (!gameArea) return duck;

        const rect = gameArea.getBoundingClientRect();
        let newX = duck.x + Math.cos(duck.direction) * duck.speed;
        let newY = duck.y + Math.sin(duck.direction) * duck.speed;

        // Bounce off walls
        if (newX <= 0 || newX >= rect.width - duck.size) {
          duck.direction = Math.PI - duck.direction;
          newX = Math.max(0, Math.min(rect.width - duck.size, newX));
        }
        if (newY <= 0 || newY >= rect.height - duck.size) {
          duck.direction = -duck.direction;
          newY = Math.max(0, Math.min(rect.height - duck.size, newY));
        }

        return {
          ...duck,
          x: newX,
          y: newY
        };
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Game timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          onGameEnd(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score, onGameEnd]);

  // Spawn ducks
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      if (ducks.length < 5) {
        createDuck();
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameActive, ducks.length]);

  const catchDuck = (duckId) => {
    setDucks(prev => prev.filter(duck => duck.id !== duckId));
    setScore(prev => prev + 10);
  };

  const handleClose = () => {
    setGameActive(false);
    onGameEnd(score);
  };

  return (
    <div className="duck-game-container">
      <div className="game-header">
        <h2>🦆 Duck Catch Game!</h2>
        <div className="game-stats">
          <span className="score">Score: {score}</span>
          <span className="timer">Time: {timeLeft}s</span>
        </div>
        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div ref={gameAreaRef} className="game-area">
        <AnimatePresence>
          {ducks.map(duck => (
            <motion.div
              key={duck.id}
              className="duck"
              style={{
                left: duck.x,
                top: duck.y,
                width: duck.size,
                height: duck.size,
                backgroundColor: duck.color
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, rotate: 720 }}
              transition={{ duration: 0.3 }}
              onClick={() => catchDuck(duck.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🦆
            </motion.div>
          ))}
        </AnimatePresence>

        {!gameActive && (
          <motion.div 
            className="game-over"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
        )}
      </div>

      <div className="game-instructions">
        <p>Click the ducks to catch them! 🦆</p>
        <p>Each duck is worth 10 points!</p>
      </div>
    </div>
  );
} 