"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"

const devRoles = [
  { label: "Web Developer", icon: "https://img.icons8.com/external-beshi-color-kerismaker/48/external-Web-Developer-web-development-beshi-color-kerismaker.png" },
  { label: "Full Stack Engineer", icon: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-full-stack-computer-programming-flaticons-flat-flat-icons.png" },
  { label: "Mobile App Developer", icon: "https://img.icons8.com/fluency/28/android.png" },
  { label: "React & Next.js Expert", icon: "https://img.icons8.com/nolan/64/react-native.png" },
  { label: "Backend Developer", icon: "https://img.icons8.com/color/48/nodejs.png" },
  { label: "Database Specialist", icon: "https://img.icons8.com/glassmorphism/48/database.png" },
  { label: "UI/UX Developer", icon: "https://img.icons8.com/color/48/figma--v1.png" },
  { label: "Cross-Platform Creator", icon: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/50/external-cross-platform-influencer-marketing-flaticons-lineal-color-flat-icons-3.png" },
  { label: "Performance Optimizer", icon: "https://img.icons8.com/fluency/28/speed.png" },
  { label: "Freelance Partner", icon: "https://img.icons8.com/fluency/28/handshake.png" },
]

export default function HeroSection() {
  const { isDark } = useTheme()

  const themeColor = isDark ? "#22c55e" : "#8b5cf6"
  const themeGradient = isDark
    ? "from-green-400 via-green-500 to-emerald-400"
    : "from-[#00C4CC] to-[#8E2DE2]"

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const name = "GIRMA"
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % devRoles.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                <span>Hi, I am </span>
                <div className="inline-block">
                  {name.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{
                        scale: 1.2,
                        color: themeColor,
                        textShadow: `0 0 20px ${themeColor}`,
                      }}
                      className={`inline-block bg-gradient-to-r bg-clip-text text-transparent cursor-pointer ${themeGradient}`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <div
                className={`text-2xl md:text-4xl ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center justify-center lg:justify-start gap-3`}
              >
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: `${devRoles[currentRoleIndex].label} <img src="${devRoles[currentRoleIndex].icon}" class="inline ml-2" width="28" height="28" />`,
                  }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className={`text-xl max-w-2xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                I am a Software Engineer from Addis Ababa, Ethiopia 🇪🇹 who builds modern web and mobile applications
                using powerful tools and technologies. I bring ideas to life with clean design and smooth performance.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${themeColor}4D` }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 1.1, boxShadow: `0 0 15px 5px ${themeColor}AA` }}
                tabIndex={0}
                className={`px-8 py-4 font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none text-white ${
                  isDark
                    ? "bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-400"
                    : "bg-gradient-to-r from-[#00C4CC] to-[#8E2DE2] hover:bg-gradient-to-br focus:ring-4 focus:ring-[#00C4CC]/50"
                }`}
              >
                <a href="#projects" className="flex items-center space-x-2">
                  <span>View My Work</span>
                  <img
                    src="https://img.icons8.com/material-rounded/24/move-right.png"
                    alt="move-right"
                    width={20}
                    height={20}
                    className="filter brightness-0 invert"
                  />
                </a>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                whileFocus={{ scale: 1.1, boxShadow: `0 0 15px 5px ${themeColor}AA` }}
                tabIndex={0}
                className={`px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 focus:outline-none ${
                  isDark
                    ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:ring-green-400"
                    : "border-transparent bg-gradient-to-r from-[#00C4CC] to-[#8E2DE2] text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-[#00C4CC]/50"
                }`}
              >
                <a href="#contact" className="flex items-center space-x-2">
                  <span>Let us Talk</span>
                  <img src="https://img.icons8.com/fluency/24/chat--v3.png" alt="Chat Icon" width={20} height={20} />
                </a>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              {[
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
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                  className={`relative hover:shadow-lg transition-all duration-300 group ${
                    isDark ? "text-white hover:text-green-500" : "text-gray-700 hover:text-purple-600"
                  }`}
                  title={social.label}
                >
                  <img src={social.icon || "/placeholder.svg"} alt={social.label} width={28} height={28} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {[
                { icon: "https://img.icons8.com/fluency/48/laptop.png", alt: "Laptop" },
                { icon: "https://img.icons8.com/nolan/64/react-native.png", alt: "React" },
                { icon: "https://img.icons8.com/nolan/64/android-os.png", alt: "Android" },
                { icon: "https://img.icons8.com/fluency/48/design.png", alt: "Design" },
              ].map((tech, index) => (
                <motion.div
                  key={tech.alt}
                  className="absolute"
                  style={{ top: "50%", left: "50%" }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((index * 60 * Math.PI) / 180) * 120,
                    y: Math.sin((index * 60 * Math.PI) / 180) * 120,
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20"
                  >
                    <img
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.alt}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                className="relative w-80 h-80"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className={`absolute inset-0 rounded-full p-2 bg-gradient-to-r ${themeGradient}`}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                    <img src="/me.jpg" alt="Girma" className="w-full h-full object-cover rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 text-4xl"
                >
                  👋
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -bottom-4 -left-4 text-3xl"
                >
                  🇪🇹
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-3xl ${
            isDark ? "text-green-500" : "text-purple-600"
          }`}
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}