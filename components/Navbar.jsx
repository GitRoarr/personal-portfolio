"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { isAdmin } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "about", "skills", "projects", "blog", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home", icon: "https://img.icons8.com/fluency/90/home.png" },
    { name: "About", href: "#about", icon: "👨‍💻" },
    { name: "Skills", href: "#skills", icon: "https://img.icons8.com/fluency/90/admin-settings-male--v1.png" },
    { name: "Projects", href: "#projects", icon: "https://img.icons8.com/nolan/90/group-of-projects.png" },
    {
      name: "Blog",
      href: "#blog",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-J1chjvAMuLcgsD1iA30IGZay078sxw.png",
    },
    { name: "Contact", href: "#contact", icon: "https://img.icons8.com/color/90/contact-card.png" },
  ]

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? `${isDark ? "bg-gray-900/95" : "bg-gray-900/95"} backdrop-blur-md shadow-lg border-b ${isDark ? "border-gray-800" : "border-gray-800"}`
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="text-2xl"
              ></motion.div>
              <span className="text-2xl font-bold text-theme-gradient">Girma.dev</span>
              {isAdmin && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`ml-2 px-2 py-1 ${isDark ? "bg-spotify-green/20 border-spotify-green/30" : "bg-spotify-green/20 border-spotify-green/30"} rounded-full border`}
                >
                  <span className={`${isDark ? "text-spotify-green" : "text-spotify-green"} text-xs font-bold`}>
                    ADMIN
                  </span>
                </motion.div>
              )}
            </motion.div>

            <div
              className={`hidden md:flex items-center space-x-2 ${isDark ? "bg-gray-800/50" : "bg-gray-800/50"} backdrop-blur-sm rounded-full px-4 py-2 border ${isDark ? "border-gray-700" : "border-gray-700"}`}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 group ${
                    activeSection === item.name.toLowerCase()
                      ? `theme-primary ${isDark ? "bg-gray-700/50" : "bg-gray-700/50"}`
                      : `${isDark ? "text-gray-300 hover:text-white" : "text-gray-300 hover:text-white"}`
                  }`}
                >
                  {item.name === "About" ? (
                    <span className="text-lg">{item.icon}</span>
                  ) : (
                    <img
                      src={item.icon || "/placeholder.svg"}
                      alt={item.name}
                      width={16}
                      height={16}
                      className="opacity-80"
                    />
                  )}
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 ${isDark ? "bg-gray-800/50" : "bg-gray-800/50"} backdrop-blur-sm rounded-full border ${isDark ? "border-gray-700" : "border-gray-700"} transition-all duration-300 overflow-hidden group`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {/* Background glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark ? "bg-yellow-400/20" : "bg-blue-400/20"
                  }`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon container */}
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }}
                        >
                          <Sun size={20} className="text-yellow-400 drop-shadow-lg" strokeWidth={2.5} />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }}
                        >
                          <Moon size={20} className="text-blue-300 drop-shadow-lg" strokeWidth={2.5} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sparkle effects */}
                {isDark && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                  />
                )}

                {!isDark && (
                  <>
                    <motion.div
                      className="absolute -top-1 -left-1 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.3,
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.8,
                      }}
                    />
                  </>
                )}
              </motion.button>

              {isAdmin && (
                <motion.a
                  href="/admin"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-theme-primary text-white rounded-lg transition-colors"
                >
                  <img src="https://img.icons8.com/fluency/48/settings.png" alt="Settings" width={16} height={16} />
                  <span>Admin Panel</span>
                </motion.a>
              )}

              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-2 ${isDark ? "text-white hover:text-spotify-green" : "text-white hover:text-spotify-green"} transition-colors`}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-bold"
                      >
                        ✕
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img src="https://img.icons8.com/fluency/48/menu.png" alt="Menu" width={24} height={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden ${isDark ? "bg-gray-800/95" : "bg-gray-800/95"} backdrop-blur-md rounded-2xl mb-4 border ${isDark ? "border-gray-700" : "border-gray-700"} overflow-hidden`}
              >
                <div className="p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        activeSection === item.name.toLowerCase()
                          ? `theme-primary ${isDark ? "bg-gray-700/50" : "bg-gray-700/50"}`
                          : `${isDark ? "text-gray-300 hover:text-white hover:bg-gray-700/30" : "text-gray-300 hover:text-white hover:bg-gray-700/30"}`
                      }`}
                    >
                      {item.name === "About" ? (
                        <span className="text-lg">{item.icon}</span>
                      ) : (
                        <img src={item.icon || "/placeholder.svg"} alt={item.name} width={16} height={16} />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </motion.a>
                  ))}

                  {/* Mobile Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 w-full ${isDark ? "text-gray-300 hover:text-white hover:bg-gray-700/30" : "text-gray-300 hover:text-white hover:bg-gray-700/30"}`}
                  >
                    <div className="flex items-center justify-center w-4 h-4">
                      {isDark ? (
                        <Sun size={16} className="text-yellow-400" />
                      ) : (
                        <Moon size={16} className="text-blue-300" />
                      )}
                    </div>
                    <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div
          className={`${isDark ? "bg-gray-900/80" : "bg-gray-900/80"} backdrop-blur-sm rounded-full p-2 border ${isDark ? "border-gray-700" : "border-gray-700"}`}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.2 }}
              className={`block w-3 h-3 rounded-full mb-2 last:mb-0 transition-all duration-300 ${
                activeSection === item.name.toLowerCase()
                  ? `${isDark ? "bg-spotify-green shadow-lg shadow-spotify-green/50" : "bg-spotify-green shadow-lg shadow-spotify-green/50"}`
                  : `${isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-600 hover:bg-gray-500"}`
              }`}
            >
              <span className="sr-only">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  )
}
