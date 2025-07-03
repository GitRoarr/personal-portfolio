"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, X, Plus, Trash2 } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import ImagePicker from "./ImagePicker"

export default function ProjectForm({ project, onSave, onClose }) {
  const { isDark } = useTheme()
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    images: project?.images || [],
    technologies: project?.technologies?.join(", ") || "",
    category: project?.category || "Full Stack",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      // Ensure we have at least the main image in the images array
      images: formData.images.length > 0 ? formData.images : formData.image ? [formData.image] : [],
    }
    onSave(projectData)
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
          <h2 className="text-2xl font-bold text-white">{project ? "Edit Project" : "Add New Project"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-full placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-1xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors resize-none"
              placeholder="Describe your project"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">Project Images</label>
              <motion.button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-black font-medium rounded-2xl hover:bg-green-600 transition-colors"
              >
                <Plus size={16} />
                <span>Add Image</span>
              </motion.button>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-700"
                    />
                    <motion.button
                      type="button"
                      onClick={() => removeImage(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </motion.button>
                    {index === 0 && (
                      <div className="absolute bottom-1 left-1 px-2 py-1 bg-green-500 text-black text-xs rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showImagePicker && (
              <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <ImagePicker onImageSelect={handleImageSelect} currentImage="" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Live URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                placeholder="https://project-demo.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
            />
            <label htmlFor="featured" className="text-white font-medium">
              Featured Project
            </label>
          </div>

          <div className="flex space-x-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-600 transition-colors"
            >
              <Save size={16} />
              <span>{project ? "Update Project" : "Add Project"}</span>
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
