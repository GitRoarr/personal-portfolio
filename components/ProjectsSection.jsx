"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { projectsService, analyticsService } from "@/lib/firestore"
import { ExternalLink, Github, Eye, Star } from "lucide-react"

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" })
  const { isDark } = useTheme()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("All")
  const [currentImageIndexes, setCurrentImageIndexes] = useState({})

  const loadProjects = async () => {
    try {
      const data = await projectsService.getAll()
      console.log("Fetched projects data:", data)
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from projectsService.getAll")
      }
      setProjects(data)
      setError(null)

      const initialIndexes = {}
      data.forEach((project) => {
        initialIndexes[project.id] = 0
      })
      setCurrentImageIndexes(initialIndexes)
    } catch (error) {
      console.error("Error loading projects:", error)
      setError("Failed to load projects. Please check your connection or try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
    analyticsService.trackView("projects")
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prev) => {
        const newIndexes = { ...prev }
        projects.forEach((project) => {
          const images = project.images || [project.image || "https://via.placeholder.com/400x300"]
          if (images.length > 1) {
            newIndexes[project.id] = (newIndexes[project.id] + 1) % images.length
          }
        })
        return newIndexes
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [projects])

  const categories = ["All", ...new Set(projects.map((project) => project.category || "Uncategorized"))]
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  if (loading) {
    return (
      <section className={`py-20 ${isDark ? "bg-black/30" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className={`w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4 ${
              isDark ? "border-green-500" : "border-purple-500"
            }`}
          />
          <p className={`font-medium ${isDark ? "text-green-500" : "text-purple-500"}`}>Loading projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={`py-20 ${isDark ? "bg-black/30" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-6xl mb-4 text-red-500"
          >
            🚨
          </motion.div>
          <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>{error}</p>
          <motion.button
            onClick={loadProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 px-6 py-3 font-medium rounded-lg transition-colors ${
              isDark ? "bg-green-500 text-black hover:bg-green-600" : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            Retry
          </motion.button>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className={`py-20 ${isDark ? "bg-black" : "bg-gray-50/30"} backdrop-blur-sm min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl md:text-6xl font-bold mb-6 text-white">My Projects</h2>

          <motion.p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto mb-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Here are some of my recent projects that showcase my skills and creativity🤹
          </motion.p>
          <motion.div
            className={`w-24 h-1 mx-auto rounded-full ${isDark ? "bg-green-500" : "bg-purple-500"}`}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? isDark
                      ? "bg-green-500 text-black shadow-lg"
                      : "bg-purple-500 text-white shadow-lg"
                    : `${isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} border ${isDark ? "border-gray-700" : "border-gray-200"} hover:bg-gray-100`
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-4"
              ></motion.div>
              <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                No projects found. Check back soon!
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => {
              const images = project.images || [project.image || "https://via.placeholder.com/400x300"]
              const currentImageIndex = currentImageIndexes[project.id] || 0

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col`}
                >
                  <div className="relative overflow-hidden">
                    <div className="relative w-full h-64">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />

                      {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                imgIndex === currentImageIndex
                                  ? isDark
                                    ? "bg-green-500"
                                    : "bg-purple-500"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-3">
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                              title="View Live Demo"
                            >
                              <ExternalLink size={20} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>

                    {project.featured && (
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white flex items-center space-x-1 ${
                          isDark ? "bg-green-500" : "bg-purple-500"
                        }`}
                      >
                        <Star size={14} fill="currentColor" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} ${
                          isDark ? "group-hover:text-green-500" : "group-hover:text-purple-500"
                        } transition-colors`}
                      >
                        {project.title || "Untitled Project"}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                      >
                        {project.category || "Uncategorized"}
                      </span>
                    </div>

                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 text-lg leading-relaxed flex-1`}>
                      {project.description || "No description available."}
                    </p>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 6).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                              isDark
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-purple-500/10 text-purple-600 border-purple-500/30"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className={`px-3 py-1 rounded text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4 mt-auto">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-white font-medium flex-1 ${
                            isDark
                              ? "bg-spotify-green hover:bg-spotify-green/90"
                              : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                          }`}
                        >
                          <Eye size={18} />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-white font-medium flex-1 ${
                            isDark
                              ? "bg-spotify-green hover:bg-spotify-green/90"
                              : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                          }`}
                        >
                          <Github size={18} />
                          <span>GitHub</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
