import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { resumeService, analyticsService } from "@/lib/firestore"

export default function ResumeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" })
  const { isDark } = useTheme()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloadCount, setDownloadCount] = useState(0)

  useEffect(() => {
    loadResumeData()
  }, [])

  const loadResumeData = async () => {
    try {
      const data = await resumeService.getLatest()
      console.log(
        "Fetched resume data at",
        new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
        ":",
        data,
      )
      setResumeData(
        data || {
          downloadUrl: "https://drive.google.com/file/d/1m7Cfo1fDO3B6iR91h6SHxTsgF3Kh-VTj/view?usp=drive_link",
          lastUpdated: "2024-01-15",
          version: "v2.1",
          description: "Full Stack Developer Resume - Latest version with updated projects and skills",
        },
      )
    } catch (error) {
      console.error(
        "Error loading resume at",
        new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
        ":",
        error,
      )
      setResumeData({
        downloadUrl: "https://drive.google.com/file/d/1m7Cfo1fDO3B6iR91h6SHxTsgF3Kh-VTj/view?usp=drive_link",
        lastUpdated: "2024-01-15",
        version: "v2.1",
        description: "Full Stack Developer Resume - Latest version with updated projects and skills",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (resumeData?.downloadUrl) {
      try {
        await analyticsService.trackDownload("Girma_Resume.pdf")
        setDownloadCount((prev) => prev + 1)

        const fileIdMatch = resumeData.downloadUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)
        const fileId = fileIdMatch ? fileIdMatch[1] : null
        const downloadUrl = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : resumeData.downloadUrl
        window.open(downloadUrl, "_blank")
      } catch (error) {
        console.error(
          "Error during download at",
          new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
          ":",
          error,
        )
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Recently"
    if (dateString.toDate) {
      return dateString.toDate().toLocaleDateString()
    }
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <section className={`py-20 ${isDark ? "bg-black" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className={`w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4 ${
              isDark ? "border-green-500" : "border-purple-500"
            }`}
          />
          <p className={`font-medium ${isDark ? "text-green-500" : "text-purple-500"}`}>Loading resume...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="resume"
      className={`py-20 ${isDark ? "bg-black" : "bg-gray-50/30"} backdrop-blur-3xl relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute top-32 right-16 text-3xl opacity-20"
        >
          💼
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute bottom-20 left-20 text-2xl opacity-20"
        >
          ⭐
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-6xl md:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>My Resume</h2>

          <motion.p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto mb-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Download my latest professional resume with all my skills, experience, and achievements!
          </motion.p>
          <motion.div
            className={`w-24 h-1 mx-auto rounded-full ${isDark ? "bg-green-500" : "bg-purple-500"}`}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className={`absolute inset-0 rounded-2xl blur-lg ${isDark ? "bg-green-500/20" : "bg-purple-500/20"}`}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />

          <motion.div
            className={`relative ${isDark ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-sm rounded-2xl border ${
              isDark ? "border-gray-800" : "border-gray-200"
            } p-8 shadow-2xl`}
            whileHover={{
              y: -5,
              boxShadow: isDark ? "0 25px 50px rgba(34, 197, 94, 0.3)" : "0 25px 50px rgba(139, 92, 246, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-6 flex-1">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden ${
                    isDark ? "bg-green-500/20" : "bg-purple-500/20"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent ${
                      isDark ? "via-green-500/20" : "via-purple-500/20"
                    }`}
                  />
                  <span className="text-5xl relative z-10">📜</span>
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className={`text-2xl lg:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                    animate={{
                      color: isDark ? ["#ffffff", "#22c55e", "#ffffff"] : ["#111827", "#8b5cf6", "#111827"],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    My Resume
                  </motion.h3>
                  <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-3 text-lg`}>
                    {resumeData?.description ||
                      "Full Stack Developer Resume - Latest version with updated projects and skills"}{" "}
                  </p>
                  <div
                    className={`flex flex-wrap items-center gap-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="flex items-center gap-1"
                    >
                      📅 Last updated: {formatDate(resumeData?.updatedAt || resumeData?.lastUpdated)}
                    </motion.span>
                    <span>•</span>
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      className="flex items-center gap-1"
                    >
                      🏷️ {resumeData?.version}
                    </motion.span>
                    {downloadCount > 0 && (
                      <>
                        <span>•</span>
                        <span className={`font-medium ${isDark ? "text-green-400" : "text-purple-600"}`}>
                          📥 {downloadCount} downloads
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleDownload}
                whileHover={{
                  scale: 1.05,
                  boxShadow: isDark ? "0 15px 35px rgba(34, 197, 94, 0.4)" : "0 15px 35px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex items-center space-x-3 px-8 py-4 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden min-w-[200px] justify-center ${
                  isDark
                    ? "bg-gradient-to-r from-green-500 to-green-700"
                    : "bg-gradient-to-r from-purple-500 to-pink-600"
                }`}
              >
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${
                    isDark
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : "bg-gradient-to-r from-purple-400 to-pink-500"
                  }`}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="relative z-10"
                >
                  <i className="fas fa-download text-xl"></i>
                </motion.div>

                <motion.span
                  className="relative z-10 text-lg rounded-full"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  Download Resume
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}
            animate={{
              y: [0, -5, -5],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Ready to work together? Let's build something amazing 🌟
          </motion.p>
          <motion.div
            animate={{
              rotate: [80, 15, -15, 80],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="text-6xl"
          >
            🎉
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}