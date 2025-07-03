"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingIcons() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  const icons = [
    {
      name: "VS Code",
      icon: "https://img.icons8.com/fluency/48/visual-studio-code-2019.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "GitHub",
      icon: "https://img.icons8.com/fluency/48/github.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "React",
      icon: "https://img.icons8.com/fluency/48/react-native.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "Node.js",
      icon: "https://img.icons8.com/color/48/nodejs.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "Firebase",
      icon: "https://img.icons8.com/color/48/firebase.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "Next.js",
      icon: "https://img.icons8.com/fluency/48/nextjs.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "JavaScript",
      icon: "https://img.icons8.com/fluency/48/javascript.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "TypeScript",
      icon: "https://img.icons8.com/fluency/48/typescript--v1.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "MongoDB",
      icon: "https://img.icons8.com/color/48/mongodb.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
    {
      name: "Docker",
      icon: "https://img.icons8.com/fluency/48/docker.png",
      initialX: Math.random() * (windowSize.width - 100),
      initialY: Math.random() * (windowSize.height - 100),
    },
  ]

  if (windowSize.width === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {icons.map((iconData, index) => (
        <motion.div
          key={iconData.name}
          className="absolute opacity-30 hover:opacity-90 transition-opacity duration-300 pointer-events-auto"
          initial={{
            x: iconData.initialX,
            y: iconData.initialY,
          }}
          animate={{
            x: [
              iconData.initialX,
              Math.random() * (windowSize.width - 100),
              Math.random() * (windowSize.width - 100),
              iconData.initialX,
            ],
            y: [
              iconData.initialY,
              Math.random() * (windowSize.height - 100),
              Math.random() * (windowSize.height - 100),
              iconData.initialY,
            ],
            rotate: [0, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          whileHover={{
            scale: 1.5,
            rotate: 180,
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <div className="w-12 h-12 relative">
            <img
              src={iconData.icon}
              alt={iconData.name}
              className="w-full h-full object-contain drop-shadow-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/20 to-primary-purple/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
