"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showTapeRewind, setShowTapeRewind] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 10;

        // Switch to TV tuning animation when we're over 70%
        if (newProgress > 70 && showTapeRewind) {
          setShowTapeRewind(false);
        }

        // Complete loading
        if (newProgress >= 100) {
          clearInterval(interval);

          // Give time for the final animation before hiding loader
          setTimeout(() => {
            setVisible(false);
          }, 800);

          return 100;
        }

        return newProgress;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [showTapeRewind]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {showTapeRewind ? (
        /* VHS Tape Rewind Animation - Without complex framer motion animations */
        <div className="relative w-64 h-40 bg-thrift-black border-4 border-gray-700 rounded-lg shadow-xl p-2">
          {/* Tape exterior */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-2 right-4 font-retro text-white text-xs">
              THRIFT<span className="text-thrift-teal">HOOD</span>
            </div>

            {/* Tape reels - using CSS animations instead of framer motion */}
            <div className="absolute top-10 left-10 flex space-x-20">
              <div className="w-16 h-16 border-4 border-gray-800 rounded-full flex items-center justify-center animate-[spin_5s_linear_infinite]">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-gray-700"></div>
              </div>
              <div className="w-16 h-16 border-4 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-gray-700 rotate-45"></div>
              </div>
            </div>

            {/* Front indicator panel */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <div className="flex justify-center space-x-12 items-center">
                <div className="w-8 h-2 bg-thrift-red rounded-sm"></div>
                <div className="w-8 h-2 bg-thrift-teal rounded-sm animate-pulse"></div>
              </div>
              <p className="text-white font-retro text-xs mt-2">
                REWINDING {Math.floor(loadingProgress)}%
              </p>
            </div>
          </div>

          {/* Loading "tape" indicator */}
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full bg-thrift-teal transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        /* TV Tuning Animation - Simplified without complex animations */
        <div className="relative w-64 h-64 overflow-hidden">
          {/* TV static background */}
          <div className="absolute inset-0 bg-static animate-[glitchText_0.2s_ease-in-out_infinite]"></div>

          {/* Simple colored overlay for TV effect */}
          <div className="absolute inset-0 bg-blue-500 mix-blend-screen opacity-20"></div>

          {/* Channel numbers */}
          <div className="absolute top-2 right-4 font-retro text-white text-lg animate-pulse">
            CH {Math.floor(Math.random() * 99)}
          </div>

          {/* "Please stand by" message */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="font-retro text-thrift-yellow text-2xl mb-2">
                TUNING
              </p>
              <p className="font-retro text-white text-lg">THRIFTHOOD.CY</p>
              <p className="font-retro text-white text-sm mt-4">
                LOADING {Math.floor(loadingProgress)}%
              </p>
            </div>
          </div>

          {/* Horizontal tracking lines - static, no animations */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[2px] bg-white opacity-20"
              style={{ top: `${i * 8 + 4}%` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
