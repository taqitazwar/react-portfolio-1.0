import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemoryMatchGame.css';

const DIFFICULTY_LEVELS = {
  easy: { 
    name: 'Easy', 
    gridSize: 4, 
    timeLimit: 120, 
    description: '4x4 Grid - 2 minutes' 
  },
  medium: { 
    name: 'Medium', 
    gridSize: 6, 
    timeLimit: 180, 
    description: '6x6 Grid - 3 minutes' 
  },
  hard: { 
    name: 'Hard', 
    gridSize: 8, 
    timeLimit: 240, 
    description: '8x8 Grid - 4 minutes' 
  },
  expert: { 
    name: 'Expert', 
    gridSize: 10, 
    timeLimit: 300, 
    description: '10x10 Grid - 5 minutes' 
  }
};

const CARD_SYMBOLS = ['🚀', '🎯', '⭐', '🎨', '🔥', '💎', '🌟', '🎪', '🎭', '🎬', 
                     '🎵', '🎹', '🎸', '🎺', '🥁', '🎲', '🃏', '🎰', '🏆', '👑',
                     '🦄', '🐉', '🦋', '🌈', '⚡', '🔮', '🌙', '☀️', '🌸', '🍀',
                     '🎃', '🎄', '❄️', '🌺', '🌻', '🌹', '🌷', '🌼', '🍄', '🌿',
                     '🎊', '🎉', '🎈', '🎀', '💝', '💖', '💫', '✨', '🌠', '🔔'];

export default function MemoryMatchGame({ onGameEnd, difficulty = 'easy' }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_LEVELS[difficulty].timeLimit);
  const [gameActive, setGameActive] = useState(true);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [particles, setParticles] = useState([]);
  const gameAreaRef = useRef();

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty]); // eslint-disable-line react-hooks/exhaustive-deps

  // Game timer
  useEffect(() => {
    if (!gameActive || gameComplete) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          onGameEnd({
            score,
            moves,
            maxCombo,
            timeUsed: DIFFICULTY_LEVELS[difficulty].timeLimit,
            completed: false
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, gameComplete, score, moves, maxCombo, difficulty, onGameEnd]);

  // Check for game completion
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameComplete(true);
      setGameActive(false);
      const timeUsed = DIFFICULTY_LEVELS[difficulty].timeLimit - timeLeft;
      const timeBonus = Math.max(0, (timeLeft / DIFFICULTY_LEVELS[difficulty].timeLimit) * 1000);
      const finalScore = score + Math.floor(timeBonus);
      
      onGameEnd({
        score: finalScore,
        moves,
        maxCombo,
        timeUsed,
        completed: true
      });
    }
  }, [matchedCards, cards, score, moves, maxCombo, timeLeft, difficulty, onGameEnd]);

  const initializeGame = () => {
    const gridSize = DIFFICULTY_LEVELS[difficulty].gridSize;
    const totalCards = gridSize * gridSize;
    const numPairs = totalCards / 2;
    
    // Create pairs of cards
    const gameSymbols = CARD_SYMBOLS.slice(0, numPairs);
    const cardPairs = [...gameSymbols, ...gameSymbols];
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setCombo(0);
    setMaxCombo(0);
    setGameComplete(false);
    setGameActive(true);
    setTimeLeft(DIFFICULTY_LEVELS[difficulty].timeLimit);
  };

  const createParticle = (x, y, type = 'match') => {
    const particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      type,
      opacity: 1
    };
    
    setParticles(prev => [...prev, particle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 1000);
  };

  const flipCard = (cardId) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards.map(id => 
        cards.find(card => card.id === id)
      );

      if (firstCard.symbol === secondCard.symbol) {
        // Match found!
        setTimeout(() => {
          setMatchedCards(prev => [...prev, ...newFlippedCards]);
          setFlippedCards([]);
          
          // Score calculation with combo bonus
          const baseScore = 100;
          const comboBonus = combo * 10;
          const timeBonus = Math.floor((timeLeft / DIFFICULTY_LEVELS[difficulty].timeLimit) * 50);
          const totalPoints = baseScore + comboBonus + timeBonus;
          
          setScore(prev => prev + totalPoints);
          setCombo(prev => {
            const newCombo = prev + 1;
            setMaxCombo(current => Math.max(current, newCombo));
            return newCombo;
          });

          // Create particle effect
          const gameArea = gameAreaRef.current;
          if (gameArea) {
            const rect = gameArea.getBoundingClientRect();
            createParticle(rect.width / 2, rect.height / 2, 'match');
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setCombo(0);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAccuracy = () => {
    if (moves === 0) return 100;
    return Math.round((matchedCards.length / 2 / moves) * 100);
  };

  return (
    <div className="memory-match-game">
      <div className="game-header">
        <h2>🧠 Memory Matrix</h2>
        <div className="game-stats">
          <div className="stat-group">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-group">
            <span className="stat-label">Time:</span>
            <span className="stat-value">{formatTime(timeLeft)}</span>
          </div>
          <div className="stat-group">
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat-group">
            <span className="stat-label">Combo:</span>
            <span className="stat-value combo-display">{combo}x</span>
          </div>
        </div>
      </div>

      <div 
        ref={gameAreaRef}
        className={`memory-grid grid-${DIFFICULTY_LEVELS[difficulty].gridSize}`}
        style={{
          gridTemplateColumns: `repeat(${DIFFICULTY_LEVELS[difficulty].gridSize}, 1fr)`
        }}
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`memory-card ${
                flippedCards.includes(card.id) || matchedCards.includes(card.id) 
                  ? 'flipped' 
                  : ''
              } ${matchedCards.includes(card.id) ? 'matched' : ''}`}
              onClick={() => flipCard(card.id)}
              initial={{ 
                opacity: 0, 
                scale: 0,
                rotateY: 0 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 180 : 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0 
              }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.02,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              whileTap={{ 
                scale: 0.95 
              }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-pattern">✨</div>
                </div>
                <div className="card-back">
                  <div className="card-symbol">{card.symbol}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`particle-burst ${particle.type}`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`
            }}
            initial={{ 
              opacity: 1, 
              scale: 0 
            }}
            animate={{ 
              opacity: 0, 
              scale: 2,
              y: -50
            }}
            exit={{ 
              opacity: 0 
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
          >
            🎉
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="game-info">
        <div className="progress-bar">
          <div className="progress-label">Progress</div>
          <div className="progress-track">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(matchedCards.length / cards.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="progress-text">
            {matchedCards.length / 2} / {cards.length / 2} pairs
          </div>
        </div>
        
        <div className="accuracy-display">
          <span className="accuracy-label">Accuracy:</span>
          <span className={`accuracy-value ${getAccuracy() >= 80 ? 'good' : getAccuracy() >= 60 ? 'okay' : 'poor'}`}>
            {getAccuracy()}%
          </span>
        </div>
      </div>
    </div>
  );
} 