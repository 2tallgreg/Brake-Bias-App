// components/common/LoadingScreen.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    { text: "Finding professional reviews...", icon: "📰" },
    { text: "Analyzing Reddit discussions...", icon: "💬" },
    { text: "Gathering market pricing data...", icon: "💰" },
    { text: "Compiling vehicle specifications...", icon: "🔧" },
    { text: "Processing sentiment analysis...", icon: "🤖" },
    { text: "Almost ready...", icon: "✨" }
  ];

  useEffect(() => {
    // Rotate through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-content">
        {/* Animated Car Wheel */}
        <div className="loading-animation">
          <motion.div 
            className="wheel-outer"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="wheel-inner">
              <div className="spoke"></div>
              <div className="spoke"></div>
              <div className="spoke"></div>
              <div className="spoke"></div>
              <div className="spoke"></div>
            </div>
          </motion.div>
          <div className="wheel-shadow"></div>
        </div>

        {/* Loading Messages */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMessage}
            className="loading-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="message-icon">{loadingMessages[currentMessage].icon}</span>
            <span className="message-text">{loadingMessages[currentMessage].text}</span>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>

        {/* Fun Facts */}
        <motion.div 
          className="fun-fact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Did you know? We analyze over 1000+ data points to bring you comprehensive vehicle insights!</p>
        </motion.div>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
          max-width: 400px;
          padding: 2rem;
        }

        .loading-animation {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 3rem;
        }

        .wheel-outer {
          width: 120px;
          height: 120px;
          border: 8px solid var(--text-primary);
          border-radius: 50%;
          position: relative;
          background: var(--bg-secondary);
        }

        .wheel-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          transform: translate(-50%, -50%);
          background: var(--text-primary);
          border-radius: 50%;
        }

        .spoke {
          position: absolute;
          width: 4px;
          height: 40px;
          background: var(--text-primary);
          top: 50%;
          left: 50%;
          transform-origin: center bottom;
        }

        .spoke:nth-child(1) { transform: translate(-50%, -100%) rotate(0deg); }
        .spoke:nth-child(2) { transform: translate(-50%, -100%) rotate(72deg); }
        .spoke:nth-child(3) { transform: translate(-50%, -100%) rotate(144deg); }
        .spoke:nth-child(4) { transform: translate(-50%, -100%) rotate(216deg); }
        .spoke:nth-child(5) { transform: translate(-50%, -100%) rotate(288deg); }

        .wheel-shadow {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 20px;
          background: var(--shadow);
          border-radius: 50%;
          filter: blur(10px);
        }

        .loading-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          min-height: 40px;
        }

        .message-icon {
          font-size: 1.5rem;
        }

        .message-text {
          font-size: 1.125rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .progress-container {
          margin-bottom: 2rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .fun-fact {
          margin-top: 2rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
        }

        .fun-fact p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .loading-animation {
            width: 80px;
            height: 80px;
            margin-bottom: 2rem;
          }

          .wheel-outer {
            width: 80px;
            height: 80px;
            border-width: 6px;
          }

          .wheel-inner {
            width: 30px;
            height: 30px;
          }

          .spoke {
            width: 3px;
            height: 25px;
          }

          .message-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
}