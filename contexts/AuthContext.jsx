"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const ADMIN_EMAIL = "girmaenkuchille@gmail.com"

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 Auth state changed:", user ? "Logged in" : "Logged out")
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    if (!auth) {
      return { success: false, error: "Authentication not available" }
    }

    try {
      setLoading(true)
      console.log("🔑 Attempting login for:", email)

      const result = await signInWithEmailAndPassword(auth, email, password)

      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth)
        throw new Error("Access denied. Admin only.")
      }

      console.log("✅ Login successful")
      return { success: true, user: result.user }
    } catch (error) {
      console.error("❌ Login error:", error)

      let errorMessage = error.message
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email"
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password"
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address"
      }

      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    if (!auth) return

    try {
      console.log("🚪 Logging out...")
      await signOut(auth)
      console.log("✅ Logout successful")
    } catch (error) {
      console.error("❌ Logout error:", error)
    }
  }

  const isAdmin = user?.email === ADMIN_EMAIL

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
