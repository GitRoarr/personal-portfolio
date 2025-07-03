import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useTheme } from "@/contexts/ThemeContext"

export default function SkillsSection() {
  const { isDark } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      title: "Frontend Development",
      color: "from-cyan-400 to-blue-500",
      skills: [
        {
          name: "React",
          level: 95,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          description: "Component-based UI library",
        },
        {
          name: "Next.js",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          description: "React framework for production",
        },
        {
          name: "JavaScript",
          level: 95,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          description: "Modern ES6+ JavaScript",
        },
        {
          name: "TypeScript",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          description: "Typed JavaScript superset",
        },
        {
          name: "HTML5",
          level: 95,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          description: "Semantic markup language",
        },
        {
          name: "CSS3",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
          description: "Modern styling & animations",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: "https://img.icons8.com/color/48/tailwindcss.png",
          description: "Utility-first CSS framework",
        },
        {
          name: "Sass",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
          description: "CSS preprocessor",
        },
      ],
    },
    {
      title: "Backend & Languages",
      color: "from-purple-400 to-pink-500",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          description: "JavaScript runtime environment",
        },
        {
          name: "Python",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          description: "Versatile programming language",
        },
        {
          name: "Java",
          level: 75,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          description: "Enterprise programming language",
        },
        {
          name: "C#",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
          description: "Microsoft's programming language",
        },
        {
          name: "Kotlin",
          level: 65,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
          description: "Modern Android development",
        },
        {
          name: "Dart",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
          description: "Flutter development language",
        },
        {
          name: "Express.js",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
          description: "Fast web framework for Node.js",
        },
        {
          name: "REST APIs",
          level: 88,
          icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/fastapi.svg",
          description: "RESTful web services",
        },
      ],
    },
    {
      title: "Databases & Cloud",
      color: "from-green-400 to-emerald-500",
      skills: [
        {
          name: "MongoDB",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
          description: "NoSQL document database",
        },
        {
          name: "Firebase",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
          description: "Backend-as-a-Service platform",
        },
        {
          name: "PostgreSQL",
          level: 75,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          description: "Advanced relational database",
        },
        {
          name: "MySQL",
          level: 78,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          description: "Popular relational database",
        },
        {
          name: "AWS",
          level: 70,
          icon: "https://img.icons8.com/color/48/amazon-web-services.png",
          description: "Amazon Web Services",
        },
        {
          name: "Docker",
          level: 65,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          description: "Containerization platform",
        },
        {
          name: "GraphQL",
          level: 65,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
          description: "Query language for APIs",
        },
        {
          name: "Redis",
          level: 60,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
          description: "In-memory data structure store",
        },
      ],
    },
    {
      title: "Mobile & Tools",
      color: "from-orange-400 to-red-500",
      skills: [
        {
          name: "React Native",
          level: 85,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          description: "Cross-platform mobile development",
        },
        {
          name: "Flutter",
          level: 70,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
          description: "Google's UI toolkit",
        },
        {
          name: "Android",
          level: 75,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
          description: "Native Android development",
        },
        {
          name: "VS Code",
          level: 95,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
          description: "Primary code editor",
        },
        {
          name: "Git",
          level: 90,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
          description: "Version control system",
        },
        {
          name: "GitHub",
          level: 88,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          description: "Code hosting platform",
        },
        {
          name: "Figma",
          level: 75,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
          description: "UI/UX design tool",
        },
        {
          name: "Linux",
          level: 80,
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
          description: "Unix-like operating system",
        },
      ],
    },
  ]

  return (
    <section id="skills" className={`${isDark ? "bg-black" : "bg-white"} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-6xl md:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Technical Skills</h2>
          <p className={`text-xl max-w-2xl mx-auto mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Here are the technologies I use to bring ideas to life
          </p>
          <motion.div
            className={`w-24 h-1 mx-auto rounded-full ${isDark ? "bg-green-500" : "bg-purple-500"}`}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              <div
                className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/90 border-slate-700 hover:border-slate-600"
                    : "bg-white/90 border-gray-300 hover:border-gray-400"
                }`}
              >
                <h3
                  className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-6 text-center`}
                >
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="relative">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              width={32}
                              height={32}
                              className={`rounded-lg shadow-lg p-1 ${
                                isDark ? "bg-white/10" : "bg-white/10"
                              }`}
                              loading="lazy"
                            />
                          </motion.div>
                          <div>
                            <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium text-sm`}>
                              {skill.name}
                            </span>
                            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-xs`}>
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-2 overflow-hidden bg-${isDark ? "gray-800" : "gray-200"}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full relative bg-gradient-to-r ${category.color}`}
                        >
                          <motion.div
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-white/20 rounded-full"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
            Additional Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
              {
                name: "Webpack",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
              },
              { name: "Vite", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vite.svg" },
              { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
              { name: "Cypress", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cypress.svg" },
              { name: "Postman", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg" },
              { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg" },
              {
                name: "Netlify",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
              },
              { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" },
              {
                name: "Photoshop",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
              },
              {
                name: "Illustrator",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
              },
              {
                name: "Blender",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: isDark ? "0 10px 25px rgba(29, 185, 84, 0.7)" : "0 10px 25px rgba(29, 185, 84, 0.3)",
                }}
                className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer group transition-all duration-300
                  ${isDark ? "bg-slate-900/90 border-slate-700 hover:border-slate-600" : "bg-white/90 border-gray-300 hover:border-gray-400"}
                `}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="mb-2 group-hover:scale-110 transition-transform duration-300 bg-white/10 p-1 rounded-lg"
                  loading="lazy"
                />
                <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}