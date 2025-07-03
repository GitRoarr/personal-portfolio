"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { blogService, analyticsService } from "@/lib/firestore"
import { Calendar, Clock, User, ArrowRight, Tag, ExternalLink } from "lucide-react"

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

  // Enhanced handleReadMore with Icons8 icons instead of emojis
  const handleReadMore = (blog) => {
    const blogWindow = window.open("", "_blank", "width=900,height=700,scrollbars=yes,resizable=yes")
    if (blogWindow) {
      const featuredImage = blog.image || (blog.images && blog.images.length > 0 ? blog.images[0] : null)
      const additionalImages = blog.images && blog.images.length > 1 ? blog.images.slice(1) : []

      blogWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${blog.title} | Girma's Blog</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="icon" href="https://img.icons8.com/fluency/48/blog.png">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.7;
              background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
              color: #e5e5e5;
              min-height: 100vh;
              overflow-x: hidden;
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              position: relative;
            }
            
            .close-btn {
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #22c55e, #16a34a);
              color: white;
              border: none;
              padding: 12px 20px;
              border-radius: 50px;
              cursor: pointer;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
              transition: all 0.3s ease;
              z-index: 1000;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .close-btn:hover {
              background: linear-gradient(135deg, #16a34a, #15803d);
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
            }
            
            .featured-image {
              width: 100%;
              height: 300px;
              object-fit: cover;
              border-radius: 20px;
              margin-bottom: 30px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
              transition: transform 0.3s ease;
              cursor: pointer;
            }
            
            .featured-image:hover {
              transform: scale(1.02);
            }
            
            .header {
              border-bottom: 2px solid #22c55e;
              padding-bottom: 25px;
              margin-bottom: 35px;
              position: relative;
            }
            
            .category-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(34, 197, 94, 0.2);
              color: #22c55e;
              padding: 8px 16px;
              border-radius: 25px;
              font-size: 0.85rem;
              font-weight: 600;
              margin-bottom: 15px;
              border: 1px solid rgba(34, 197, 94, 0.3);
            }
            
            .title {
              font-size: 2.8rem;
              font-weight: 800;
              margin-bottom: 15px;
              background: linear-gradient(135deg, #22c55e, #16a34a);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              line-height: 1.2;
            }
            
            .meta {
              display: flex;
              flex-wrap: wrap;
              gap: 25px;
              color: #9ca3af;
              font-size: 0.95rem;
              align-items: center;
            }
            
            .meta-item {
              display: flex;
              align-items: center;
              gap: 8px;
              background: rgba(255, 255, 255, 0.05);
              padding: 8px 12px;
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .meta-icon {
              width: 18px;
              height: 18px;
              opacity: 0.8;
            }
            
            .content {
              font-size: 1.15rem;
              line-height: 1.8;
              white-space: pre-wrap;
              margin-bottom: 40px;
              text-align: justify;
            }
            
            .content p {
              margin-bottom: 20px;
            }
            
            .additional-images {
              margin: 40px 0;
            }
            
            .additional-images h3 {
              color: #22c55e;
              font-size: 1.5rem;
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .section-icon {
              width: 24px;
              height: 24px;
            }
            
            .image-gallery {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
              margin-bottom: 30px;
            }
            
            .gallery-image {
              width: 100%;
              height: 200px;
              object-fit: cover;
              border-radius: 15px;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
              transition: all 0.3s ease;
              cursor: pointer;
            }
            
            .gallery-image:hover {
              transform: translateY(-5px) scale(1.02);
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            }
            
            .tags {
              margin-top: 40px;
              padding-top: 25px;
              border-top: 1px solid #374151;
            }
            
            .tags h3 {
              color: #22c55e;
              font-size: 1.3rem;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .tag {
              display: inline-block;
              background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
              color: #22c55e;
              padding: 8px 16px;
              border-radius: 25px;
              font-size: 0.85rem;
              font-weight: 500;
              margin-right: 10px;
              margin-bottom: 10px;
              border: 1px solid rgba(34, 197, 94, 0.3);
              transition: all 0.3s ease;
            }
            
            .tag:hover {
              background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.2));
              transform: translateY(-2px);
            }
            
            .footer {
              margin-top: 50px;
              padding-top: 25px;
              border-top: 1px solid #374151;
              text-align: center;
              color: #9ca3af;
            }
            
            .author-info {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 15px;
              margin-bottom: 20px;
              padding: 20px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 15px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .author-avatar {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: linear-gradient(135deg, #22c55e, #16a34a);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              color: white;
              font-weight: bold;
            }
            
            .scroll-indicator {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              z-index: 999;
            }
            
            .scroll-progress {
              height: 100%;
              background: linear-gradient(90deg, #22c55e, #16a34a);
              width: 0%;
              transition: width 0.1s ease;
            }
            
            @media (max-width: 768px) {
              .container {
                padding: 15px;
              }
              
              .title {
                font-size: 2.2rem;
              }
              
              .meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
              }
              
              .close-btn {
                top: 10px;
                right: 10px;
                padding: 10px 16px;
              }
              
              .featured-image {
                height: 200px;
              }
              
              .image-gallery {
                grid-template-columns: 1fr;
              }
            }
            
            .image-modal {
              display: none;
              position: fixed;
              z-index: 2000;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.9);
              backdrop-filter: blur(10px);
            }
            
            .modal-content {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              max-width: 90%;
              max-height: 90%;
              border-radius: 15px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .modal-close {
              position: absolute;
              top: 15px;
              right: 25px;
              color: white;
              font-size: 35px;
              font-weight: bold;
              cursor: pointer;
              z-index: 2001;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .modal-close:hover {
              background: rgba(0, 0, 0, 0.8);
            }
          </style>
        </head>
        <body>
          <!-- Scroll Progress Indicator -->
          <div class="scroll-indicator">
            <div class="scroll-progress" id="scrollProgress"></div>
          </div>
          
          <!-- Close Button -->
          <button class="close-btn" onclick="window.close()">
            <img src="https://img.icons8.com/fluency/16/delete-sign.png" alt="Close" />
            <span>Close</span>
          </button>
          
          <div class="container">
            ${
              featuredImage
                ? `
              <img 
                src="${featuredImage}" 
                alt="${blog.title}" 
                class="featured-image"
                onclick="openImageModal(this.src)"
                onerror="this.style.display='none'"
              />
            `
                : ""
            }
            
            <div class="header">
              ${
                blog.category
                  ? `<div class="category-badge">
                      <img src="https://img.icons8.com/fluency/16/folder.png" alt="Category" class="meta-icon" />
                      ${blog.category}
                    </div>`
                  : '<div class="category-badge"><img src="https://img.icons8.com/fluency/16/blog.png" alt="Blog" class="meta-icon" />Blog Post</div>'
              }
              
              <h1 class="title">${blog.title}</h1>
              
              <div class="meta">
                <div class="meta-item">
                  <img src="https://img.icons8.com/fluency/18/calendar.png" alt="Date" class="meta-icon" />
                  <span>${formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>
                <div class="meta-item">
                  <img src="https://img.icons8.com/3d-fluency/94/writer-male.png" alt="Author" class="meta-icon" />
                  <span>${blog.author || "Girma Enkuchile"}</span>
                </div>
                <div class="meta-item">
                  <img src="https://img.icons8.com/fluency/18/clock.png" alt="Reading time" class="meta-icon" />
                  <span>${blog.readTime || getReadingTime(blog.content)}</span>
                </div>
                ${
                  blog.featured
                    ? `
                  <div class="meta-item" style="background: rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.3);">
                    <img src="https://img.icons8.com/fluency/18/star.png" alt="Featured" class="meta-icon" />
                    <span>Featured</span>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
            
            <div class="content">${blog.content || "Content not available."}</div>
            
            ${
              additionalImages.length > 0
                ? `
              <div class="additional-images">
                <h3>
                  <img src="https://img.icons8.com/fluency/24/image.png" alt="Images" class="section-icon" />
                  <span>Additional Images</span>
                </h3>
                <div class="image-gallery">
                  ${additionalImages
                    .map(
                      (img, index) => `
                    <img 
                      src="${img}" 
                      alt="Blog image ${index + 2}" 
                      class="gallery-image"
                      onclick="openImageModal(this.src)"
                      onerror="this.style.display='none'"
                    />
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
            
            ${
              blog.tags && blog.tags.length > 0
                ? `
              <div class="tags">
                <h3>
                  <img src="https://img.icons8.com/fluency/24/tags.png" alt="Tags" class="section-icon" />
                  <span>Tags</span>
                </h3>
                ${blog.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              </div>
            `
                : ""
            }
            
            <div class="footer">
              <div class="author-info">
                <div class="author-avatar">G</div>
                <div>
                  <div style="font-weight: 600; color: #22c55e; margin-bottom: 5px;">
                    ${blog.author || "Girma Enkuchile"}
                  </div>
                  <div style="font-size: 0.9rem;">
                    Full Stack Developer & Tech Enthusiast
                  </div>
                </div>
              </div>
              
              <p style="font-size: 0.9rem; opacity: 0.8;">
                Thanks for reading! 🚀 Connect with me on 
                <a href="https://github.com/GitRoarr" target="_blank" style="color: #22c55e; text-decoration: none;">GitHub</a> or 
                <a href="https://www.linkedin.com/in/girma-enkuchile-714725338/" target="_blank" style="color: #22c55e; text-decoration: none;">LinkedIn</a>
              </p>
            </div>
          </div>
          
          <!-- Image Modal -->
          <div id="imageModal" class="image-modal" onclick="closeImageModal()">
            <span class="modal-close" onclick="closeImageModal()">&times;</span>
            <img class="modal-content" id="modalImage">
          </div>
          
          <script>
            // Scroll progress indicator
            window.addEventListener('scroll', function() {
              const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrollProgress = (scrollTop / scrollHeight) * 100;
              document.getElementById('scrollProgress').style.width = scrollProgress + '%';
            });
            
            // Image modal functionality
            function openImageModal(src) {
              const modal = document.getElementById('imageModal');
              const modalImg = document.getElementById('modalImage');
              modal.style.display = 'block';
              modalImg.src = src;
              document.body.style.overflow = 'hidden';
            }
            
            function closeImageModal() {
              const modal = document.getElementById('imageModal');
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
            }
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
              if (event.key === 'Escape') {
                closeImageModal();
              }
            });
            
            // Smooth scrolling for better UX
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // Add some interactive effects
            document.querySelectorAll('.gallery-image, .featured-image').forEach(img => {
              img.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1)';
              });
              
              img.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1)';
              });
            });
          </script>
        </body>
        </html>
      `)
      blogWindow.document.close()
    }

    // Track analytics
    analyticsService.trackView(`blog-${blog.id}`)
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
            <img src="https://img.icons8.com/fluency/64/blog.png" alt="Blog error" className="mx-auto opacity-50" />
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

          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-6xl mb-4"
            >
              <img src="https://img.icons8.com/fluency/64/blog.png" alt="No blogs" className="mx-auto" />
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
              <img src="https://img.icons8.com/fluency/24/star.png" alt="Featured" className="w-6 h-6" />
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
                  className={`${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer`}
                  onClick={() => handleReadMore(blog)}
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
                      <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${isDark ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-purple-500/10 text-purple-600 border border-purple-500/30"}`}
                      >
                        <img src="https://img.icons8.com/fluency/16/star.png" alt="Featured" className="w-4 h-4" />
                        <span>Featured</span>
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
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReadMore(blog)
                        }}
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
                <img src="https://img.icons8.com/fluency/24/blog.png" alt="Blog" className="w-6 h-6" />
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
                  className={`${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                  onClick={() => handleReadMore(blog)}
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
                      <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} className="text-white" />
                      </div>
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
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReadMore(blog)
                        }}
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
