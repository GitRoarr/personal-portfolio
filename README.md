# 🚀 Girma's Professional Portfolio

A modern, responsive portfolio website built with Next.js, featuring dynamic content management, dark/light theme switching, and Firebase integration.

![Portfolio Preview](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h3T5OJRocuIodjkXvt4Rk7D2HWFbYR.png)

## 📁 Project Structure

![Repository Structure](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DhBsKsjtYK2SUvQUBMwvE9DwAwojUz.png)

## 🌟 Features

- **Responsive Design** - Optimized for all devices
- **Dark/Light Theme** - Seamless theme switching
- **Dynamic Content** - Real-time project and blog management
- **Admin Panel** - Secure content management system
- **Contact Form** - Integrated email functionality
- **SEO Optimized** - Meta tags and social sharing
- **Firebase Integration** - Authentication, Firestore, Hosting

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend services
- **Framer Motion** - Animation library
- **EmailJS** - Contact form service

## Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- EmailJS account

### Installation

1. **Clone and install**
   \`\`\`bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   npm install
   \`\`\`

2. **Environment Setup**
   Create `.env.local`:
   \`\`\`env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # EmailJS
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`


\`\`\`
projects/
├── title, description, image, technologies
├── liveUrl, githubUrl, featured, category
└── createdAt

blogs/
├── title, content, excerpt, image
├── tags, featured, category, author
└── publishedAt, createdAt

analytics/
├── action, resource, timestamp
└── metadata

resume/
├── downloadUrl, description
└── version, updatedAt
\`\`\`

### 3. Security Rules
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email == "your-admin-email@gmail.com";
    }
  }
}
\`\`\`

## EmailJS Setup

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create email service (Gmail)
3. Create contact form template
4. Get service ID, template ID, and public key
5. Add to environment variables

## Deployment

### Firebase Hosting

\`\`\`bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
\`\`\`



## 🔐 Admin Access

### Setup
1. Create admin user in Firebase Auth
2. Update admin email in `contexts/AuthContext.jsx`
3. Visit `/admin` to manage content

### Features
- Project management
- Blog post creation
- Image uploads
- Analytics dashboard
- Resume updates

## 🎨 Sections

- **Hero** - Animated introduction
- **About** - Personal info with stats
- **Skills** - Technical skills display
- **Projects** - Work showcase
- **Blog** - Technical articles
- **Resume** - Downloadable CV
- **Contact** - Contact form

## 📱 Usage

### Content Management
1. Access admin panel at `/admin`
2. Add/edit projects and blog posts
3. Upload images directly
4. Update resume information

### Theme Switching
- Click theme toggle in navigation
- Supports system theme detection
- Preference saved in localStorage


## 📊 Analytics

Built-in tracking for:
- Page views
- Project clicks
- Blog reads
- Resume downloads
- Contact submissions

Made with ❤️ by [Girma Enkuchile](https://codegirma.com)
