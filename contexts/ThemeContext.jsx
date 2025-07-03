"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")
  const [isLoading, setIsLoading] = useState(true)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "dark"
      setTheme(savedTheme)
    }
    setIsLoading(false)
  }, [])

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLoading,
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  )
}
