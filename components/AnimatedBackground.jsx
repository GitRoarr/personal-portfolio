"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function AnimatedBackground({ className = "", style = {}, isHero = false }) {
  const { isDark } = useTheme();
  const [windowSize, setWindowSize] = useState(null); 

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize(); 
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  const particles = useMemo(() => {
    if (!windowSize) return [];
    return Array.from({ length: 10 }, () => ({
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      duration: Math.random() * 20 + 10,
    }));
  }, [windowSize]);

  const codeSymbols = useMemo(() => {
    if (!windowSize) return [];
    return ["</", "/>", "{}", "[]"].map((symbol, i) => ({
      symbol,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      delay: i * 0.5,
    }));
  }, [windowSize]);

  const backgroundVariants = {
    default: isDark
      ? [
          "radial-gradient(circle at 20% 80%, #000 0%, #1a1a1a 50%, #000 100%)",
          "radial-gradient(circle at 80% 20%, #000 0%, #2a2a2a 50%, #000 100%)",
          "radial-gradient(circle at 40% 40%, #000 0%, #1a1a1a 50%, #000 100%)",
        ]
      : [
          "radial-gradient(circle at 20% 80%, #fff 0%, #f8f9fa 50%, #fff 100%)",
          "radial-gradient(circle at 80% 20%, #fff 0%, #e9ecef 50%, #fff 100%)",
          "radial-gradient(circle at 40% 40%, #fff 0%, #f8f9fa 50%, #fff 100%)",
        ],
    hero: isDark
      ? [
          "radial-gradient(circle at 50% 50%, #000 0%, #1a1a1a 60%, #000 100%)",
          "radial-gradient(circle at 50% 50%, #000 0%, #2a2a2a 60%, #000 100%)",
        ]
      : [
          "radial-gradient(circle at 50% 50%, #fff 0%, #f8f9fa 60%, #fff 100%)",
          "radial-gradient(circle at 50% 50%, #fff 0%, #e9ecef 60%, #fff 100%)",
        ],
  };

  if (!windowSize) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}
      style={{ ...style, position: isHero ? "absolute" : "fixed" }}
    >
      <motion.div
        animate={{
          background: isHero ? backgroundVariants.hero : backgroundVariants.default,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-spotify-green/30 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <div className="absolute bottom-10 left-10 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="w-2 bg-spotify-green rounded-full"
            animate={{ height: [10, Math.random() * 50 + 20, 10] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
      {codeSymbols.map(({ symbol, x, y, delay }, i) => (
        <motion.div
          key={`symbol-${i}`}
          className={`absolute text-2xl font-mono ${isDark ? "text-spotify-green/20" : "text-spotify-green/30"}`}
          initial={{ x, y }}
          animate={{ y: y - 20, opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}
