"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { resumeService, analyticsService } from "@/lib/firestore";

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" }); // Trigger 50px early
  const { isDark } = useTheme();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    loadResumeData();
  }, []); // Empty dependency array to run once on mount

  const loadResumeData = async () => {
    try {
      const data = await resumeService.getLatest();
      console.log(
        "Fetched resume data at",
        new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
        ":",
        data
      );
      setResumeData(data || {
        downloadUrl: "https://drive.google.com/file/d/1m7Cfo1fDO3B6iR91h6SHxTsgF3Kh-VTj/view?usp=drive_link",
        lastUpdated: "2024-01-15",
        version: "v2.1",
        description: "Full Stack Developer Resume - Latest version with updated projects and skills",
      });
    } catch (error) {
      console.error(
        "Error loading resume at",
        new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }),
        ":",
        error
      );
      setResumeData({
        downloadUrl: "https://drive.google.com/file/d/1m7Cfo1fDO3B6iR91h6SHxTsgF3Kh-VTj/view?usp=drive_link",
        lastUpdated: "2024-01-15",
        version: "v2.1",
        description: "Full Stack Developer Resume - Latest version with updated projects and skills",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (resumeData?.downloadUrl) {
      try {
        await analyticsService.trackDownload("Girma_Resume.pdf");
        setDownloadCount((prev) => prev + 1);

        const fileIdMatch = resumeData.downloadUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        const fileId = fileIdMatch ? fileIdMatch[1] : null;
        const downloadUrl = fileId
          ? `https://drive.google.com/uc?export=download&id=${fileId}`
          : resumeData.downloadUrl;
        window.open(downloadUrl, "_blank");
      } catch (error) {
        console.error("Error during download at", new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" }), ":", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    if (dateString.toDate) {
      return dateString.toDate().toLocaleDateString();
    }
    return new Date(dateString).toLocaleDateString();
  };

  useEffect(() => {
    console.log(
      "isInView changed to:",
      isInView,
      "at",
      new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
    );
  }, [isInView]);

  if (loading) {
    return (
      <section className={`py-20 ${isDark ? "bg-black" : "bg-gray-50/30"} backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-spotify-green font-medium">Loading resume...</p>
        </div>
      </section>
    );
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
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        >
        
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute top-32 right-16 text-3xl opacity-20"
        >
          💼
        </motion.div>
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
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
      <h2 className="text-8xl md:text-6xl font-bold text-white mb-6">My Resume</h2>

          <motion.p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto mb-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Download my latest professional resume with all my skills, experience, and achievements!
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-spotify-green mx-auto rounded-full"
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
            className="absolute inset-0 bg-spotify-green/20 rounded-2xl blur-lg"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <motion.div
            className={`relative ${isDark ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-sm rounded-2xl border ${
              isDark ? "border-gray-800" : "border-gray-200"
            } p-8 shadow-2xl`}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px rgba(29, 185, 84, 0.3)",
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
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative w-24 h-24 bg-spotify-green/20 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-spotify-green/20 to-transparent"
                  />
                  <span className="text-5xl relative z-10">📜</span>
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className={`text-2xl lg:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
                    animate={{
                      color: isDark
                        ? ["#ffffff", "#1db954", "#ffffff"]
                        : ["#111827", "#1db954", "#111827"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
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
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1"
                    >
                      📅 Last updated: {formatDate(resumeData?.updatedAt || resumeData?.lastUpdated)}
                    </motion.span>
                    <span>•</span>
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="flex items-center gap-1"
                    >
                      🏷️ {resumeData?.version}
                    </motion.span>
                    {downloadCount > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-spotify-green font-medium">📥 {downloadCount} downloads</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleDownload}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(29, 185, 84, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-spotify-green to-green-900 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden min-w-[200px] justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-spotify-green opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
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
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
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
            transition={{ duration: 5, repeat: Infinity }}
          >
            Ready to work together? Let's build something amazing 🌟
          </motion.p>
          <motion.div
            animate={{
              rotate: [80, 15, -15, 80],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl"
          >
            🎉
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}