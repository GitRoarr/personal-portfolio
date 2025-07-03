"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import AdminLogin from "./AdminLogin"
import Icons8Icon from "./Icons8Icon"

export default function AdminControls({ onAddProject, onEditProject, onDeleteProject }) {
  const { isAdmin, logout } = useAuth()
  const { isDark } = useTheme()
  const [showLogin, setShowLogin] = useState(false)

  if (!isAdmin) {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLogin(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-spotify-green/20 text-spotify-green rounded-full border border-spotify-green/30 hover:bg-spotify-green/30 transition-colors"
        >
          <Icons8Icon name="shield" size={16} />
          <span>Admin Login</span>
        </motion.button>

        <AnimatePresence>{showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}</AnimatePresence>
      </>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddProject}
        className="flex items-center space-x-2 px-4 py-2 bg-spotify-green text-white rounded-full hover:bg-spotify-green/90 transition-colors"
      >
        <Icons8Icon name="plus" size={16} />
        <span>Add Project</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => (window.location.href = "/admin")}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
      >
        <Icons8Icon name="settings" size={16} />
        <span>Admin Panel</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className={`flex items-center space-x-2 px-4 py-2 border ${isDark ? "border-gray-600 rounded-r-full text-gray-300 hover:bg-gray-700/50" : "border-gray-300 text-gray-700 hover:bg-gray-100/50"} rounded-lg transition-colors`}
      >
        <Icons8Icon name="logout" size={16} />
        <span>Logout</span>
      </motion.button>

      <div className="flex items-center space-x-2 px-3 py-1 bg-spotify-green/20 rounded-full border border-spotify-green/30">
        <Icons8Icon name="shield" className="text-spotify-green" size={14} />
        <span className="text-spotify-green text-sm font-medium">Admin Mode</span>
      </div>
    </div>
  )
}
