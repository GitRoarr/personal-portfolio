"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"
import { AuthProvider } from "@/contexts/AuthContext"
import ErrorBoundary from "@/components/ErrorBoundary"
import AnimatedBackground from "@/components/AnimatedBackground"
import FloatingIcons from "@/components/FloatingIcons"
import FloatingHireMe from "@/components/FloatingHireMe"
import SecretAdminAccess from "@/components/SecretAdminAccess"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import ProjectsSection from "@/components/ProjectsSection"
import BlogSection from "@/components/BlogSection"
import ResumeSection from "@/components/ResumeSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen relative">
            <AnimatedBackground />
            <FloatingIcons />
            <FloatingHireMe />

            <SecretAdminAccess />

            <Navbar />
            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <BlogSection />
              <ResumeSection />
              <ContactSection />
            </main>

            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
