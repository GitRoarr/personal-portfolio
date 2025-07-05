"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { projectsService } from "@/lib/firestore"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { isDark } = useTheme()
  const [projectCount, setProjectCount] = useState(null)

  useEffect(() => {
    async function fetchProjectCount() {
      try {
        const count = await projectsService.getCount()
        setProjectCount(count)
      } catch (error) {
        console.error("Failed to fetch project count", error)
        setProjectCount(null)
      }
    }
    fetchProjectCount()
  }, [])

  const stats = [
    {
      icon: "https://img.icons8.com/nolan/90/group-of-projects.png",
      label: "Projects Completed",
      value: projectCount !== null ? `${projectCount}+` : "Loading...",
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
      darkColor: "text-cyan-300",
      darkBgColor: "bg-cyan-900/50",
    },
    {
      icon: "https://img.icons8.com/emoji/96/hot-beverage.png",
      label: "Cups of Coffee",
      value: "1000+",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      darkColor: "text-yellow-300",
      darkBgColor: "bg-yellow-900/50",
    },
    {
      icon: "https://img.icons8.com/color/96/idea.png",
      label: "Ideas Realized",
      value: "10+",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      darkColor: "text-orange-300",
      darkBgColor: "bg-orange-900/50",
    },
    {
      icon: "https://img.icons8.com/fluency/96/customer-insight.png",
      label: "Years Experience",
      value: "3+",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      darkColor: "text-purple-300",
      darkBgColor: "bg-purple-900/50",
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 transition-colors duration-500 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-6xl md:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}
            style={
              !isDark
                ? {}
                : {
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }
            }
          >
            About Me
          </h2>
          <motion.div
            className={`w-24 h-1 mx-auto rounded-full ${isDark ? "bg-green-500" : "bg-purple-500"}`}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className={`relative p-8 rounded-3xl shadow-lg border transition-colors duration-500 ${
                isDark ? "border-gray-700 bg-slate-900" : "border-gray-200 bg-white"
              }`}
            >
              <h3 className={`text-3xl font-semibold mb-5 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                Crafting Solutions with Passion and Precision
              </h3>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                I study Software Engineering at Addis Ababa Institute of Technology (AAiT), AAU, where I'm deepening my
                expertise in building scalable and user-friendly applications.
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                My journey is driven by a love for problem-solving, clean code, and continuous learning. I enjoy working
                with technologies like React, Node.js, and MongoDB to create meaningful digital experiences.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Outside coding, I stay active by playing football and maintaining fitness which keeps me energized and
                focused in all I do.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -10 }}
                className={`p-8 rounded-2xl shadow-lg flex flex-col items-center text-center cursor-pointer transition-transform duration-300 ${
                  isDark ? stat.darkBgColor : stat.bgColor
                }`}
              >
                <img
                  src={stat.icon || "/placeholder.svg"}
                  alt={stat.label}
                  width={60}
                  height={60}
                  className="mb-5"
                  loading="lazy"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className={`text-4xl font-extrabold mb-3 ${isDark ? stat.darkColor : stat.color}`}
                >
                  {stat.value}
                </motion.div>
                <p className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}