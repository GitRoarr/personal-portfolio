import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../contexts/ThemeContext"
import { AuthProvider } from "../contexts/AuthContext"
import ErrorBoundary from "../components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Girma - Full Stack Developer",
  description:
    "Professional portfolio of Girma, a skilled full-stack developer specializing in modern web technologies.",
  keywords: "full stack developer, web developer, React, Next.js, Node.js, portfolio",
  authors: [{ name: "Girma" }],
  creator: "Girma",
  publisher: "Girma",
  metadataBase: new URL("https://codegirma.com"),
  openGraph: {
    title: "Girma - Full Stack Developer",
    description:
      "Professional portfolio of Girma, a skilled full-stack developer specializing in modern web technologies.",
    url: "https://codegirma.com",
    siteName: "Girma Portfolio",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: "Girma - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Girma - Full Stack Developer",
    description:
      "Professional portfolio of Girma, a skilled full-stack developer specializing in modern web technologies.",
    images: ["/me.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
