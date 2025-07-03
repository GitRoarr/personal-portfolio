"use client";

import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Footer() {
  const { isDark } = useTheme();
  const { isAdmin } = useAuth();
  const controls = useAnimation();

  const [symbolPositions, setSymbolPositions] = useState([]);
  const [dotPositions, setDotPositions] = useState([]);

  useEffect(() => {
    const newSymbolPositions = ["{}", "[]", "()", "</>", "&&", "||", "=>", "++"].map(() => ({
      x: Math.random() * 1200,
      y: Math.random() * 400,
      rotate: Math.random() * 360,
    }));
    setSymbolPositions(newSymbolPositions);

    const newDotPositions = [...Array(15)].map(() => ({
      x: Math.random() * 1200,
      y: Math.random() * 400,
    }));
    setDotPositions(newDotPositions);

    controls.start((i) => ({
      x: Math.random() * 1200,
      y: Math.random() * 400,
      rotate: 360,
      transition: {
        duration: 20 + i * 5,
        repeat: Infinity,
        ease: "linear",
      },
    }));
  }, [controls]);

  const socialLinks = [
    {
      icon: "https://img.icons8.com/fluency/48/github.png",
      href: "https://github.com/GitRoarr",
      label: "GitHub",
    },
    {
      icon: "https://img.icons8.com/fluency/48/linkedin.png",
      href: "https://www.linkedin.com/in/girma-enkuchile-714725338/",
      label: "LinkedIn",
    },
    {
      icon: "https://img.icons8.com/fluency/48/telegram-app.png",
      href: "https://t.me/mariamin211",
      label: "Telegram",
    },
    {
      icon: "https://img.icons8.com/fluency/48/mail.png",
      href: "mailto:girmaenkuchille@gmail.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home", icon: "https://img.icons8.com/fluency/90/home.png" },
    { name: "About", href: "#about", icon: "👨‍💻" },
    { name: "Skills", href: "#skills", icon: "https://img.icons8.com/fluency/90/admin-settings-male--v1.png" },
    { name: "Projects", href: "#projects", icon: "https://img.icons8.com/nolan/90/group-of-projects.png" },
    { name: "Contact", href: "#contact", icon: "https://img.icons8.com/color/90/contact-card.png" },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      } border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {["{}", "[]", "()", "</>", "&&", "||", "=>", "++"].map((symbol, index) => (
          <motion.div
            key={symbol}
            custom={index}
            animate={controls}
            className={`absolute text-6xl font-mono ${
              isDark ? "text-gray-800/20" : "text-gray-300/30"
            } select-none`}
            initial={symbolPositions[index] || { x: 0, y: 0, rotate: 0 }}
          >
            {symbol}
          </motion.div>
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              isDark ? "bg-spotify-green/30" : "bg-primary-purple/30"
            } rounded-full`}
            initial={dotPositions[i] || { x: 0, y: 0 }}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 400,
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div className="flex items-center space-x-3 mb-6" whileHover={{ scale: 1.05 }}>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
                className="text-3xl"
              ></motion.div>
              <div>
                <h3 className="text-3xl font-bold text-theme-gradient">Girma.dev</h3>
                <motion.p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Crafting Digital Experiences ✨
                </motion.p>
              </div>
            </motion.div>

            <motion.p
              className={`${isDark ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-6 text-lg`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Full-stack developer from{" "}
              <span
                className={`${isDark ? "text-spotify-green" : "text-primary-purple"} font-semibold`}
              >
                Addis Ababa, Ethiopia
              </span>{" "}
              🇪🇹 passionate about creating beautiful, functional web applications that make a
              difference.
            </motion.p>

            <motion.div
              className={`flex items-center space-x-3 ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl">📍</span>
              </motion.div>
              <span className="font-medium">Addis Ababa, Ethiopia</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-2xl"
              >
                🇪🇹
              </motion.span>
            </motion.div>

            <div className="mb-6">
              <h4
                className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3 flex items-center space-x-2`}
              ></h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center space-x-2`}
            >
              <span>Quick Links</span>
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    color: isDark ? "#1DB954" : "#8b5cf6",
                  }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 ${
                    isDark ? "text-gray-400 hover:text-spotify-green" : "text-gray-600 hover:text-primary-purple"
                  } transition-all duration-300 group`}
                >
                  {link.name === "About" ? (
                    <span className="text-lg">{link.icon}</span>
                  ) : (
                    <img
                      src={link.icon}
                      alt={link.name}
                      width={16}
                      height={16}
                      className="opacity-70"
                    />
                  )}
                  <span className="font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center space-x-2`}
            >
              <span className="text-xl">💖</span>
              <span>Let's Connect</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: `0 15px 30px ${
                      isDark ? "rgba(29, 185, 84, 0.4)" : "rgba(139, 92, 246, 0.4)"
                    }`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group flex flex-col items-center p-4 ${
                    isDark ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-white/50 hover:bg-gray-50"
                  } backdrop-blur-sm rounded-xl border ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  } transition-all duration-300`}
                  title={social.label}
                >
                  <motion.div
                    className={`absolute inset-0 ${
                      isDark ? "bg-spotify-green/20" : "bg-primary-purple/20"
                    } rounded-xl opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <img
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                    className="relative z-10 transition-colors duration-300"
                  />

                  <span
                    className={`relative z-10 text-xs font-medium mt-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } ${isDark ? "group-hover:text-spotify-green" : "group-hover:text-primary-purple"} transition-colors`}
                  >
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div
              className={`p-4 ${isDark ? "bg-gray-800/30" : "bg-white/30"} backdrop-blur-sm rounded-xl border ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                />
                <div className="flex items-center space-x-1">
                  <img
                    src="https://img.icons8.com/fluency/24/copy.png"
                    alt="Copy Icon"
                    width={16}
                    height={16}
                    className="opacity-70"
                  />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Available for work
                    </p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Open to exciting projects!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className={`border-t ${isDark ? "border-gray-800" : "border-gray-200"} pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <img
                src="https://img.icons8.com/fluency/24/copy.png"
                alt="Copy Icon"
                width={18}
                height={18}
                className="opacity-70"
              />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-lg"
              ></motion.span>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
                2024 Girma Enkuchile. All rights reserved.
              </p>
            </motion.div>

            <div className="w-full flex justify-center mb-4">
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                  transition={{ scale: { duration: 1, repeat: Infinity }, rotate: { duration: 2, repeat: Infinity } }}
                >
                  <span className="text-ellipsis">💖</span>
                </motion.div>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>and</span>
                <motion.div
                  animate={{
                  y: [0, -3, 0],
                  z: [0, 30, 0], 
                  rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-lg">☕</span>
                </motion.div>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>in Addis Ababa</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-lg"
                >
                  🇪🇹
                </motion.span>
              </motion.div>
            </div>

            {isAdmin && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center space-x-2 px-3 py-1 ${
                  isDark ? "bg-spotify-green/20 border-spotify-green/30" : "bg-primary-purple/20 border-primary-purple/30"
                } rounded-full border`}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <img
                    src="https://img.icons8.com/fluency/48/star.png"
                    alt="Admin"
                    width={14}
                    height={14}
                  />
                </motion.div>
                <span className={`${isDark ? "text-spotify-green" : "text-primary-purple"} text-xs font-bold`}>
                  ADMIN LOGGED IN
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
