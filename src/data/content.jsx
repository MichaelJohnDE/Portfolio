import React from 'react'
import { Award, Shield, FileSpreadsheet, BarChart3, Layout, Server, Smartphone, Rocket, ShieldCheck, Palette, Network } from 'lucide-react'

export const HERO_DATA = {
  name: "Michael John",
  lastName: "Danville Enciso",
  roles: ["Full-Stack Web Developer", "Technical SEO Specialist"],
  summary: "Adaptable Bachelor of Science in Information Technology student with practical, hands-on experience in full-stack web development. Adept at bridging the gap between UI/UX design and functional system architecture.",
  email: "encisomichael4@gmail.com",
}

export const EXPERIENCE_DATA = [
  {
    date: "Jan 2026 - Present",
    role: "Frontend Developer Intern (OJT)",
    company: "Strategic Communications & Auxiliary Resource Office, FSUU",
    description: [
      "Assisting with frontend development within a 4-member full-stack team to build the official FSUU website.",
      "Translating finalized designs into responsive, modern web components.",
      "Streamlined UI/UX workflow by converting legacy Canva layouts to interactive Figma prototypes."
    ]
  },
  {
    date: "Jun 2025 - Dec 2025",
    role: "Primary Full-Stack Web Developer",
    company: "PALIHOG App Capstone Project",
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
    details: [
      "Built a mobile app for students to post and accept campus tasks.",
      "Developed a web-based admin portal for managing users and tasks.",
      "Used Firebase for real-time status updates and location tracking."
    ],
    link: "palihog-docs.html"
  },
  {
    title: "St. Michael Lights & Sounds",
    subtitle: "Frontend Advertisement Site",
    description: "A professional dark-themed website for an event lighting and sound company. Featuring smooth animations, an interactive video player, and a mobile-friendly design.",
    image: "assets/images/stmichael_preview.png",
    tags: ["React 19", "Tailwind CSS 4", "Framer Motion", "Cloudflare Pages"],
    details: [
      "Designed a 'Nocturnal' dark theme that fits the event industry vibe.",
      "Added a smart video player that starts playing when users scroll to it.",
      "Included smooth soundwave animations for a more interactive experience."
    ],
    link: "stmichael-docs.html"
  }
]

export const CERTIFICATIONS_DATA = [
  {
    title: "HubSpot SEO II Certified",
    issuer: "HubSpot Academy",
    date: "Apr 2026",
    icon: <BarChart3 className="text-emerald-400" size={24} />
  },
  {
    title: "SEO I Certification",
    issuer: "HubSpot Academy",
    date: "Dec 2025",
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
    icon: <Network className="text-cyan-400" size={24} />
  },
  {
    title: "Info Sec & Data Privacy Practitioner",
    issuer: "East West IESI",
    date: "Dec 2024",
    icon: <Shield className="text-cyan-400" size={24} />
  },
  {
    title: "Microsoft Office Specialist (2019)",
    issuer: "Certiport | Access Expert & Excel Associate",
    date: "Nov - Dec 2024",
    icon: <FileSpreadsheet className="text-emerald-400" size={24} />
  }
]

export const SKILLS_DATA = [
  {
    title: "Web Development",
    icon: <Layout className="text-emerald-400" size={24} />,
    skills: [
      { name: "HTML5", slug: "html5", color: "E34F26" },
      { name: "CSS3", path: "/assets/images/css3-logo.png" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Inertia.js", slug: "inertia", color: "9553E9" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" }
    ]
  },
  {
    title: "Backend & Database",
    icon: <Server className="text-cyan-400" size={24} />,
    skills: [
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: "PHP", slug: "php", color: "777BB4" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Firebase", slug: "firebase", color: "FFCA28" },
      { name: "Passport", slug: "jsonwebtokens", color: "000000" }
    ]
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="text-emerald-400" size={24} />,
    skills: [
      { name: "React Native", slug: "react", color: "61DAFB" },
      { name: "Expo", slug: "expo", color: "000020" }
    ]
  },
  {
    title: "DevOps & SEO Engine",
    icon: <Rocket className="text-cyan-400" size={24} />,
    skills: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "181717" },
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "GSC", slug: "googlesearchconsole", color: "4285F4" },
      { name: "SEMrush", slug: "semrush", color: "F26722" }
    ]
  },
  {
    title: "Security & Architecture",
    icon: <ShieldCheck className="text-emerald-400" size={24} />,
    skills: [
      { name: "RBAC Rules", slug: "dependabot", color: "444444" },
      { name: "JWT", slug: "jsonwebtokens", color: "000000" },
      { name: "Firestore Rules", slug: "firebase", color: "FFCA28" }
    ]
  },
  {
    title: "UI/UX Design",
    icon: <Palette className="text-cyan-400" size={24} />,
    skills: [
      { name: "Figma", slug: "figma", color: "F24E1E" }
    ]
  }
]
