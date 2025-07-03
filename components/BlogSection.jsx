"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { blogService, analyticsService } from "@/lib/firestore"
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" })
  const { isDark } = useTheme()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadBlogs = async () => {
    try {
      const data = await blogService.getAll()

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from blogService.getAll")
      }

      setBlogs(data)
      setError(null)
    } catch (error) {
      setError(`Failed to load blog posts: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
    analyticsService.trackView("blogs")
  }, [])

  const formatDate = (date) => {
    if (!date) return "Recently"

    try {
      if (date.toDate) {
        return date.toDate().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      if (date instanceof Date) {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return "Recently"
    }
  }

  const getReadingTime = (content) => {
    if (!content) return "1 min read"
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  const truncateText = (text, maxLength = 150) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

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
          <p className={`font-medium ${isDark ? "text-green-500" : "text-purple-500"}`}>Loading blog posts...</p>
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
            📝
          </motion.div>
          <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>{error}</p>
          <motion.button
            onClick={loadBlogs}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 px-6 py-3 font-medium rounded-lg transition-colors ${
              isDark ? "bg-green-500 text-black hover:bg-green-600" : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            Retry Loading Blogs
          </motion.button>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) {
    return (
      <section className={`py-20 ${isDark ? "bg-black" : "bg-white"} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold mb-6 text-theme-gradient">Latest Blog Posts</h2>
           <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Thoughts, tutorials, and insights on software, tech trends, and creative coding.
            </p>

            <div className="flex justify-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1 w-40 rounded-full origin-left bg-theme-gradient mt-6"
              />
            </div>
          </motion.div>

          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-6xl mb-4"
            >
              📝
            </motion.div>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>
              No blog posts available yet. Check back soon for exciting content!
            </p>
            <motion.button
              onClick={loadBlogs}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                isDark ? "bg-green-500 text-black hover:bg-green-600" : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              Reload Blogs
            </motion.button>
          </div>
        </div>
      </section>
    )
  }

  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = blogs.filter((blog) => !blog.featured)

  return (
    <section id="blog" className={`py-20 ${isDark ? "bg-black" : "bg-white"} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold mb-6 text-theme-gradient">Latest Blog Posts</h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Thoughts, tutorials, and insights about web development and technology
          </p>
          <div className="flex justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-1 w-40 rounded-full origin-left bg-theme-gradient mt-6"
            />
          </div>
        </motion.div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"} flex items-center space-x-2`}
            >
              <span className="text-2xl">⭐</span>
              <span>Featured Posts</span>
            </motion.h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredBlogs.slice(0, 2).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Featured Image */}
                  {(blog.image || (blog.images && blog.images.length > 0)) && (
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={blog.image || blog.images?.[0] || "/placeholder.svg?height=200&width=400"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-purple-500/10 text-purple-600 border border-purple-500/30"}`}
                      >
                        Featured
                      </span>
                      <div
                        className={`flex items-center space-x-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        <Calendar size={14} />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </div>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"} ${isDark ? "group-hover:text-green-500" : "group-hover:text-purple-500"} transition-colors line-clamp-2`}
                    >
                      {blog.title || "Untitled Post"}
                    </h3>

                    <p
                      className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 text-lg leading-relaxed line-clamp-3`}
                    >
                      {blog.excerpt || truncateText(blog.content) || "No content available."}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                          >
                            <Tag size={12} />
                            <span>{tag}</span>
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className={`px-3 py-1 rounded text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center space-x-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{blog.author || "Girma Enkuchile"}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{blog.readTime || getReadingTime(blog.content)}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                          isDark
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20"
                        }`}
                      >
                        <span>Read More</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Blogs */}
        {regularBlogs.length > 0 && (
          <div>
            {featuredBlogs.length > 0 && (
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-2xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-900"} flex items-center space-x-2`}
              >
                <span className="text-2xl">📝</span>
                <span>Recent Posts</span>
              </motion.h3>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularBlogs.slice(0, 6).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (featuredBlogs.length > 0 ? 0.4 : 0.2) + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group`}
                >
                  {/* Blog Image */}
                  {(blog.image || (blog.images && blog.images.length > 0)) && (
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={blog.image || blog.images?.[0] || "/placeholder.svg?height=160&width=300"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    <div
                      className={`flex items-center justify-between mb-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{blog.readTime || getReadingTime(blog.content)}</span>
                      </div>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"} ${isDark ? "group-hover:text-green-500" : "group-hover:text-purple-500"} transition-colors line-clamp-2`}
                    >
                      {blog.title || "Untitled Post"}
                    </h3>

                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4 leading-relaxed line-clamp-3`}>
                      {blog.excerpt || truncateText(blog.content) || "No content available."}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className={`px-2 py-1 rounded text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                            +{blog.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center space-x-1 text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        <User size={12} />
                        <span>{blog.author || "Girma"}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          isDark
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20"
                        }`}
                      >
                        <span>Read</span>
                        <ArrowRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {blogs.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: `0 10px 30px ${isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(139, 92, 246, 0.3)"}`,
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 font-semibold rounded-full shadow-lg transition-all duration-300 text-white ${
                isDark ? "bg-green-500 hover:bg-green-600" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              View All Blog Posts
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
