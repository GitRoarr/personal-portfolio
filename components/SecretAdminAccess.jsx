"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import AdminLogin from "./AdminLogin"

export default function SecretAdminAccess() {
  const { isAdmin, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key.toLowerCase() === "a") {
        setShowLogin(true)
      }

      if (e.key === "Escape") {
        setShowLogin(false)
      }

      // Ctrl + Shift + L to logout
      if (isAdmin && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault()
        logout()
        alert("Admin logged out via keyboard shortcut 🔒")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAdmin, logout])

  return (
    <AnimatePresence>
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </AnimatePresence>
  )
}
