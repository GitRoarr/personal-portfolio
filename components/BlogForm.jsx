"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, X, Trash2, ImageIcon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import ImagePicker from "./ImagePicker"

export default function BlogForm({ blog, onSave, onClose }) {
  const { isDark } = useTheme()
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
    excerpt: blog?.excerpt || "",
    tags: blog?.tags?.join(", ") || "",
    featured: blog?.featured || false,
    image: blog?.image || "",
    images: blog?.images || [],
    category: blog?.category || "Web Development",
    readTime: blog?.readTime || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const blogData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      // Ensure we have at least the main image in the images array
      images: formData.images.length > 0 ? formData.images : formData.image ? [formData.image] : [],
      // Auto-calculate read time if not provided
      readTime: formData.readTime || calculateReadTime(formData.content),
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

  const handleImageSelect = (imageUrl) => {
    if (formData.images.length === 0) {
      // First image becomes both the main image and first in array
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        images: [imageUrl],
      }))
    } else {
      // Additional images just get added to the array
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }))
    }
    setShowImagePicker(false)
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      // Update main image if we removed the first one
      image: newImages.length > 0 ? newImages[0] : "",
    }))
  }

  const calculateReadTime = (content) => {
    if (!content) return "1 min read"
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  const blogCategories = [
    "Web Development",
    "Mobile Development",
    "Frontend",
    "Backend",
    "Full Stack",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Database",
    "DevOps",
    "UI/UX",
    "Tutorial",
    "Tips & Tricks",
    "Career",
    "Technology",
    "Personal",
    "Other",
  ]

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
        className="bg-gray-900 backdrop-blur-md p-8 rounded-2xl border border-gray-800 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span>{blog ? "Edit Blog Post" : "Add New Blog Post"}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Category Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Blog Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
                placeholder="Enter an engaging blog title"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
              >
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-white font-medium mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors resize-none"
              placeholder="Write a compelling excerpt that summarizes your blog post (150-200 characters recommended)"
            />
            <div className="text-right text-xs text-gray-400 mt-1">{formData.excerpt.length}/200 characters</div>
          </div>

          {/* Blog Images Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">Blog Images</label>
              <motion.button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-spotify-green text-black font-medium rounded-2xl hover:bg-spotify-green/90 transition-colors"
              >
                <ImageIcon size={16} />
                <span>Add Image</span>
              </motion.button>
            </div>

            <div className="text-sm text-gray-400 mb-4">
              Add images to make your blog post more engaging. The first image will be used as the featured image.
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Blog image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-2xl border border-gray-700"
                    />
                    <motion.button
                      type="button"
                      onClick={() => removeImage(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </motion.button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-spotify-green text-black text-xs rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showImagePicker && (
              <div className="mb-4 p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
                <ImagePicker onImageSelect={handleImageSelect} currentImage="" />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-white font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors resize-none font-mono text-sm leading-relaxed"
              placeholder="Write your blog content here... You can use markdown formatting for better structure."
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formData.content.split(/\s+/).filter((word) => word).length} words</span>
              <span>Estimated read time: {calculateReadTime(formData.content)}</span>
            </div>
          </div>

          {/* Tags and Read Time Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
                placeholder="React, JavaScript, Web Development, Tutorial"
              />
              <div className="text-xs text-gray-400 mt-1">
                Separate tags with commas. Good tags help readers find your content.
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Custom Read Time (optional)</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 transition-colors"
                placeholder="e.g., 5 min read (auto-calculated if empty)"
              />
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-spotify-green bg-gray-800 border-gray-600 rounded focus:ring-spotify-green focus:ring-2"
            />
            <label htmlFor="featured" className="text-white font-medium flex items-center space-x-2">
              <span className="text-lg">⭐</span>
              <span>Featured Blog Post</span>
            </label>
            <div className="text-sm text-gray-400">Featured posts appear prominently on your blog section</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-3 bg-spotify-green text-black font-bold rounded-2xl hover:bg-spotify-green/90 transition-colors shadow-lg"
            >
              <Save size={18} />
              <span>{blog ? "Update Blog Post" : "Publish Blog Post"}</span>
            </motion.button>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Preview Info */}
          <div className="mt-6 p-4 bg-gray-800/20 rounded-2xl border border-gray-700">
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <span>📋</span>
              <span>Blog Post Preview</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <strong>Title:</strong> {formData.title || "Untitled"}
              </div>
              <div>
                <strong>Category:</strong> {formData.category}
              </div>
              <div>
                <strong>Tags:</strong> {formData.tags || "No tags"}
              </div>
              <div>
                <strong>Read Time:</strong> {formData.readTime || calculateReadTime(formData.content)}
              </div>
              <div>
                <strong>Images:</strong> {formData.images.length} image(s)
              </div>
              <div>
                <strong>Status:</strong> {formData.featured ? "Featured ⭐" : "Regular"}
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
