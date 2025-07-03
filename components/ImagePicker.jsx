"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ImageIcon, Upload, X, Loader } from "lucide-react"
import axios from "axios"

export default function ImagePicker({ onImageSelect, currentImage = "" }) {
  const [selectedImage, setSelectedImage] = useState(currentImage)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const CLOUD_NAME = "do2guqnvl"
  const UPLOAD_PRESET = "portfolio_unsigned"

  const handleImageSelect = async (event) => {
    const files = Array.from(event.target.files)
    if (!files.length) return

    // Validate file types
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    const invalidFiles = files.filter((file) => !validTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      setError(
        `Invalid file types: ${invalidFiles.map((f) => f.name).join(", ")}. Please select JPEG, PNG, WEBP, or GIF files.`,
      )
      return
    }

    // Check file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = files.filter((file) => file.size > maxSize)

    if (oversizedFiles.length > 0) {
      setError(`Files too large: ${oversizedFiles.map((f) => f.name).join(", ")}. Maximum size is 10MB per file.`)
      return
    }

    setUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Upload files one by one to avoid overwhelming the server
      const uploadedUrls = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        console.log(`Uploading file ${i + 1}/${files.length}: ${file.name}`)

        const url = await uploadSingleFile(file, i + 1, files.length)
        uploadedUrls.push(url)

        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100)

        // Small delay between uploads to prevent rate limiting
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      // Set the first uploaded image as selected
      if (uploadedUrls.length > 0) {
        setSelectedImage(uploadedUrls[0])
        onImageSelect(uploadedUrls[0])
      }

      console.log(`✅ Successfully uploaded ${uploadedUrls.length} images`)
    } catch (err) {
      console.error("Upload process failed:", err)
      setError(err.message || "Upload failed. Please try again.")
    } finally {
      setUploading(false)
      setUploadProgress(0)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const uploadSingleFile = async (file, currentIndex, totalFiles) => {
    const maxAttempts = 3
    const timeoutMs = 30000 // 30 seconds per attempt

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`Upload attempt ${attempt}/${maxAttempts} for file: ${file.name}`)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", UPLOAD_PRESET)
        formData.append("folder", "portfolio_images")

        // Add unique public_id to avoid conflicts
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(2, 15)
        formData.append("public_id", `portfolio_${timestamp}_${randomId}`)

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
          timeout: timeoutMs,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const fileProgress = (progressEvent.loaded / progressEvent.total) * 100
              const overallProgress = ((currentIndex - 1) / totalFiles) * 100 + fileProgress / totalFiles
              setUploadProgress(Math.round(overallProgress))
            }
          },
        })

        if (response.data && response.data.secure_url) {
          console.log(`✅ Upload successful for ${file.name}:`, response.data.secure_url)
          return response.data.secure_url
        } else {
          throw new Error("Invalid response from Cloudinary")
        }
      } catch (err) {
        console.error(`❌ Upload attempt ${attempt} failed for ${file.name}:`, {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message,
          code: err.code,
        })

        // If this is the last attempt, throw the error
        if (attempt === maxAttempts) {
          let errorMessage = `Failed to upload ${file.name}`

          if (err.code === "ECONNABORTED") {
            errorMessage += " (timeout)"
          } else if (err.response?.status === 400) {
            errorMessage += " (invalid file or settings)"
          } else if (err.response?.status === 401) {
            errorMessage += " (authentication failed)"
          } else if (err.response?.status >= 500) {
            errorMessage += " (server error)"
          } else if (err.response?.data?.error?.message) {
            errorMessage += `: ${err.response.data.error.message}`
          }

          throw new Error(errorMessage)
        }

        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000 // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">Upload Project Image</h4>
        <motion.label
          htmlFor="image-upload"
          whileHover={{ scale: uploading ? 1 : 1.05 }}
          whileTap={{ scale: uploading ? 1 : 0.95 }}
          className={`flex items-center space-x-2 px-4 py-2 bg-spotify-green text-black font-medium rounded-2xl transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-spotify-green/90 cursor-pointer"
          }`}
        >
          {uploading ? (
            <>
              <Loader className="animate-spin" size={16} />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon size={16} />
              <span>Choose Images</span>
            </>
          )}
        </motion.label>
        <input
          id="image-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageSelect}
          className="hidden"
          disabled={uploading}
          ref={fileInputRef}
          multiple
        />
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Uploading images...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-spotify-green h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start space-x-2 p-3 bg-red-900/20 border border-red-500/30 rounded-2xl"
        >
          <X className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
          <div className="text-red-300 text-sm">
            <p className="font-medium mb-1">Upload Error</p>
            <p>{error}</p>
          </div>
        </motion.div>
      )}

      {selectedImage && !uploading && (
        <div className="relative">
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Selected"
            className="w-full h-32 object-cover rounded-2xl border-2 border-spotify-green"
          />
          <div className="absolute top-2 right-2 bg-spotify-green text-black p-1 rounded-full">
            <Upload size={16} />
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 space-y-1">
        <p>• Supported formats: JPEG, PNG, WEBP, GIF</p>
        <p>• Maximum file size: 10MB per image</p>
        <p>• You can select multiple images at once</p>
      </div>
    </div>
  )
}
