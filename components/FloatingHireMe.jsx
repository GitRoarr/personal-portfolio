import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { Sparkles, Heart, Star, Zap } from "lucide-react"

export default function FloatingHireMe() {
  const [isHovered, setIsHovered] = useState(false)
  const [sparklePositions, setSparklePositions] = useState([])
  const { isDark } = useTheme()

  useEffect(() => {
    const positions = Array.from({ length: 6 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
    setSparklePositions(positions)
  }, [])

  const sparkleDelays = useMemo(
    () => Array.from({ length: 6 }, () => Math.random() * 2),
    []
  )

  const floatingVariants = {
    initial: { y: 0, rotate: 0, scale: 1 },
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      scale: [1, 1.05, 1],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  }

  const burstIcons = [
    "https://img.icons8.com/fluency/48/briefcase.png",
    "https://img.icons8.com/fluency/48/rocket.png",
    "https://img.icons8.com/fluency/48/star.png",
    "https://img.icons8.com/fluency/48/diamond.png",
    "https://img.icons8.com/fluency/48/target.png",
    "https://img.icons8.com/fluency/48/fire-element.png",
  ]

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      variants={floatingVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 fill-orange-400"
            style={pos}
            variants={{
              initial: { scale: 0, rotate: 0 },
              animate: {
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  delay: sparkleDelays[i],
                },
              },
            }}
            initial="initial"
            animate="animate"
          >
            <Sparkles size={12} />
          </motion.div>
        ))}

        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            boxShadow: isDark
              ? "0 20px 40px rgba(29, 185, 84, 0.4)"
              : "0 20px 40px rgba(0, 188, 212, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative block"
        >
          <div
            className={`relative ${
              isDark
                ? "bg-spotify-green"
                : "bg-gradient-to-r from-cyan-500 to-purple-600"
            } p-4 rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm`}
          >
            {/* Animated Background */}
            <motion.div
              className={`absolute inset-0 rounded-full opacity-0 ${
                isDark
                  ? "bg-gradient-to-r from-green-400 via-spotify-green to-emerald-500"
                  : "bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600"
              }`}
              animate={{
                opacity: isHovered ? [0, 0.3, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Zap className="text-white" size={24} />
              </motion.div>

              <div className="text-white">
                <motion.div
                  className="font-bold text-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Hire Me!
                </motion.div>
                <motion.div
                  className="text-xs opacity-90"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Let's work together ✨
                </motion.div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="text-red-300" size={20} />
              </motion.div>
            </div>

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Icon Burst (replaced emojis) */}
          {isHovered && (
            <div className="absolute inset-0">
              {burstIcons.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`icon-${i}`}
                  width={30}
                  height={30}
                  className="absolute"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                  }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
        </motion.a>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -10 : 10,
            scale: isHovered ? 1 : 0.8,
          }}
          className={`absolute bottom-full right-0 mb-4 ${
            isDark
              ? "bg-gray-900/90 text-white"
              : "bg-gray-100/90 text-gray-800"
          } px-4 py-2 rounded-full text-sm whitespace-nowrap backdrop-blur-sm border ${
            isDark ? "border-white/20" : "border-gray-200/50"
          }`}
        >
          <div className="flex items-center rounded-full space-x-2">
            <Star className="text-yellow-400" size={16} />
            <span>Ready to create something amazing?</span>
            <Star className="text-yellow-400 fill-red" size={16} />
          </div>
          <div
            className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              isDark ? "border-t-gray-900/90" : "border-t-gray-100/90"
            }`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
