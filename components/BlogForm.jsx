"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, X } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function BlogForm({ blog, onSave, onClose }) {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
    excerpt: blog?.excerpt || "",
    tags: blog?.tags?.join(", ") || "",
    featured: blog?.featured || false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const blogData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }
    onSave(blogData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 backdrop-blur-md p-8 rounded-2xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{blog ? "Edit Blog Post" : "Add New Blog Post"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors resize-none"
              placeholder="Brief description of your blog post"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors resize-none"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
              placeholder="React, JavaScript, Web Development"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-spotify-green bg-gray-800 border-gray-600 rounded focus:ring-spotify-green focus:ring-2"
            />
            <label htmlFor="featured" className="text-white font-medium">
              Featured Blog Post
            </label>
          </div>

          <div className="flex space-x-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-spotify-green text-black font-bold rounded-2xl hover:bg-spotify-green/90 transition-colors"
            >
              <Save size={16} />
              <span>{blog ? "Update Blog Post" : "Add Blog Post"}</span>
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
