import React from 'react'
import { Award, Shield, FileSpreadsheet, BarChart3, Layout, Server, Smartphone, Rocket, ShieldCheck, Palette, Network, MousePointer2, Key, Wand2, Zap } from 'lucide-react'

export const HERO_DATA = {
  name: "Michael John",
  lastName: "Danville Enciso",
  roles: ["Full-Stack Web Developer", "Technical SEO Specialist"],
  summary: "Adaptable Bachelor of Science in Information Technology graduate with practical, hands-on experience in full-stack web development. Adept at bridging the gap between UI/UX design and functional system architecture, while utilizing AI tools and modern workflows to maximize development efficiency.",
  email: "encisomichael4@gmail.com",
  socials: [
    { platform: "GitHub", handle: "MichaelJohnDE", url: "https://github.com/MichaelJohnDE", icon: "github" },
    { platform: "LinkedIn", handle: "Michael John Danville Enciso", url: "https://www.linkedin.com/in/mjde/", icon: "linkedin" },
    { platform: "Email", handle: "encisomichael4@gmail.com", url: "mailto:encisomichael4@gmail.com", icon: "mail" }
  ]
}

export const EXPERIENCE_DATA = [
  {
    date: "Jan 2026 - Apr 2026",
    role: "Full-Stack Developer Intern (OJT)",
    company: "Strategic Communications Office, FSUU",
    connector: "at",
    description: [
      "Developing the official FSUU website as part of a 4-person team, contributing to both frontend user experience and backend logic to deliver a cohesive, high-performance web platform.",
      "Streamlined the design-to-production pipeline by migrating legacy layouts to Figma and implementing responsive components that align with university visual standards."
    ]
  },
  {
    date: "Jun 2025 - Dec 2025",
    role: "Primary Full-Stack Web Developer",
    company: "PALIHOG App Capstone Project",
    connector: "|",
    description: [
      "Architected a 'Modern Monolith' full-stack ecosystem using React Native (Expo) for mobile, and Laravel 12 with React/Inertia.js for the admin portal.",
      "Engineered real-time features including map geolocation grids, live bidding logic, and chat threads using Firebase backend.",
      "Implemented robust zero-trust security architecture enforcing mathematical data validation and strict Role-Based Access Controls (RBAC) via Firestore rules."
    ]
  },
  {
    date: "Jan 2025 - Apr 2025",
    role: "Collaborative Full-Stack Web Developer",
    company: "UrianWorks E-Commerce | Academic Project",
    connector: "|",
    description: [
      "Collaborated within a 3-member team to build an exclusive student e-commerce platform.",
      "Co-developed the backend and frontend architecture using Laravel 12, React 19, and Inertia.js.",
      "Assisted in implementing a robust dual-authentication system combining session-based web auth and JWT API guards via Laravel Passport."
    ]
  }
]

export const PROJECTS_DATA = [
  {
    title: "PALIHOG App",
    subtitle: "Full-Stack Web Developer | Capstone Project",
    description: "A campus-based task app that connects students for errands. Features real-time tracking, a mobile interface, and a dedicated admin portal.",
    image: "assets/images/asdLogo.png",
    tags: ["React Native", "Laravel", "Firebase", "Expo"],
    link: "/projects/palihog",
    projectType: "Collaborative Work",
    teamSize: "4 Members"
  },
  {
    title: "St. Michael Lights & Sounds",
    subtitle: "Frontend Advertisement Site",
    description: "A professional dark-themed website for an event lighting and sound company. Featuring smooth animations, an interactive video player, and a mobile-friendly design.",
    image: "assets/images/stmichael_preview.png",
    tags: ["React 19", "Tailwind CSS 4", "Framer Motion", "Cloudflare Pages"],
    link: "/projects/stmichael",
    projectType: "Solo Project",
    teamSize: "1 Member"
  },
  {
    title: "Father Saturnino Urios University Website",
    subtitle: "Full-Stack Developer Intern | OJT Project",
    description: "The official university web platform — a unified full-stack system with a public-facing React SPA and a feature-rich Admin CMS, both powered by a single Laravel 12 REST API backend.",
    image: "assets/images/fsuu_logo.png",
    tags: ["Laravel 12", "React 18", "Vite 6", "Tailwind CSS 4", "Ant Design 5", "MySQL", "Redis", "Laravel Reverb", "Docker"],
    link: "/projects/fsuu",
    projectType: "Collaborative Work",
    teamSize: "4 Members"
  }
]

export const CERTIFICATIONS_DATA = [
  {
    title: "HubSpot SEO II Certified",
    issuer: "HubSpot Academy",
    date: "Apr 2026",
    image: "assets/images/SEOII_Cert.png",
    icon: <BarChart3 className="text-emerald-400" size={24} />
  },
  {
    title: "SEO I Certification",
    issuer: "HubSpot Academy",
    date: "Dec 2025",
    image: "assets/images/SEO_Cert.png",
    icon: <BarChart3 className="text-cyan-400" size={24} />
  },
  {
    title: "Career Service Professional",
    issuer: "Civil Service Commission | Rating: 88.33%",
    date: "Jul 2025",
    icon: <Award className="text-emerald-400" size={24} />
  },
  {
    title: "Network Technician Career Path",
    issuer: "Cisco Networking Academy",
    date: "Dec 2024",
    image: "assets/images/Network_Technician_Career_Path.jpg",
    icon: <Network className="text-cyan-400" size={24} />
  },
  {
    title: "Info Sec & Data Privacy Practitioner",
    issuer: "East West IESI",
    date: "Dec 2024",
    icon: <Shield className="text-cyan-400" size={24} />
  },
  {
    title: "Microsoft Office Specialist: Access Expert (2019)",
    issuer: "Certiport",
    date: "Dec 2024",
    image: "assets/images/AccessExpertCert_page-0001.jpg",
    icon: <FileSpreadsheet className="text-emerald-400" size={24} />
  },
  {
    title: "Microsoft Office Specialist: Excel Associate (2019)",
    issuer: "Certiport",
    date: "Nov 2024",
    image: "assets/images/ExcelAssociateCert_page-0001.jpg",
    icon: <FileSpreadsheet className="text-cyan-400" size={24} />
  }
]

export const SKILLS_DATA = [
  {
    title: "Frontend & Mobile",
    icon: <Layout className="text-emerald-400" size={24} />,
    skills: [
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", path: "/assets/images/css3-logo.png" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "React Native", slug: "react", color: "61DAFB" },
      { name: "TailwindCSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "Ant Design", slug: "antdesign", color: "0170FE" },
      { name: "Expo", slug: "expo", color: "000020" },
      { name: "Android Studio", slug: "androidstudio", color: "3DDC84" }
    ]
  },
  {
    title: "Backend & Architecture",
    icon: <Server className="text-cyan-400" size={24} />,
    skills: [
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Firebase", slug: "firebase", color: "FFCA28" },
      { name: "NoSQL", slug: "mongodb", color: "47A248" },
      { name: "RBAC", icon: <Key size={20} className="text-on-surface" /> }
    ]
  },
  {
    title: "Design & Dev Tools",
    icon: <Palette className="text-emerald-400" size={24} />,
    skills: [
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Google Stitch", slug: "google", color: "4285F4" },
      { name: "GitHub", slug: "github", color: "181717" },
      { name: "GSC", slug: "googlesearchconsole", color: "4285F4" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Cursor", slug: "cursor", color: "000000" },
      { name: "Antigravity", slug: "google", color: "4285F4" }
    ]
  }
]
