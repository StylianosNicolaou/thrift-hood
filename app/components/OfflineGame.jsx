"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Game constants
const GRID_SIZE = 20;
const GAME_SPEED = 150; // ms
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OfflineGame = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game loop reference
  const gameLoopRef = useRef(null);

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

  // Game logic remains the same
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

  const gameLoop = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  const startGame = () => {
    if (!gameActive) {
      setGameActive(true);
      setGameOver(false);
      setScore(0);
      setSnake([{ x: 10, y: 10 }]);
      setFood(generateFood());
      setDirection(DIRECTIONS.RIGHT);

      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }

      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    }
  };

  const stopGame = () => {
    setGameActive(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  };

  // Other effects remain the same
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameActive) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== DIRECTIONS.DOWN) {
            setDirection(DIRECTIONS.UP);
          }
          break;
        case "ArrowDown":
          if (direction !== DIRECTIONS.UP) {
            setDirection(DIRECTIONS.DOWN);
          }
          break;
        case "ArrowLeft":
          if (direction !== DIRECTIONS.RIGHT) {
            setDirection(DIRECTIONS.LEFT);
          }
          break;
        case "ArrowRight":
          if (direction !== DIRECTIONS.LEFT) {
            setDirection(DIRECTIONS.RIGHT);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction, gameActive]);

  useEffect(() => {
    if (gameActive && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    } else if (gameOver) {
      stopGame();
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameActive, gameOver, gameLoop]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="font-retro text-thrift-red text-2xl mb-2 animate-pulse">
          NO SIGNAL
        </h2>
        <p className="font-retro text-thrift-teal text-lg">You're offline</p>
        <p className="text-white text-sm mt-2">
          Play some Snake while you wait...
        </p>
      </div>

      {/* Game container */}
      <div className="relative vhs-tracking">
        {/* CRT screen effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-radial from-black/0 to-black/70 pointer-events-none z-10"></div>

        {/* TV static overlay */}
        <div className="absolute inset-0 bg-static opacity-5 mix-blend-overlay pointer-events-none z-10"></div>

        {/* Game board */}
        <div
          className="relative w-80 h-80 border-4 border-thrift-purple bg-black overflow-hidden"
          style={{
            boxShadow: "0 0 20px rgba(0, 229, 232, 0.5) inset",
            backgroundImage:
              "linear-gradient(rgba(0, 229, 232, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 232, 0.05) 1px, transparent 1px)",
            backgroundSize: `${80 / GRID_SIZE}px ${80 / GRID_SIZE}px`,
          }}
        >
          {/* Food */}
          <div
            className="absolute w-4 h-4 bg-thrift-red rounded-full animate-pulse"
            style={{
              left: `${food.x * (80 / GRID_SIZE)}px`,
              top: `${food.y * (80 / GRID_SIZE)}px`,
              transform: "translate(-0.5px, -0.5px)",
            }}
          ></div>

          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute w-4 h-4 ${
                index === 0 ? "bg-thrift-teal" : "bg-thrift-lime"
              }`}
              style={{
                left: `${segment.x * (80 / GRID_SIZE)}px`,
                top: `${segment.y * (80 / GRID_SIZE)}px`,
                transform: "translate(-0.5px, -0.5px)",
                boxShadow:
                  index === 0 ? "0 0 5px rgba(0, 229, 232, 0.8)" : "none",
              }}
            ></div>
          ))}
        </div>

        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-20"></div>
      </div>

      {/* Game info and controls remain the same */}
      <div className="mt-4 font-retro text-white w-80 flex justify-between">
        <div>
          Score: <span className="text-thrift-yellow">{score}</span>
        </div>
        <div>
          High: <span className="text-thrift-red">{highScore}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {!gameActive ? (
          <button
            onClick={startGame}
            className="px-6 py-2 bg-thrift-teal text-black font-bold border-2 border-black shadow-retro transform rotate-1 hover:rotate-0 transition-transform"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        ) : (
          <button
            onClick={stopGame}
            className="px-6 py-2 bg-thrift-red text-white font-bold border-2 border-black shadow-retro transform -rotate-1 hover:rotate-0 transition-transform"
          >
            Stop Game
          </button>
        )}
      </div>

      <div className="mt-6 md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onClick={() =>
              direction !== DIRECTIONS.DOWN && setDirection(DIRECTIONS.UP)
            }
            className="w-12 h-12 bg-thrift-black border-2 border-white flex items-center justify-center"
            disabled={!gameActive}
          >
            ↑
          </button>
          <div></div>

          <button
            onClick={() =>
              direction !== DIRECTIONS.RIGHT && setDirection(DIRECTIONS.LEFT)
            }
            className="w-12 h-12 bg-thrift-black border-2 border-white flex items-center justify-center"
            disabled={!gameActive}
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() =>
              direction !== DIRECTIONS.LEFT && setDirection(DIRECTIONS.RIGHT)
            }
            className="w-12 h-12 bg-thrift-black border-2 border-white flex items-center justify-center"
            disabled={!gameActive}
          >
            →
          </button>

          <div></div>
          <button
            onClick={() =>
              direction !== DIRECTIONS.UP && setDirection(DIRECTIONS.DOWN)
            }
            className="w-12 h-12 bg-thrift-black border-2 border-white flex items-center justify-center"
            disabled={!gameActive}
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-400">
        Attempting to reconnect...
      </div>
    </motion.div>
  );
};

export default OfflineGame;
