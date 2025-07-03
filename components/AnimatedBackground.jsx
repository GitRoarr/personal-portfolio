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
    return Array.from({ length: 12 }, () => ({
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      duration: Math.random() * 15 + 8,
    }));
  }, [windowSize]);

  const codeSymbols = useMemo(() => {
    if (!windowSize) return [];
    return ["</", "/>", "{}", "[]", "/*", "*/"].map((symbol, i) => ({
      symbol,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      delay: i * 0.4,
    }));
  }, [windowSize]);

  const backgroundVariants = {
    default: isDark
      ? [
          "radial-gradient(circle at 20% 80%, #0a0a0a 0%, #1e1e1e 50%, #0a0a0a 100%)",
          "radial-gradient(circle at 80% 20%, #0a0a0a 0%, #2e2e2e 50%, #0a0a0a 100%)",
          "radial-gradient(circle at 40% 40%, #0a0a0a 0%, #1e1e1e 50%, #0a0a0a 100%)",
        ]
      : [
          "radial-gradient(circle at 20% 80%, #f9f9f9 0%, #e0e0e0 50%, #f9f9f9 100%)",
          "radial-gradient(circle at 80% 20%, #f9f9f9 0%, #d0d0d0 50%, #f9f9f9 100%)",
          "radial-gradient(circle at 40% 40%, #f9f9f9 0%, #e0e0e0 50%, #f9f9f9 100%)",
        ],
    hero: isDark
      ? [
          "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #1e1e1e 70%, #0a0a0a 100%)",
          "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #2e2e2e 70%, #0a0a0a 100%)",
        ]
      : [
          "radial-gradient(circle at 50% 50%, #f9f9f9 0%, #e0e0e0 70%, #f9f9f9 100%)",
          "radial-gradient(circle at 50% 50%, #f9f9f9 0%, #d0d0d0 70%, #f9f9f9 100%)",
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
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: isDark ? "#22c55e20" : "#7e22ce20" }}
          initial={{ x: p.x, y: p.y }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <div className="absolute bottom-10 left-10 flex space-x-2">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="w-2 rounded-full"
            style={{ background: isDark ? "#22c55e" : "#7e22ce" }}
            animate={{ height: [10, Math.random() * 40 + 15, 10] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      {codeSymbols.map(({ symbol, x, y, delay }, i) => (
        <motion.div
          key={`symbol-${i}`}
          className={`absolute text-2xl font-mono`}
          style={{ color: isDark ? "#22c55e40" : "#7e22ce50" }}
          initial={{ x, y }}
          animate={{ y: y - 30, opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}