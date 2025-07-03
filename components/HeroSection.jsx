import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { useTheme } from "@/contexts/ThemeContext"
import { MoveRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const { isDark } = useTheme()

  const themeColor = isDark ? "#1DB954" : "#B461DD"
  const themeGradient = isDark
    ? "from-spotify-green via-green-400 to-emerald-400"
    : "from-purple-400 via-purple-500 to-purple-600"

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const name = "GIRMA"

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                <span>Hi, I am </span>
                <div className="inline-block">
                  {name.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{
                        scale: 1.2,
                        color: themeColor,
                        textShadow: `0 0 20px ${themeColor}`,
                      }}
                      className={`inline-block bg-gradient-to-r bg-clip-text text-transparent cursor-pointer ${themeGradient}`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <div className={`text-2xl md:text-4xl ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
                <TypeAnimation
                  sequence={[
                    "Web Developer 💻", 2000,
                    "Full Stack Engineer 🚀", 2000,
                    "Mobile App Developer 📱", 2000,
                    "React & Next.js Expert ⚛️", 2000,
                    "Backend Developer (Node.js) 🛠️", 2000,
                    "Firebase & MongoDB Specialist 🔥", 2000,
                    "UI/UX Focused Developer 🎨", 2000,
                    "Cross-Platform App Creator 🌐", 2000,
                    "Performance Optimizer ⚡", 2000,
                    "Reliable Freelance Partner 🤝", 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className={`text-xl max-w-2xl leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                I am a Software Engineer from Addis Ababa, Ethiopia 🇪🇹 who builds modern web and mobile applications using powerful tools and technologies. I bring ideas to life with clean design and smooth performance.
              </motion.p>
            </motion.div>

           <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.2, duration: 0.8 }}
  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
>
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${themeColor}4D` }}
    whileTap={{ scale: 0.95 }}
    whileFocus={{ scale: 1.1, boxShadow: `0 0 15px 5px ${themeColor}AA` }}
    tabIndex={0}
    className={`px-8 py-4 font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
      isDark
        ? "bg-spotify-green text-white hover:bg-green-800 focus:ring-4 focus:ring-spotify-green"
        : "bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-400"
    }`}
  >
    <a href="#projects" className="flex items-center space-x-2">
      <span>View My Work</span>
      <MoveRight size={20} strokeWidth={2.2} />
    </a>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    whileFocus={{ scale: 1.1, boxShadow: `0 0 15px 5px ${themeColor}AA` }}
    tabIndex={0}
    className={`px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 focus:outline-none ${
      isDark
        ? "border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white focus:ring-4 focus:ring-spotify-green"
        : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-4 focus:ring-purple-400"
    }`}
  >
    <a href="#contact" className="flex items-center space-x-2">
      <span>Let us Talk</span>
      <img
        src="https://img.icons8.com/fluency/24/chat--v3.png"
        alt="Chat Icon"
        width={20}
        height={20}
      />
    </a>
  </motion.button>
</motion.div>


            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: "https://img.icons8.com/fluency/48/github.png", href: "https://github.com/GitRoarr", label: "GitHub" },
                { icon: "https://img.icons8.com/fluency/48/linkedin.png", href: "https://www.linkedin.com/in/girma-enkuchile-714725338/", label: "LinkedIn" },
                { icon: "https://img.icons8.com/fluency/48/telegram-app.png", href: "https://t.me/mariamin211", label: "Telegram" },
                { icon: "https://img.icons8.com/fluency/48/mail.png", href: "mailto:girmaenkuchille@gmail.com", label: "Email" },
                { icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-upwork-a-global-freelancing-platform-where-professionals-connect-and-collaborate-remotely-logo-shadow-tal-revivo.png", href: "https://www.upwork.com/freelancers/~01ab8a80d58924b591", label: "Upwork" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                  className={`relative hover:shadow-lg transition-all duration-300 group ${
                    isDark ? "text-white hover:text-spotify-green" : "text-gray-700 hover:text-purple-600"
                  }`}
                  title={social.label}
                >
                  <img src={social.icon} alt={social.label} width={28} height={28} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {["💻", "⚛️", "📱", "🚀", "⚡", "🎨"].map((icon, index) => (
                <motion.div
                  key={icon}
                  className="absolute text-2xl"
                  style={{ top: "50%", left: "50%" }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((index * 60 * Math.PI) / 180) * 120,
                    y: Math.sin((index * 60 * Math.PI) / 180) * 120,
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {icon}
                  </motion.span>
                </motion.div>
              ))}

              <motion.div
                className="relative w-80 h-80"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 rounded-full p-2 bg-gradient-to-r ${themeGradient}`}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                    <img src="/me.jpg" alt="Girma" className="w-full h-full object-cover rounded-full" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 text-4xl"
                >
                  👋
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 text-3xl"
                >
                  🇪🇹
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Down Arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
            isDark ? "text-spotify-green" : "text-purple-600"
          } text-3xl`}
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}