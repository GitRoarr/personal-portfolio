"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { projectsService, analyticsService } from "@/lib/firestore";
import { FileX } from "lucide-react";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" });
  const { isDark } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectsService.getAll();
        console.log("Fetched projects data:", data);
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from projectsService.getAll");
        }
        setProjects(data);
        setError(null);
      } catch (error) {
        console.error("Error loading projects:", error);
        setError("Failed to load projects. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
    analyticsService.trackView("projects");
  }, []);

  const categories = ["All", ...new Set(projects.map((project) => project.category || "Uncategorized"))];
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  if (loading) {
    return (
      <section className={`py-20 ${isDark ? "bg-black/30" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-spotify-green font-medium">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 ${isDark ? "bg-black/30" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4 text-red-500"
          >
            🚨
          </motion.div>
          <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>{error}</p>
          <motion.button
            onClick={() => loadProjects()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-spotify-green text-black font-medium rounded-lg hover:bg-spotify-green/90 transition-colors"
          >
            Retry
          </motion.button>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`py-20 ${isDark ? "bg-black" : "bg-gray-50/30"} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
        <h2 className="text-8xl md:text-6xl font-bold text-white mb-6">My Projects</h2>

          <motion.p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto mb-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Here are some of my recent projects that showcase my skills and creativity🤹
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-spotify-green mx-auto rounded-full"
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
                    ? "bg-spotify-green text-black shadow-lg"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
              </motion.div>
              <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                No projects found. Check back soon!
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${isDark ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group`}
              >
                <div className="relative overflow-hidden">
                  <div className="relative w-full h-48 overflow-x-auto flex snap-x snap-mandatory scrollbar-hide">
                    {(project.images || [project.image || "https://via.placeholder.com/400x300"]).map((image, imgIndex) => (
                      <motion.img
                        key={imgIndex}
                        src={image}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        className="w-full h-48 object-cover snap-center flex-shrink-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: imgIndex * 2, duration: 1 }}
                      />
                    ))}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-spotify-green  text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} group-hover:text-spotify-green transition-colors`}
                    >
                      {project.title || "Untitled Project"}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                    >
                      {project.category || "Uncategorized"}
                    </span>
                  </div>

                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4 line-clamp-3`}>
                    {project.description || "No description available."}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? "bg-spotify-green/20 text-spotify-green" : "bg-spotify-green/10 text-spotify-green"} border border-spotify-green/30`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className={`px-2 py-1 rounded text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-2 bg-spotify-green text-white rounded-full shadow-lg hover:bg-spotify-green/90 transition-all duration-300"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-spotify-green text-black font-medium py-2 px-4 rounded-md hover:bg-spotify-green/90 transition-colors text-center"
                      >
                        <img src="https://img.icons8.com/fluency/48/github.png" alt="Github" />Github

                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}