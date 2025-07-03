"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import emailjs from "@emailjs/browser"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { isDark } = useTheme()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const SERVICE_ID = "service_eb18xjo"
  const CONTACT_TEMPLATE_ID = "template_iogkt6s"
  const AUTO_REPLY_TEMPLATE_ID = "template_xfq5dc6"
  const PUBLIC_KEY = "CCwm-uQhxGF_dJ06x"

  useEffect(() => {
    emailjs.init(PUBLIC_KEY)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const contactEmailPromise = emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, {
        name: formData.name,
        from_email: formData.email,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      })

      const autoReplyPromise = emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, {
        to_name: formData.name,
        to_email: formData.email,
        email: formData.email,
        from_name: "Girma Enkuchile",
        from_email: "girmaenkuchille@gmail.com",
        reply_to: "girmaenkuchille@gmail.com",
        user_message: formData.message,
      })

      await Promise.all([contactEmailPromise, autoReplyPromise])

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const headerColor = isDark ? "white" : "#1E293B"
  const btnBg = isDark ? "#1DB954" : "bg-gray-100"
  const btnText = isDark ? "white" : "#1E293B"
  const btnHoverBg = isDark ? "#17a74a" : "#d1d5db"

  return (
    <section
      id="contact"
      className={`py-20 ${isDark ? "bg-black" : "bg-white"} backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: headerColor }}
          >
            Let us Work Together
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Ready to bring your ideas to life? Let us create something amazing🌟
          </p>
          <div
            className="w-24 h-1 mx-auto rounded-full mt-6"
            style={{ backgroundColor: isDark ? "#1DB954" : "#1E293B" }}
          ></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Get In Touch</h3>
              <p className={isDark ? "text-gray-300 text-lg leading-relaxed mb-8" : "text-gray-700 text-lg leading-relaxed mb-8"}>
                I am always open to discussing new opportunities and creative projects
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: "https://img.icons8.com/fluency/48/mail.png",
                  title: "Email",
                  value: "girmaenkuchille@gmail.com",
                  href: "mailto:girmaenkuchille@gmail.com",
                },
                {
                  icon: "https://img.icons8.com/fluency/48/telegram-app.png",
                  title: "Telegram",
                  value: "@mariamin211",
                  href: "https://t.me/mariamin211",
                },
                {
                  icon: "https://img.icons8.com/fluency/48/marker.png",
                  title: "Location",
                  value: "Addis Ababa, Ethiopia 🇪🇹",
                  href: "#",
                },
              ].map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : "_self"}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 hover:scale-105
                    ${isDark
                      ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      : "bg-gray-100 border-gray-300 hover:border-gray-400"
                    }`}
                >
                  <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700/50 text-purple-400" : "bg-purple-200 text-purple-700"}`}>
                    <img src={info.icon} alt={info.title} width={24} height={24} />
                  </div>
                  <div>
                    <h4 className={isDark ? "text-white font-medium" : "text-gray-900 font-medium"}>{info.title}</h4>
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className={`relative p-8 rounded-2xl border backdrop-blur-sm
              ${isDark ? "bg-slate-900/80 border-slate-700" : "bg-white/90 border-gray-300"}`}>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className={`mb-6 p-4 rounded-lg border ${
                    submitStatus === "success"
                      ? isDark
                        ? "bg-green-600/20 border-green-600 text-green-200"
                        : "bg-green-200 border-green-300 text-green-700"
                      : isDark
                        ? "bg-red-600/20 border-red-600 text-red-300"
                        : "bg-red-200 border-red-300 text-red-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {submitStatus === "success" ? (
                      <>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                          ✅
                        </motion.div>
                        <span className="font-medium">Message sent successfully!</span>
                      </>
                    ) : (
                      <>
                        <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                          ❌
                        </motion.div>
                        <span className="font-medium">Failed to send message. Please try again.</span>
                      </>
                    )}
                  </div>
                  {submitStatus === "success" && (
                    <div className="text-sm mt-2 space-y-1">
                      <p className="opacity-90">Your Message delivered to Girma</p>
                      <p className="opacity-80">I'll get back to you soon! </p>
                    </div>
                  )}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-full border placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2
                      ${isDark
                        ? "bg-slate-800 border-slate-600 text-white focus:border-spotify-green focus:ring-spotify-green"
                        : "bg-gray-100 border-gray-300 text-gray-900 focus:border-purple-600 focus:ring-purple-600"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-full border placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2
                      ${isDark
                        ? "bg-slate-800 border-slate-600 text-white focus:border-spotify-green focus:ring-spotify-green"
                        : "bg-gray-100 border-gray-300 text-gray-900 focus:border-purple-600 focus:ring-purple-600"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-3xl border placeholder-gray-400 resize-none transition-all duration-300 focus:outline-none focus:ring-2
                      ${isDark
                        ? "bg-slate-800 border-slate-600 text-white focus:border-spotify-green focus:ring-spotify-green"
                        : "bg-gray-100 border-gray-300 text-gray-900 focus:border-purple-600 focus:ring-purple-600"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    placeholder="Tell me about your project, ideas, or just say hello! 👋"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center space-x-2 px-8 py-4 font-semibold rounded-full transition-all duration-300
                    ${isDark
                      ? "bg-spotify-green text-white hover:bg-green-800 focus:ring-4 focus:ring-spotify-green"
                      : "bg-gray-100 border border-gray-300 text-gray-900 focus:border-purple-600 focus:ring-purple-600 hover:bg-gray-200"
                    }
                    ${isSubmitting || !formData.name || !formData.email || !formData.message
                      ? "opacity-50 cursor-not-allowed"
                      : "shadow-lg hover:shadow-xl"
                    }`}
                  onMouseEnter={e => {
                    if (!isSubmitting && !isDark) e.currentTarget.style.backgroundColor = btnHoverBg
                  }}
                  onMouseLeave={e => {
                    if (!isSubmitting && !isDark) e.currentTarget.style.backgroundColor = ""
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <img
                          src="https://img.icons8.com/fluency/48/settings.png"
                          alt="Loading"
                          width={20}
                          height={20}
                        />
                      </motion.div>
                      <span>Sending Messages...</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://img.icons8.com/fluency/48/filled-sent.png"
                        alt="Send"
                        width={20}
                        height={20}
                      />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
