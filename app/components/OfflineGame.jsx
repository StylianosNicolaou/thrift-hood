"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Game constants - reduced grid size for better visibility and gameplay
const GRID_SIZE = 15;
const CELL_SIZE = 18; // Pixels per cell
const GAME_SPEED = 180; // ms - slightly slower for better control
const BOARD_SIZE = GRID_SIZE * CELL_SIZE;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OfflineGame = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT); // Buffer for direction changes
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  // Game loop reference
  const gameLoopRef = useRef(null);

  // Sound toggle state
  const [soundOn, setSoundOn] = useState(false);

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);

      // Stop game if we're back online
      if (navigator.onLine && gameActive) {
        stopGame();
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [gameActive]);

  // Generate new food position
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    return newFood;
  }, [snake]);

  // Handle game progress and level increases
  const handleLevelProgression = useCallback(
    (newScore) => {
      // Increase level every 5 points
      const newLevel = Math.floor(newScore / 5) + 1;
      if (newLevel > level) {
        setLevel(newLevel);

        // Clear the existing interval and start a faster one
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);

          // Speed up gameplay slightly with each level
          const newSpeed = Math.max(GAME_SPEED - (newLevel - 1) * 15, 80);
          gameLoopRef.current = setInterval(gameLoop, newSpeed);
        }
      }
    },
    [level]
  );

  // Main game loop
  const gameLoop = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      // Apply the buffered next direction
      setDirection(nextDirection);

      const head = prevSnake[0];
      const newHead = {
        // Handle wall wrapping properly
        x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self (skip the tail piece that's about to move)
      const checkCollision = prevSnake
        .slice(0, -1)
        .some((segment) => segment.x === newHead.x && segment.y === newHead.y);

      if (checkCollision) {
        setGameOver(true);
        return prevSnake;
      }

      // Create new snake array with new head
      const newSnake = [newHead, ...prevSnake];

      // Check if snake ate food
      if (newHead.x === food.x && newHead.y === food.y) {
        // Increase score
        const newScore = score + 1;
        setScore(newScore);

        // Generate new food
        setFood(generateFood());

        // Check if level should increase
        handleLevelProgression(newScore);

        // Don't remove tail
        return newSnake;
      } else {
        // Remove tail if no food was eaten
        newSnake.pop();
        return newSnake;
      }
    });
  }, [
    food,
    gameOver,
    generateFood,
    nextDirection,
    score,
    handleLevelProgression,
  ]);

  // Start game function
  const startGame = () => {
    if (!gameActive) {
      setGameActive(true);
      setGameOver(false);
      setScore(0);
      setLevel(1);
      setSnake([{ x: 7, y: 7 }]);
      setFood(generateFood());
      setDirection(DIRECTIONS.RIGHT);
      setNextDirection(DIRECTIONS.RIGHT);

      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }

      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    }
  };

  // Stop game function
  const stopGame = () => {
    setGameActive(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    // Update high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameActive) return;

      // Queue the next direction change rather than applying immediately
      // This prevents rapid direction changes that could cause collisions
      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) {
            // Not going down
            setNextDirection(DIRECTIONS.UP);
          }
          break;
        case "ArrowDown":
          if (direction.y !== -1) {
            // Not going up
            setNextDirection(DIRECTIONS.DOWN);
          }
          break;
        case "ArrowLeft":
          if (direction.x !== 1) {
            // Not going right
            setNextDirection(DIRECTIONS.LEFT);
          }
          break;
        case "ArrowRight":
          if (direction.x !== -1) {
            // Not going left
            setNextDirection(DIRECTIONS.RIGHT);
          }
          break;
        case " ": // Space to pause/resume
          setGameActive((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction, gameActive]);

  // Game loop control
  useEffect(() => {
    if (gameActive && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    } else if (gameOver || !gameActive) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }

      if (gameOver) {
        stopGame();
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameActive, gameOver, gameLoop]);

  // Load high score on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Mobile controls handler
  const handleMobileControl = (newDirection) => {
    if (!gameActive) return;

    // Apply the same direction logic as keyboard controls
    switch (newDirection) {
      case "UP":
        if (direction.y !== 1) setNextDirection(DIRECTIONS.UP);
        break;
      case "DOWN":
        if (direction.y !== -1) setNextDirection(DIRECTIONS.DOWN);
        break;
      case "LEFT":
        if (direction.x !== 1) setNextDirection(DIRECTIONS.LEFT);
        break;
      case "RIGHT":
        if (direction.x !== -1) setNextDirection(DIRECTIONS.RIGHT);
        break;
    }
  };

  // Return null when online
  if (isOnline) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <h2 className="font-retro text-thrift-red text-2xl mb-1 animate-pulse">
          NO SIGNAL
        </h2>
        <p className="font-retro text-thrift-teal text-lg">You're offline</p>
        <p className="text-white text-sm mt-1">
          Play some Snake while you wait...
        </p>
      </div>

      {/* Game container */}
      <div className="relative vhs-tracking bg-thrift-black p-4 border-4 border-thrift-purple rounded-lg shadow-retro-xl">
        {/* CRT screen effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-radial from-black/0 to-black/70 pointer-events-none z-10"></div>

        {/* TV static overlay */}
        <div className="absolute inset-0 bg-static opacity-5 mix-blend-overlay pointer-events-none z-10 rounded-lg"></div>

        {/* Game header */}
        <div className="flex justify-between items-center mb-2 px-2 font-retro text-sm">
          <div className="text-thrift-yellow">LEVEL: {level}</div>
          <div className="text-thrift-red animate-pulse">REC ● 90.04</div>
        </div>

        {/* Game board */}
        <div
          className="relative bg-black overflow-hidden border-2 border-gray-800"
          style={{
            width: `${BOARD_SIZE}px`,
            height: `${BOARD_SIZE}px`,
            boxShadow: "0 0 20px rgba(0, 229, 232, 0.3) inset",
          }}
        >
          {/* Grid lines for better visibility */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 229, 232, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 232, 0.05) 1px, transparent 1px)",
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            }}
          ></div>

          {/* Food */}
          <div
            className="absolute rounded-sm bg-thrift-red animate-pulse"
            style={{
              width: `${CELL_SIZE - 2}px`,
              height: `${CELL_SIZE - 2}px`,
              left: `${food.x * CELL_SIZE + 1}px`,
              top: `${food.y * CELL_SIZE + 1}px`,
              boxShadow: "0 0 8px rgba(255, 0, 85, 0.8)",
            }}
          ></div>

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm ${
                index === 0 ? "bg-thrift-teal" : "bg-thrift-lime"
              }`}
              style={{
                width: `${CELL_SIZE - 2}px`,
                height: `${CELL_SIZE - 2}px`,
                left: `${segment.x * CELL_SIZE + 1}px`,
                top: `${segment.y * CELL_SIZE + 1}px`,
                boxShadow:
                  index === 0 ? "0 0 8px rgba(0, 229, 232, 0.8)" : "none",
                zIndex: 100 - index, // Head above body segments
              }}
            ></div>
          ))}

          {/* Game Over overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30">
              <div className="text-thrift-red font-retro text-2xl mb-2 animate-pulse">
                GAME OVER
              </div>
              <div className="text-white font-retro mb-4">
                SCORE: <span className="text-thrift-yellow">{score}</span>
              </div>
              <button
                onClick={startGame}
                className="px-4 py-1 bg-thrift-teal text-black font-bold border-2 border-black shadow-retro text-sm transform rotate-1 hover:rotate-0 transition-transform"
              >
                PLAY AGAIN
              </button>
            </div>
          )}

          {/* Paused overlay */}
          {!gameActive && !gameOver && snake.length > 1 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
              <div className="text-thrift-yellow font-retro text-xl animate-pulse">
                PAUSED
              </div>
            </div>
          )}
        </div>

        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-20 rounded-lg"></div>

        {/* Game info footer */}
        <div className="mt-2 font-retro text-white text-xs flex justify-between items-center px-2">
          <div>
            SCORE: <span className="text-thrift-yellow">{score}</span>
          </div>
          <div>
            HIGH: <span className="text-thrift-red">{highScore}</span>
          </div>
          <div>
            SNAKE: <span className="text-thrift-lime">{snake.length}</span>
          </div>
        </div>
      </div>

      {/* Game controls */}
      <div className="mt-4 flex justify-center gap-4">
        {!gameActive || gameOver ? (
          gameOver ? null : (
            <button
              onClick={startGame}
              className="px-6 py-2 bg-thrift-teal text-black font-bold border-2 border-black shadow-retro transform rotate-1 hover:rotate-0 transition-transform"
            >
              {snake.length > 1 ? "Continue" : "Start Game"}
            </button>
          )
        ) : (
          <button
            onClick={() => setGameActive(false)}
            className="px-6 py-2 bg-thrift-yellow text-black font-bold border-2 border-black shadow-retro transform -rotate-1 hover:rotate-0 transition-transform"
          >
            Pause
          </button>
        )}

        {(gameActive || snake.length > 1) && (
          <button
            onClick={stopGame}
            className="px-6 py-2 bg-thrift-red text-white font-bold border-2 border-black shadow-retro transform rotate-1 hover:rotate-0 transition-transform"
          >
            Quit
          </button>
        )}
      </div>

      {/* Mobile controls */}
      <div className="mt-4 md:hidden">
        <div className="grid grid-cols-3 gap-3">
          <div></div>
          <button
            onClick={() => handleMobileControl("UP")}
            className="w-14 h-14 bg-thrift-black border-2 border-thrift-teal flex items-center justify-center rounded-md active:bg-thrift-teal/20 text-thrift-teal text-2xl font-bold"
            disabled={!gameActive || gameOver}
          >
            ↑
          </button>
          <div></div>

          <button
            onClick={() => handleMobileControl("LEFT")}
            className="w-14 h-14 bg-thrift-black border-2 border-thrift-teal flex items-center justify-center rounded-md active:bg-thrift-teal/20 text-thrift-teal text-2xl font-bold"
            disabled={!gameActive || gameOver}
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() => handleMobileControl("RIGHT")}
            className="w-14 h-14 bg-thrift-black border-2 border-thrift-teal flex items-center justify-center rounded-md active:bg-thrift-teal/20 text-thrift-teal text-2xl font-bold"
            disabled={!gameActive || gameOver}
          >
            →
          </button>

          <div></div>
          <button
            onClick={() => handleMobileControl("DOWN")}
            className="w-14 h-14 bg-thrift-black border-2 border-thrift-teal flex items-center justify-center rounded-md active:bg-thrift-teal/20 text-thrift-teal text-2xl font-bold"
            disabled={!gameActive || gameOver}
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>

      {/* Instructions for keyboard users */}
      <div className="hidden md:block mt-3 text-gray-400 text-sm font-retro">
        <div className="text-center">Arrow keys to move · Space to pause</div>
      </div>

      {/* Connection status */}
      <div className="mt-6 text-xs text-gray-500 animate-pulse">
        Attempting to reconnect...
      </div>
    </motion.div>
  );
};

export default OfflineGame;
