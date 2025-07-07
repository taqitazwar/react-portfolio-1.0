import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MemoryMatchGame from './components/MemoryMatchGame';
import './MiniGames.css';

gsap.registerPlugin(ScrollTrigger);

// Game modes configuration - moved outside component to prevent re-creation
const GAME_MODES = {
  classic: { name: 'Classic', time: 60, spawnRate: 1000, gravity: 0.2 },
  gravity: { name: 'Gravity Mode', time: 45, spawnRate: 800, gravity: 0.5 },
  speedrun: { name: 'Speed Run', time: 30, spawnRate: 500, gravity: 0.1 },
  chaos: { name: 'Chaos Mode', time: 90, spawnRate: 300, gravity: 0.3 }
};

const MiniGames = ({ setCurrentPage }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameMode, setGameMode] = useState('classic');
  const [highScore, setHighScore] = useState(0);
  const [ducks, setDucks] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [missedDucks, setMissedDucks] = useState(0);
  const [particleEffects, setParticleEffects] = useState([]);
  const [gameResults, setGameResults] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const gameAreaRef = useRef();

  // Page animations - Right to Left
  useEffect(() => {
    // Page header animation
    gsap.fromTo('.page-header', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Game cards - Right to Left animation
    gsap.fromTo('.game-card', 
      { x: 150, opacity: 0, scale: 0.9, rotateY: 10 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.games-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Game modes - Right to Left animation
    gsap.fromTo('.game-mode-btn', 
      { x: 100, opacity: 0, scale: 0.9 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.game-modes',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Game area - Right to Left animation
    gsap.fromTo('.game-area', 
      { x: 200, opacity: 0, scale: 0.95 }, 
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.game-area',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  // Memoized current game mode to prevent unnecessary re-renders
  const currentGameMode = useMemo(() => GAME_MODES[gameMode], [gameMode]);

  // Enhanced particle effect system
  const createParticleEffect = useCallback((x, y, type = 'score') => {
    const effect = {
      id: Date.now() + Math.random(),
      x,
      y,
      type,
      opacity: 1,
      scale: 1
    };
    
    setParticleEffects(prev => [...prev, effect]);
    
    // Animate and remove particle effect
    setTimeout(() => {
      setParticleEffects(prev => prev.filter(p => p.id !== effect.id));
    }, 1000);
  }, []);

  // Enhanced Duck Spawning System
  useEffect(() => {
    if (!gameActive || !selectedGame) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.8) { // 80% chance to spawn duck
        const spawnSide = Math.random() < 0.5 ? 'left' : 'right';
        const isGolden = Math.random() < 0.12; // 12% chance for golden duck
        const isSpecial = Math.random() < 0.05; // 5% chance for special duck
        
        const newDuck = {
          id: Date.now() + Math.random(),
          x: spawnSide === 'left' ? -40 : 420, // Start from sides
          y: Math.random() * 200 + 100, // Random height
          vx: spawnSide === 'left' ? Math.random() * 4 + 2 : -(Math.random() * 4 + 2), // Horizontal velocity
          vy: (Math.random() - 0.5) * 3, // Slight vertical velocity
          size: Math.random() * 15 + 25, // Size variation
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 8,
          color: isGolden ? '#FFD700' : isSpecial ? '#FF69B4' : `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
          type: isGolden ? 'golden' : isSpecial ? 'special' : 'normal',
          bounces: 0,
          maxBounces: 2,
          lifetime: 0,
          maxLifetime: isGolden ? 4000 : isSpecial ? 6000 : 5000 // Different lifetimes
        };
        setDucks(prev => [...prev, newDuck]);
      }
    }, currentGameMode.spawnRate);

    return () => clearInterval(interval);
  }, [gameActive, selectedGame, currentGameMode.spawnRate]);

  // Enhanced Physics Animation Loop
  useEffect(() => {
    if (!gameActive || !selectedGame) return;

    const animationLoop = () => {
      setDucks(prev => prev.map(duck => {
        // Apply enhanced physics
        let newX = duck.x + duck.vx;
        let newY = duck.y + duck.vy;
        let newVx = duck.vx;
        let newVy = duck.vy + currentGameMode.gravity;
        let newRotation = duck.rotation + duck.rotationSpeed;
        let newBounces = duck.bounces;
        let newLifetime = duck.lifetime + 16; // Increment lifetime

        // Enhanced boundary collisions
        if (newX <= -50 || newX >= 430) {
          // Duck escaped - count as missed if it's special or golden
          if (duck.type === 'golden' || duck.type === 'special') {
            setMissedDucks(prev => prev + 1);
          }
          return null; // Mark for removal
        }

        // Check if duck has exceeded its lifetime
        if (newLifetime >= duck.maxLifetime) {
          // Duck disappeared - count as missed if it's special or golden
          if (duck.type === 'golden' || duck.type === 'special') {
            setMissedDucks(prev => prev + 1);
          }
          return null; // Mark for removal
        }

        // Top boundary
        if (newY <= 0) {
          newVy = -newVy * 0.7;
          newY = 0;
          newBounces++;
        }

        // Bottom boundary
        if (newY >= 350 - duck.size) {
          newVy = -newVy * 0.6;
          newY = 350 - duck.size;
          newBounces++;
          
          if (Math.abs(newVy) < 1) {
            newVy = -(Math.random() * 2 + 1);
          }
        }

        // Apply air resistance for more realistic movement
        newVx *= 0.999;
        newVy *= 0.998;

        return {
          ...duck,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rotation: newRotation,
          bounces: newBounces,
          lifetime: newLifetime
        };
      }).filter(duck => 
        duck !== null && 
        duck.bounces < duck.maxBounces
      ));
    };

    const animationInterval = setInterval(animationLoop, 16); // ~60fps
    return () => clearInterval(animationInterval);
  }, [gameActive, selectedGame, currentGameMode.gravity]);

  // Game Timer
  useEffect(() => {
    if (gameActive && !gameFinished) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            setGameFinished(true);
            if (score > highScore) {
              setHighScore(score);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameActive, gameFinished, score, highScore, setGameActive, setGameFinished, setHighScore]);

  const startGame = useCallback((mode) => {
    setGameMode(mode);
    setSelectedGame('duck-catcher');
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setMissedDucks(0);
    setDucks([]);
    setParticleEffects([]);
    setTimeLeft(GAME_MODES[mode].time);
    setGameFinished(false);
    
    // Visual feedback for game start
    gsap.fromTo('.game-area', 
      { scale: 0.9, opacity: 0.7 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, []);

  const catchDuck = useCallback((duckId, duckType) => {
    const duck = ducks.find(d => d.id === duckId);
    if (!duck) return;
    
    setDucks(prev => prev.filter(d => d.id !== duckId));
    
    // Enhanced scoring system
    let points;
    switch (duckType) {
      case 'golden':
        points = 100;
        break;
      case 'special':
        points = 75;
        break;
      default:
        points = 25;
    }
    
    const comboBonus = combo * 5;
    const totalPoints = points + comboBonus;
    
    setScore(prev => prev + totalPoints);
    setCombo(prev => {
      const newCombo = prev + 1;
      setMaxCombo(current => Math.max(current, newCombo));
      return newCombo;
    });

    // Create particle effect at duck location
    createParticleEffect(duck.x + duck.size/2, duck.y + duck.size/2, duckType);

    // Enhanced visual feedback
    gsap.to('.score-display', {
      scale: 1.3,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Combo visual feedback
    if (combo > 0) {
      gsap.fromTo('.combo', 
        { scale: 1.5, color: '#FFD700' },
        { scale: 1, color: '#FFF', duration: 0.3 }
      );
    }
  }, [ducks, combo, createParticleEffect]);

  const resetGame = useCallback(() => {
    setSelectedGame(null);
    setGameActive(false);
    setGameFinished(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setMissedDucks(0);
    setDucks([]);
    setParticleEffects([]);
    setGameResults(null);
    setCurrentDifficulty('easy');
  }, []);

  const handleGameEnd = useCallback((results) => {
    setGameActive(false);
    setGameResults(results);
    setGameFinished(true);
  }, []);

  const gameList = [
    {
      id: 'duck-catcher',
      name: 'Goose? Nope, Duck!',
      description: 'Catch flying ducks with realistic physics!',
      icon: '🦆',
      color: '#4F46E5'
    },
    {
      id: 'memory-match',
      name: 'I Swear I Saw That',
      description: 'Test your memory with beautiful card matching!',
      icon: '🧠',
      color: '#7C3AED'
    }
  ];

  return (
    <div className="minigames-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Mini Games</h1>
          <p className="page-subtitle">
            In this corner of my website try to beat my high score
          </p>
        </div>

        {!selectedGame ? (
          <div className="games-grid">
            {gameList.map((game) => (
              <div
                key={game.id}
                className={`game-card ${game.id.includes('coming-soon') ? 'coming-soon' : ''}`}
                onClick={() => !game.id.includes('coming-soon') && setSelectedGame(game.id)}
                style={{ borderColor: game.color }}
              >
                <div className="game-icon" style={{ color: game.color }}>
                  {game.icon}
                </div>
                <h3 className="game-title">{game.name}</h3>
                <p className="game-description">{game.description}</p>
                {game.id === 'duck-catcher' && (
                  <div className="game-stats">
                    <div className="stat">
                      <span className="stat-label">High Score:</span>
                      <span className="stat-value">{highScore}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="game-container">
            <div className="game-header">
              <button className="back-btn" onClick={resetGame}>
                ← Back to Games
              </button>
              <div className="game-info">
                <div className="score-display">
                  Score: {score}
                  {combo > 0 && <span className="combo">x{combo}</span>}
                </div>
                <div className="time-display">
                  Time: {timeLeft}s
                </div>
              </div>
            </div>

            {!gameActive && !gameFinished && selectedGame === 'duck-catcher' && (
              <div className="game-modes">
                <h3>Choose Game Mode:</h3>
                <div className="mode-buttons">
                  {Object.entries(GAME_MODES).map(([key, mode]) => (
                    <button
                      key={key}
                      className="game-mode-btn"
                      onClick={() => startGame(key)}
                    >
                      <div className="mode-name">{mode.name}</div>
                      <div className="mode-time">{mode.time}s</div>
                      <div className="mode-stats">
                        Spawn: {mode.spawnRate}ms | Gravity: {mode.gravity}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!gameActive && !gameFinished && selectedGame === 'memory-match' && (
              <div className="game-modes">
                <h3>Choose Difficulty:</h3>
                <div className="mode-buttons">
                  {Object.entries({
                    easy: { name: 'Easy', description: '4x4 Grid - 2 minutes' },
                    medium: { name: 'Medium', description: '6x6 Grid - 3 minutes' },
                    hard: { name: 'Hard', description: '8x8 Grid - 4 minutes' },
                    expert: { name: 'Expert', description: '10x10 Grid - 5 minutes' }
                  }).map(([key, mode]) => (
                    <button
                      key={key}
                      className="game-mode-btn"
                      onClick={() => {
                        setCurrentDifficulty(key);
                        setGameActive(true);
                      }}
                    >
                      <div className="mode-name">{mode.name}</div>
                      <div className="mode-stats">{mode.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}



            {gameFinished && (
              <div className="game-results">
                <h3>🎉 Game Over!</h3>
                <div className="results-stats">
                  {selectedGame === 'duck-catcher' && (
                    <>
                      <div className="result-item">
                        <span className="result-label">Final Score:</span>
                        <span className="result-value highlight">{score}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Max Combo:</span>
                        <span className="result-value">{maxCombo}x</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Special Ducks Missed:</span>
                        <span className="result-value">{missedDucks}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">High Score:</span>
                        <span className="result-value">{score > highScore ? 'NEW! ' : ''}{Math.max(score, highScore)}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Mode Played:</span>
                        <span className="result-value">{GAME_MODES[gameMode].name}</span>
                      </div>
                    </>
                  )}
                  
                  {selectedGame === 'memory-match' && gameResults && (
                    <>
                      <div className="result-item">
                        <span className="result-label">Final Score:</span>
                        <span className="result-value highlight">{gameResults.score}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Total Moves:</span>
                        <span className="result-value">{gameResults.moves}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Max Combo:</span>
                        <span className="result-value">{gameResults.maxCombo}x</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Time Used:</span>
                        <span className="result-value">{Math.floor(gameResults.timeUsed / 60)}:{(gameResults.timeUsed % 60).toString().padStart(2, '0')}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Status:</span>
                        <span className="result-value">{gameResults.completed ? '✅ Complete' : '❌ Time Out'}</span>
                      </div>
                    </>
                  )}
                  

                </div>
                <div className="result-actions">
                  <button className="play-again-btn" onClick={() => {
                    if (selectedGame === 'duck-catcher') {
                      startGame(gameMode);
                    } else {
                      setGameActive(true);
                      setGameFinished(false);
                      setGameResults(null);
                    }
                  }}>
                    🔄 Play Again
                  </button>
                  <button className="change-mode-btn" onClick={() => setGameFinished(false)}>
                    🎮 Change Mode
                  </button>
                </div>
              </div>
            )}

            <div className="game-area" ref={gameAreaRef}>
              {/* Render different games based on selection */}
              {selectedGame === 'duck-catcher' && (
                <>
                  {/* Enhanced Duck Rendering */}
                  {ducks.map(duck => (
                    <div
                      key={duck.id}
                      className={`duck ${duck.type} interactive`}
                      style={{
                        position: 'absolute',
                        left: `${duck.x}px`,
                        top: `${duck.y}px`,
                        width: `${duck.size}px`,
                        height: `${duck.size}px`,
                        transform: `rotate(${duck.rotation}deg) scale(${duck.type === 'golden' ? 1.2 : duck.type === 'special' ? 1.1 : 1})`,
                        fontSize: `${duck.size}px`,
                        color: duck.color,
                        cursor: 'pointer',
                        textShadow: duck.type === 'golden' ? '0 0 10px #FFD700' : duck.type === 'special' ? '0 0 8px #FF69B4' : 'none',
                        animation: duck.type === 'golden' ? 'goldPulse 1s infinite' : duck.type === 'special' ? 'specialGlow 1.5s infinite' : 'none',
                        filter: duck.lifetime > duck.maxLifetime * 0.8 ? 'opacity(0.7)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        userSelect: 'none',
                        pointerEvents: 'auto',
                        zIndex: 10
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        catchDuck(duck.id, duck.type);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      {duck.type === 'golden' ? '🥇' : duck.type === 'special' ? '💎' : '🦆'}
                    </div>
                  ))}

                  {/* Particle Effects */}
                  {particleEffects.map(effect => (
                    <div
                      key={effect.id}
                      className={`particle-effect ${effect.type}`}
                      style={{
                        left: `${effect.x}px`,
                        top: `${effect.y}px`,
                        animation: `particleFloat 1s ease-out forwards`
                      }}
                    >
                      {effect.type === 'golden' ? '+100!' : effect.type === 'special' ? '+75!' : '+25!'}
                    </div>
                  ))}
                  
                  {gameActive && (
                    <div className="game-instructions">
                      <p>🦆 <strong>Blue Ducks</strong> = 25 points</p>
                      <p>🥇 <strong>Golden Ducks</strong> = 100 points + glow!</p>
                      <p>💎 <strong>Diamond Ducks</strong> = 75 points + special effects!</p>
                      <p>🔥 <strong>Build combos</strong> for bonus points!</p>
                      <p className="combo-info">Current Combo: <span className="combo-display">{combo}x</span></p>
                    </div>
                  )}

                  {/* Game Stats Overlay */}
                  {gameActive && (
                    <div className="game-stats-overlay">
                      <div className="stat-item">
                        <span className="stat-icon">⏰</span>
                        <span>{timeLeft}s</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">🎯</span>
                        <span>{combo}x</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">❌</span>
                        <span>{missedDucks}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedGame === 'memory-match' && gameActive && (
                <MemoryMatchGame 
                  onGameEnd={handleGameEnd}
                  difficulty={currentDifficulty}
                />
              )}


            </div>
          </div>
        )}

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

export default MiniGames; 