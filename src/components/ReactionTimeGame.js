import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ReactionTimeGame.css';

const GAME_CONFIG = {
  GAME_WIDTH: 800,
  GAME_HEIGHT: 400,
  BIRD_SIZE: 40,
  PIPE_WIDTH: 80,
  PIPE_GAP: 150,
  GRAVITY: 0.6,
  JUMP_FORCE: -12,
  PIPE_SPEED: 3,
  BIRD_X: 150
};

export default function FlappyBirdGame({ onGameEnd, gameMode = 'easy' }) {
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameOver
  const [bird, setBird] = useState({ 
    y: GAME_CONFIG.GAME_HEIGHT / 2, 
    velocity: 0,
    rotation: 0 
  });
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [particles, setParticles] = useState([]);
  const gameAreaRef = useRef();
  const pipeIdRef = useRef(0);
  const gameLoopRef = useRef();
  const lastPipeSpawn = useRef(0);

  // Difficulty configurations
  const difficultyConfig = {
    easy: { pipeSpeed: 2, pipeInterval: 2000, pipeGap: 180 },
    medium: { pipeSpeed: 3, pipeInterval: 1800, pipeGap: 160 },
    hard: { pipeSpeed: 4, pipeInterval: 1600, pipeGap: 140 },
    expert: { pipeSpeed: 5, pipeInterval: 1400, pipeGap: 120 }
  };

  const currentDifficulty = difficultyConfig[gameMode] || difficultyConfig.easy;

  // Create particle effect
  const createParticle = useCallback((x, y, type = 'score') => {
    const particle = {
      id: Date.now() + Math.random(),
      x, y, type,
      opacity: 1,
      scale: 1
    };
    
    setParticles(prev => [...prev, particle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 1000);
  }, []);

  // Spawn pipe
  const spawnPipe = useCallback(() => {
    const gapStart = Math.random() * (GAME_CONFIG.GAME_HEIGHT - currentDifficulty.pipeGap - 100) + 50;
    const pipe = {
      id: pipeIdRef.current++,
      x: GAME_CONFIG.GAME_WIDTH,
      gapStart: gapStart,
      gapEnd: gapStart + currentDifficulty.pipeGap,
      passed: false
    };

    setPipes(prev => [...prev, pipe]);
  }, [currentDifficulty.pipeGap]);

  // Bird flap/jump
  const flapBird = useCallback(() => {
    if (gameState === 'playing') {
      setBird(prev => ({
        ...prev,
        velocity: GAME_CONFIG.JUMP_FORCE,
        rotation: -20
      }));
    } else if (gameState === 'ready') {
      startGame();
    }
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      // Update bird physics
      setBird(prev => {
        const newVelocity = prev.velocity + GAME_CONFIG.GRAVITY;
        const newY = prev.y + newVelocity;
        const newRotation = Math.min(Math.max(newVelocity * 3, -30), 90);

        // Check ground/ceiling collision
        if (newY <= 0 || newY >= GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BIRD_SIZE) {
          endGame();
          return prev;
        }

        return {
          y: newY,
          velocity: newVelocity,
          rotation: newRotation
        };
      });

      // Update pipes
      setPipes(prev => prev.map(pipe => {
        const newX = pipe.x - currentDifficulty.pipeSpeed;
        
        // Check if pipe is passed and should score
        if (!pipe.passed && newX + GAME_CONFIG.PIPE_WIDTH < GAME_CONFIG.BIRD_X) {
          pipe.passed = true;
          setScore(prev => prev + 1);
          createParticle(GAME_CONFIG.BIRD_X, bird.y, 'score');
        }

        // Remove pipes that are off screen
        if (newX < -GAME_CONFIG.PIPE_WIDTH) {
          return null;
        }

        return { ...pipe, x: newX };
      }).filter(Boolean));

      // Spawn new pipes
      const now = Date.now();
      if (now - lastPipeSpawn.current > currentDifficulty.pipeInterval) {
        spawnPipe();
        lastPipeSpawn.current = now;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, currentDifficulty, spawnPipe, bird.y, createParticle]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    const checkCollisions = () => {
      pipes.forEach(pipe => {
        // Check if bird collides with pipe
        if (
          GAME_CONFIG.BIRD_X < pipe.x + GAME_CONFIG.PIPE_WIDTH &&
          GAME_CONFIG.BIRD_X + GAME_CONFIG.BIRD_SIZE > pipe.x &&
          (bird.y < pipe.gapStart || bird.y + GAME_CONFIG.BIRD_SIZE > pipe.gapEnd)
        ) {
          endGame();
        }
      });
    };

    checkCollisions();
  }, [bird.y, pipes, gameState]);

  // Keyboard and click controls
  useEffect(() => {
    const handleInput = (e) => {
      if (e.type === 'keydown' && (e.key === ' ' || e.key === 'ArrowUp')) {
        e.preventDefault();
        flapBird();
      }
    };

    const handleClick = () => {
      flapBird();
    };

    window.addEventListener('keydown', handleInput);
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleInput);
      if (gameArea) {
        gameArea.removeEventListener('click', handleClick);
      }
    };
  }, [flapBird]);

  const startGame = () => {
    setGameState('playing');
    setBird({ 
      y: GAME_CONFIG.GAME_HEIGHT / 2, 
      velocity: 0,
      rotation: 0 
    });
    setPipes([]);
    setScore(0);
    setParticles([]);
    lastPipeSpawn.current = Date.now();
  };

  const endGame = () => {
    setGameState('gameOver');
    const newHighScore = Math.max(score, highScore);
    setHighScore(newHighScore);
    
    onGameEnd({
      score,
      highScore: newHighScore,
      gameMode,
      difficulty: gameMode
    });
  };

  const resetGame = () => {
    setGameState('ready');
    setBird({ 
      y: GAME_CONFIG.GAME_HEIGHT / 2, 
      velocity: 0,
      rotation: 0 
    });
    setPipes([]);
    setParticles([]);
  };

  return (
    <div className="flappy-bird-game">
      <div className="game-header">
        <h2>🐦 Flappy Bird</h2>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">High Score:</span>
            <span className="stat-value">{highScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Difficulty:</span>
            <span className="stat-value">{gameMode}</span>
          </div>
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        className="flappy-game-area"
        style={{ width: GAME_CONFIG.GAME_WIDTH, height: GAME_CONFIG.GAME_HEIGHT }}
      >
        {/* Render pipes */}
        {pipes.map(pipe => (
          <div key={pipe.id}>
            {/* Top pipe */}
            <div
              className="pipe pipe-top"
              style={{
                position: 'absolute',
                left: pipe.x,
                top: 0,
                width: GAME_CONFIG.PIPE_WIDTH,
                height: pipe.gapStart,
                backgroundColor: '#4CAF50',
                border: '3px solid #2E7D32',
                borderBottom: 'none'
              }}
            />
            {/* Bottom pipe */}
            <div
              className="pipe pipe-bottom"
              style={{
                position: 'absolute',
                left: pipe.x,
                top: pipe.gapEnd,
                width: GAME_CONFIG.PIPE_WIDTH,
                height: GAME_CONFIG.GAME_HEIGHT - pipe.gapEnd,
                backgroundColor: '#4CAF50',
                border: '3px solid #2E7D32',
                borderTop: 'none'
              }}
            />
          </div>
        ))}

        {/* Render bird */}
        <motion.div
          className="bird"
          style={{
            position: 'absolute',
            left: GAME_CONFIG.BIRD_X,
            top: bird.y,
            width: GAME_CONFIG.BIRD_SIZE,
            height: GAME_CONFIG.BIRD_SIZE,
            fontSize: GAME_CONFIG.BIRD_SIZE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${bird.rotation}deg)`,
            zIndex: 10
          }}
          animate={{
            scale: gameState === 'playing' ? [1, 1.1, 1] : 1
          }}
          transition={{
            scale: { duration: 0.3, repeat: gameState === 'playing' ? Infinity : 0 }
          }}
        >
          🐦
        </motion.div>

        {/* Render particles */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="particle"
              style={{
                position: 'absolute',
                left: particle.x,
                top: particle.y,
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#FFD700',
                pointerEvents: 'none',
                zIndex: 15
              }}
              initial={{ opacity: 1, scale: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Game State Overlays */}
        {gameState === 'ready' && (
          <div className="game-overlay">
            <h3>🐦 Flappy Bird</h3>
            <p>Click or press SPACE to flap!</p>
            <p>Avoid the pipes and fly as far as you can</p>
            <p>Each pipe you pass = 1 point</p>
            <button className="start-btn" onClick={startGame}>
              Start Flying
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="game-overlay">
            <h3>💥 Game Over!</h3>
            <div className="final-stats">
              <p>Final Score: <strong>{score}</strong></p>
              <p>High Score: <strong>{highScore}</strong></p>
              <p>Difficulty: <strong>{gameMode}</strong></p>
              {score === highScore && score > 0 && (
                <p className="new-record">🎉 New High Score!</p>
              )}
            </div>
            <button className="restart-btn" onClick={resetGame}>
              Try Again
            </button>
          </div>
        )}

        {/* Instructions overlay during gameplay */}
        {gameState === 'playing' && score < 3 && (
          <div className="gameplay-hint">
            <p>Click or press SPACE to flap! 🐦</p>
          </div>
        )}
      </div>

      <div className="game-instructions">
        <p><strong>How to Play:</strong></p>
        <p>• Click anywhere or press SPACE to make the bird flap</p>
        <p>• Avoid hitting the green pipes or the ground</p>
        <p>• Each pipe you successfully pass gives you 1 point</p>
        <p>• Try to beat your high score!</p>
      </div>
    </div>
  );
} 