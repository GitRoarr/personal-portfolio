import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Girma | Full Stack Developer Portfolio",
  description:
    "Explore the portfolio of Girma, a passionate Full Stack Developer skilled in React.js, Next.js, Node.js, and modern web technologies.",
  keywords:
    "Girma, Full Stack Developer, React Developer, Next.js Developer, Web Developer, Portfolio, JavaScript, Node.js, Firebase",
  authors: [{ name: "Girma Enkuchile Belayhun", url: "https://github.com/GitRoarr" }],
  creator: "Girma Enkuchile Belayhun",
  publisher: "Girma",
  openGraph: {
    title: "Girma | Full Stack Developer",
    description:
      "portfolio of Girma showcasing modern full stack web development projects using React, Next.js, Node.js, and more.",
    url: "https://your-firebase-hosting-url.web.app", // Replace with your actual hosted URL
    siteName: "Girma Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://your-firebase-hosting-url.web.app/og-image.png", // Optional OG image
        width: 1200,
        height: 630,
        alt: "Girma Portfolio Preview",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  generator: "Next.js v13 + Firebase Hosting",
  metadataBase: new URL("https://your-firebase-hosting-url.web.app"), // important for canonical links
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
