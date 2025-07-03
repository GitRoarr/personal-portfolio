"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Mail, LogIn, Loader } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"

export default function AdminLogin({ onClose }) {
  const { login } = useAuth()
  const { isDark } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        onClose()
        setFormData({ email: "", password: "" })
      } else {
        if (result.error?.includes("auth/invalid-credential")) {
          setError("❌ Your admin credentials are incorrect. Access denied like a vault locked by fate.")
        } else {
          setError(result.error || "An unexpected error occurred. Please try again.")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
        className={`${isDark ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-md p-8 rounded-2xl border ${isDark ? "border-gray-800" : "border-gray-200"} max-w-md w-full`}
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-green- rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-400/30"
          >
            <Lock className="text-white" size={24} />
          </motion.div>
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
            Admin Login 🔐
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
            Only the rightful portfolio owner may enter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Admin email address"
              required
              className={`w-full rounded-full pl-10 pr-4 py-3 ${isDark ? "bg-gray-800/50 border-gray-700 text-white" : "bg-gray-100/50 border-gray-300 text-gray-900"} border  placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors`}
              autoFocus
            />
          </div>

          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Admin password"
              required
              className={`w-full rounded-full pl-10 pr-12 py-3 ${isDark ? "bg-gray-800/50 border-gray-700 text-white" : "bg-gray-100/50 border-gray-300 text-gray-900"} border  placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center bg-red-100/60 p-3 rounded-lg border border-red-200"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full py-3 bg-gradient-to-r from-green-600 via-green-500 to-green-700 text-white font-semibold hover:from-green-700 hover:via-green-600 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md hover:shadow-green-500/30"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In as Admin</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className={`text-sm ${isDark ? "text-red-400" : "text-red-700"} font-semibold`}>
           🔑Admin Access Only !
          </p>
          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            This section is locked to protect your creative identity. Only the real owner may enter.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
