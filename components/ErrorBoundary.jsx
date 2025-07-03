"use client"

import { Component } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center p-8">
            <AlertTriangle className="text-red-500 mx-auto mb-4" size={64} />
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">Don't worry, this happens sometimes. Let's get you back on track!</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-6 py-3 bg-spotify-green text-white rounded-lg hover:bg-spotify-green/90 transition-colors mx-auto"
            >
              <RefreshCw size={20} />
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
