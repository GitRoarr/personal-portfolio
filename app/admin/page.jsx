"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { projectsService, blogService, analyticsService, resumeService } from "@/lib/firestore"
import { BarChart3, Users, FileText, ArrowLeft, Shield, Eye, Edit, Trash2, Plus, Upload } from "lucide-react"
import ProjectForm from "@/components/ProjectForm"
import BlogFormComponent from "@/components/BlogForm"

export default function AdminPanel() {
  const { isAdmin, loading } = useAuth()
  const { isDark } = useTheme()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [blogs, setBlogs] = useState([])
  const [analytics, setAnalytics] = useState([])
  const [resumeData, setResumeData] = useState(null)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBlogs: 0,
    totalViews: 0,
  })
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [showResumeForm, setShowResumeForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingBlog, setEditingBlog] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [resumeFormData, setResumeFormData] = useState({
    downloadUrl: "",
    description: "",
  })

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/")
      return
    }

    if (isAdmin) {
      loadData()
    }
  }, [isAdmin, loading, router])

  const loadData = async () => {
    try {
      setLoadingData(true)
      const [projectsData, blogsData, analyticsData, resumeDataResult] = await Promise.all([
        projectsService.getAll(),
        blogService.getAll(),
        analyticsService.getAnalytics(),
        resumeService.getLatest(),
      ])

      setProjects(projectsData)
      setBlogs(blogsData)
      setAnalytics(analyticsData)
      setResumeData(resumeDataResult)

      // Calculate real stats from Firebase data
      const totalViews = analyticsData.filter((item) => item.action === "view").length
      setStats({
        totalProjects: projectsData.length,
        totalBlogs: blogsData.length,
        totalViews: totalViews,
      })
    } catch (error) {
      console.error("Error loading admin data:", error)
      // Set empty arrays on error
      setProjects([])
      setBlogs([])
      setAnalytics([])
      setResumeData(null)
      setStats({
        totalProjects: 0,
        totalBlogs: 0,
        totalViews: 0,
      })
    } finally {
      setLoadingData(false)
    }
  }

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectsService.delete(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Error deleting project")
      }
    }
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogService.delete(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting blog:", error)
        alert("Error deleting blog")
      }
    }
  }

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        await projectsService.update(editingProject.id, projectData)
      } else {
        await projectsService.add(projectData)
      }
      await loadData()
      setShowProjectForm(false)
      setEditingProject(null)
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Error saving project")
    }
  }

  const handleSaveBlog = async (blogData) => {
    try {
      if (editingBlog) {
        await blogService.update(editingBlog.id, blogData)
      } else {
        await blogService.add({
          ...blogData,
          publishedAt: new Date(),
          author: "Girma Enkuchile",
        })
      }
      await loadData()
      setShowBlogForm(false)
      setEditingBlog(null)
    } catch (error) {
      console.error("Error saving blog:", error)
      alert("Error saving blog")
    }
  }

  const handleSaveResume = async (e) => {
    e.preventDefault()
    try {
      await resumeService.saveResumeInfo(resumeFormData)
      await loadData()
      setShowResumeForm(false)
      setResumeFormData({ downloadUrl: "", description: "" })
      alert("Resume updated successfully!")
    } catch (error) {
      console.error("Error saving resume:", error)
      alert("Error saving resume")
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-spotify-green text-lg font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="p-3 bg-gray-900 text-spotify-green rounded-xl hover:bg-spotify-green hover:text-black transition-all duration-300 border border-gray-800 hover:border-spotify-green"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">Manage your portfolio content</p>
            </div>
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(29, 185, 84, 0.4)",
                "0 0 0 10px rgba(29, 185, 84, 0)",
                "0 0 0 0 rgba(29, 185, 84, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex items-center space-x-2 px-4 py-2 bg-spotify-green/20 rounded-full border border-spotify-green/50"
          >
            <Shield className="text-spotify-green" size={16} />
            <span className="text-spotify-green text-sm font-bold">ADMIN ACCESS</span>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Projects", value: stats.totalProjects, icon: FileText, color: "text-spotify-green" },
            { title: "Blog Posts", value: stats.totalBlogs, icon: Users, color: "text-spotify-green" },
            { title: "Total Views", value: stats.totalViews, icon: BarChart3, color: "text-spotify-green" },
            { title: "Resume", value: resumeData ? "Updated" : "Not Set", icon: Upload, color: "text-spotify-green" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(29, 185, 84, 0.3)",
              }}
              className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-spotify-green/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <motion.p
                    className="text-3xl font-bold text-white"
                    animate={{
                      color: ["#ffffff", "#1db954", "#ffffff"],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                >
                  <stat.icon className={`${stat.color}`} size={32} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Resume Management</h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResumeForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-spotify-green text-black font-bold rounded-xl hover:bg-spotify-green/90 transition-all duration-300 shadow-lg"
            >
              <Upload size={16} />
              <span>UPDATE RESUME</span>
            </motion.button>
          </div>

          {resumeData ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-spotify-green/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white mb-1">Current Resume</h3>
                  <p className="text-sm text-gray-300 mb-2">{resumeData.description}</p>
                  <p className="text-xs text-gray-500">
                    Last updated: {resumeData.updatedAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                  </p>
                </div>
                <motion.a
                  href={resumeData.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-spotify-green text-black font-medium rounded-lg hover:bg-spotify-green/90 transition-colors"
                >
                  View Resume
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Upload size={48} className="mx-auto mb-4 text-spotify-green/50" />
              </motion.div>
              <p className="text-gray-400">No resume uploaded yet. Add your resume link!</p>
            </div>
          )}
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingProject(null)
                setShowProjectForm(true)
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-spotify-green text-black font-bold rounded-xl hover:bg-spotify-green/90 transition-all duration-300 shadow-lg"
            >
              <Plus size={16} />
              <span>ADD PROJECT</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FileText size={48} className="mx-auto mb-4 text-spotify-green/50" />
                </motion.div>
                <p className="text-gray-400">No projects found. Add your first project!</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-spotify-green/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={project.image || "/placeholder.svg?height=60&width=60"}
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-600"
                    />
                    <div>
                      <h3 className="font-medium text-white">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.category}</p>
                      {project.featured && (
                        <span className="inline-block px-2 py-1 text-xs bg-spotify-green/20 text-spotify-green rounded-full border border-spotify-green/30 mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-spotify-green text-black rounded-xl hover:bg-spotify-green/90 transition-all duration-300 shadow-lg"
                      >
                        <Eye size={16} />
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingProject(project)
                        setShowProjectForm(true)
                      }}
                      className="p-3 bg-gray-700 text-spotify-green rounded-xl hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-spotify-green"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-3 bg-red-900/50 text-red-400 rounded-xl hover:bg-red-900/70 transition-all duration-300 border border-red-800 hover:border-red-600"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Blog Posts ({blogs.length})</h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingBlog(null)
                setShowBlogForm(true)
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-spotify-green text-black font-bold rounded-xl hover:bg-spotify-green/90 transition-all duration-300 shadow-lg"
            >
              <Plus size={16} />
              <span>ADD BLOG POST</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {blogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FileText size={48} className="mx-auto mb-4 text-spotify-green/50" />
                </motion.div>
                <p className="text-gray-400">No blog posts found. Create your first blog post!</p>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-spotify-green/50 transition-all duration-300"
                >
                  <div>
                    <h3 className="font-medium text-white">{blog.title}</h3>
                    <p className="text-sm text-gray-400">
                      {blog.publishedAt?.toDate?.()?.toLocaleDateString() ||
                        (blog.publishedAt instanceof Date ? blog.publishedAt.toLocaleDateString() : "Recently")}
                    </p>
                    {blog.featured && (
                      <span className="inline-block px-2 py-1 text-xs bg-spotify-green/20 text-spotify-green rounded-full border border-spotify-green/30 mt-1">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-spotify-green text-black rounded-xl hover:bg-spotify-green/90 transition-all duration-300 shadow-lg"
                    >
                      <Eye size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingBlog(blog)
                        setShowBlogForm(true)
                      }}
                      className="p-3 bg-gray-700 text-spotify-green rounded-xl hover:bg-gray-600 transition-all duration-300 border border-gray-600 hover:border-spotify-green"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-3 bg-red-900/50 text-red-400 rounded-xl hover:bg-red-900/70 transition-all duration-300 border border-red-800 hover:border-red-600"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Analytics Section */}
        {analytics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800 mt-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Analytics</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analytics.slice(0, 10).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-700"
                >
                  <span className="text-sm text-gray-300">
                    <span className="text-spotify-green font-medium">{item.action}</span> -{" "}
                    {item.section || "portfolio"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.timestamp?.toDate?.()?.toLocaleString() || "Recently"}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Resume Form Modal */}
        {showResumeForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800"
            >
              <h3 className="text-xl font-bold text-white mb-4">Update Resume</h3>
              <form onSubmit={handleSaveResume} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Google Drive Link</label>
                  <input
                    type="url"
                    value={resumeFormData.downloadUrl}
                    onChange={(e) => setResumeFormData({ ...resumeFormData, downloadUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-spotify-green focus:border-spotify-green text-white placeholder-gray-400"
                    placeholder="https://drive.google.com/file/d/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={resumeFormData.description}
                    onChange={(e) => setResumeFormData({ ...resumeFormData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-spotify-green focus:border-spotify-green text-white placeholder-gray-400"
                    placeholder="Latest resume with updated projects and skills"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-spotify-green text-black font-bold py-2 px-4 rounded-lg hover:bg-spotify-green/90 transition-colors"
                  >
                    Save Resume
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResumeForm(false)}
                    className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Project Form Modal */}
        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => {
              setShowProjectForm(false)
              setEditingProject(null)
            }}
          />
        )}

        {/* Blog Form Modal */}
        {showBlogForm && (
          <BlogFormComponent
            blog={editingBlog}
            onSave={handleSaveBlog}
            onClose={() => {
              setShowBlogForm(false)
              setEditingBlog(null)
            }}
          />
        )}
      </div>
    </div>
  )
}
