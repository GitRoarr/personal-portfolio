"use client"

import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"

const Icons8Icon = ({
  name,
  size = 24,
  className = "",
  color = "currentColor",
  animate = true,
  hoverEffect = true,
  fontSize = "inherit",
}) => {
  const iconMap = {
    home: <LucideIcons.Home size={size} className={className} color={color} />,
    user: <LucideIcons.User size={size} className={className} color={color} />,
    lightning: <LucideIcons.Zap size={size} className={className} color={color} />,
    briefcase: <LucideIcons.Briefcase size={size} className={className} color={color} />,
    mail: <LucideIcons.Mail size={size} className={className} color={color} />,

    github: <LucideIcons.Github size={size} className={className} color={color} />,
    linkedin: <LucideIcons.Linkedin size={size} className={className} color={color} />,
    telegram: <LucideIcons.Send size={size} className={className} color={color} />,

    react: (
      <span style={{ fontSize: size }} className={className}>
        ⚛️
      </span>
    ),
    nextjs: (
      <span style={{ fontSize: size }} className={className}>
        ▲
      </span>
    ),
    firebase: (
      <span style={{ fontSize: size }} className={className}>
        🔥
      </span>
    ),

    // UI Icons
    settings: <LucideIcons.Settings size={size} className={className} color={color} />,
    heart: <LucideIcons.Heart size={size} className={className} color={color} />,
    coffee: (
      <span style={{ fontSize: size }} className={className}>
        ☕
      </span>
    ),
    star: <LucideIcons.Star size={size} className={className} color={color} />,
    rocket: (
      <span style={{ fontSize: size }} className={className}>
        🚀
      </span>
    ),
    mapPin: <LucideIcons.MapPin size={size} className={className} color={color} />,
    code: <LucideIcons.Code size={size} className={className} color={color} />,
    download: <LucideIcons.Download size={size} className={className} color={color} />,
    sun: <LucideIcons.Sun size={size} className={className} color={color} />,
    moon: <LucideIcons.Moon size={size} className={className} color={color} />,

    // Admin Icons
    shield: <LucideIcons.Shield size={size} className={className} color={color} />,
    plus: <LucideIcons.Plus size={size} className={className} color={color} />,
    edit: <LucideIcons.Edit size={size} className={className} color={color} />,
    trash: <LucideIcons.Trash2 size={size} className={className} color={color} />,
    eye: <LucideIcons.Eye size={size} className={className} color={color} />,
    logout: <LucideIcons.LogOut size={size} className={className} color={color} />,
  }

  const IconComponent = iconMap[name]

  if (!IconComponent) {
    // Fallback to a default icon
    return <LucideIcons.HelpCircle size={size} className={className} color={color} />
  }

  // Animation variants
  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      opacity: 1,
    },
    hover: {
      scale: hoverEffect ? 1.1 : 1,
      rotate: hoverEffect ? [0, -5, 5, 0] : 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  // Continuous animation variants
  const continuousVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    bounce: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    float: {
      y: [0, -8, 0],
      x: [0, 2, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    glow: {
      filter: [
        "drop-shadow(0 0 0px currentColor)",
        "drop-shadow(0 0 8px currentColor)",
        "drop-shadow(0 0 0px currentColor)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Determine animation type based on icon name
  const getAnimationType = () => {
    if (!animate) return "initial"

    switch (name) {
      case "settings":
        return "rotate"
      case "heart":
      case "star":
        return "pulse"
      case "rocket":
      case "lightning":
        return "bounce"
      case "react":
      case "nextjs":
        return "float"
      case "github":
      case "linkedin":
      case "telegram":
      case "mail":
        return "glow"
      default:
        return "initial"
    }
  }

  if (!animate && !hoverEffect) {
    return IconComponent
  }

  return (
    <motion.div
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={getAnimationType()}
      style={{
        display: "inline-block",
        fontSize: fontSize,
      }}
      className="cursor-pointer"
    >
      {IconComponent}
    </motion.div>
  )
}

export default Icons8Icon
