import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const EXPERIENCE_DATA = [
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
    title: "Father Saturnino Urios University Website",
    subtitle: "Full-Stack Developer Intern | OJT Project",
    description: "The official university web platform — a unified full-stack system with a public-facing React SPA and a feature-rich Admin CMS, both powered by a single Laravel 12 REST API backend.",
    images: ["assets/images/fsuu_logo.png"],
    tags: ["Laravel 12", "React 18", "Vite 6", "Tailwind CSS 4", "Ant Design 5", "MySQL", "Redis", "Laravel Reverb", "Docker"],
    link: "/projects/fsuu",
    projectType: "Collaborative Work",
    teamSize: "4 Members"
  },
  {
    title: "St. Michael Lights & Sounds",
    subtitle: "Frontend Advertisement Site",
    description: "A professional dark-themed website for an event lighting and sound company. Featuring smooth animations, an interactive video player, and a mobile-friendly design.",
    images: ["assets/images/stmichael_preview.png"],
    tags: ["React 19", "Tailwind CSS 4", "Framer Motion"],
    link: "/projects/stmichael",
    projectType: "Solo Project",
    teamSize: "1 Member"
  },
  {
    title: "PALIHOG App",
    subtitle: "Full-Stack Web Developer | Capstone Project",
    description: "A campus-based task app that connects students for errands. Features real-time tracking, a mobile interface, and a dedicated admin portal.",
    images: ["assets/images/asdLogo.png"],
    tags: ["React Native", "Laravel", "Firebase", "Expo"],
    link: "/projects/palihog",
    projectType: "Collaborative Work",
    teamSize: "4 Members"
  },
  {
    title: "Le Voyage",
    subtitle: "Modernized Web Project",
    description: "A digital travel guide and virtual ambassador for the Philippines, conceptualized as an educational platform blending inspiring destinations with rich history and practical guidance.",
    images: ["assets/images/LeVoyageHeroSection.png"],
    tags: ["Laravel", "Vite", "Bootstrap 5", "MySQL", "JavaScript", "AOS"],
    link: "/projects/levoyage",
    projectType: "Solo Project",
    teamSize: "1 Member"
  },
  {
    title: "Retail POS & Inventory System",
    subtitle: "VB.NET Desktop Application",
    description: "A dual-application retail solution featuring an Inventory Management System and a Point of Sale (POS) with dynamic discounts and real-time stock tracking.",
    images: ["assets/images/Home.png"],
    tags: ["VB.NET", "WinForms", "SQLite", "N-Tier", "Devart"],
    link: "/projects/retail-pos",
    projectType: "Solo Project",
    teamSize: "1 Member"
  },
  {
    title: "E-Commerce Platform",
    subtitle: "React & Node.js Developer",
    description: "A complete e-commerce solution featuring a modern storefront, secure payment processing with Stripe, and a comprehensive admin dashboard for inventory management. The platform supports user authentication, order tracking, and real-time inventory updates.",
    images: [],
    tags: ["Next.js", "Node.js", "Express", "Stripe", "MongoDB"],
    link: "#",
    projectType: "Full-Stack E-Commerce",
    teamSize: "Solo Project"
  }
]

const CERTIFICATIONS_DATA = [
  {
    title: "Microsoft Security Essentials Professional Certificate",
    issuer: "Microsoft",
    date: "Jun 2026",
    image: "assets/images/MicrosoftSecurityEssentialsProCert.jpg",
    icon: "ShieldCheck"
  },
  {
    title: "Responsible AI Professional Certificate",
    issuer: "Microsoft",
    date: "Jun 2026",
    image: "assets/images/ResponsibleAIProCert.jpg",
    icon: "Wand2"
  },
  {
    title: "HubSpot SEO II Certified",
    issuer: "HubSpot Academy",
    date: "Apr 2026",
    image: "assets/images/SEOII_Cert.png",
    icon: "BarChart3"
  },
  {
    title: "SEO I Certification",
    issuer: "HubSpot Academy",
    date: "Dec 2025",
    image: "assets/images/SEO_Cert.png",
    icon: "BarChart3"
  },
  {
    title: "Career Service Professional",
    issuer: "Civil Service Commission | Rating: 88.33%",
    date: "Jul 2025",
    icon: "Award"
  },
  {
    title: "Network Technician Career Path",
    issuer: "Cisco Networking Academy",
    date: "Dec 2024",
    image: "assets/images/Network_Technician_Career_Path.jpg",
    icon: "Network"
  },
  {
    title: "Certified Information Security and Data Privacy Practitioner (CISDP)",
    issuer: "East West IESI",
    date: "Dec 2024",
    image: "assets/images/ENCISO_CISDP_page-0001.jpg",
    icon: "Shield"
  },
  {
    title: "Microsoft Office Specialist: Access Expert (2019)",
    issuer: "Certiport",
    date: "Dec 2024",
    image: "assets/images/AccessExpertCert_page-0001.jpg",
    icon: "FileSpreadsheet"
  },
  {
    title: "Microsoft Office Specialist: Excel Associate (2019)",
    issuer: "Certiport",
    date: "Nov 2024",
    image: "assets/images/ExcelAssociateCert_page-0001.jpg",
    icon: "FileSpreadsheet"
  }
]

const SKILLS_DATA = [
  {
    title: "Frontend & Mobile",
    icon: "Layout",
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
    icon: "Server",
    skills: [
      { name: "Laravel", slug: "laravel", color: "FF2D20" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Firebase", slug: "firebase", color: "FFCA28" },
      { name: "NoSQL", slug: "mongodb", color: "47A248" },
      { name: "RBAC", icon: "Key" }
    ]
  },
  {
    title: "Design & Dev Tools",
    icon: "Palette",
    skills: [
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Google Stitch", slug: "google", color: "4285F4" },
      { name: "GitHub", slug: "github", color: "181717" },
      { name: "GSC", slug: "googlesearchconsole", color: "4285F4" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Cursor", slug: "cursor", color: "000000" },
      { name: "Antigravity", slug: "google", color: "4285F4" },
      { name: "Zapier", slug: "zapier", color: "FF4A00" }
    ]
  }
]

async function main() {
  console.log('Seeding Database...')

  // Clear existing
  await prisma.socialLink.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.skillCategory.deleteMany()

  // Insert Profile
  console.log('Seeding Profile...')
  const profile = await prisma.profile.create({
    data: {
      id: "singleton",
      firstName: "Michael John",
      lastName: "Danville Enciso",
      roles: ["Full-Stack Web Developer | AI‑Enhanced Solutions"],
      summary: "Adaptable Information Technology graduate and Full-Stack Web Developer with practical experience building and customizing web solutions using modern AI coding tools. Passionate about automation, workflows, and leveraging technology to deliver efficient, user-focused results. Quick learner currently expanding knowledge in AI automation and IT support.",
      email: "encisomichael4@gmail.com",
      contactTitle: "Ready to build something \nextraordinary?",
      contactSubtitle: "Currently open for opportunities and collaborations. Let's discuss how my skills align with your needs.",
      footerText: "Powered by modern tools for maximum efficiency.",
      logoText: "MJDE.",
      resumeUrl: "/Michael_John_Danville_Enciso_Resume.pdf",
      socials: {
        create: [
          { platform: "GitHub", handle: "MichaelJohnDE", url: "https://github.com/MichaelJohnDE", icon: "github" },
          { platform: "LinkedIn", handle: "Michael John Danville Enciso", url: "https://www.linkedin.com/in/mjde/", icon: "linkedin" },
          { platform: "Email", handle: "encisomichael4@gmail.com", url: "mailto:encisomichael4@gmail.com", icon: "mail" }
        ]
      }
    }
  })

  // Insert Experiences
  for (const exp of EXPERIENCE_DATA) {
    await prisma.experience.create({ data: exp })
  }

  // Insert Projects
  for (const proj of PROJECTS_DATA) {
    await prisma.project.create({ data: proj })
  }

  // Insert Certifications
  for (const cert of CERTIFICATIONS_DATA) {
    await prisma.certification.create({ data: cert })
  }

  // Insert Skills
  for (const cat of SKILLS_DATA) {
    const category = await prisma.skillCategory.create({
      data: { title: cat.title, icon: cat.icon }
    })

    for (const skill of cat.skills) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          slug: skill.slug,
          color: skill.color,
          path: skill.path,
          icon: skill.icon,
          skillCategoryId: category.id
        }
      })
    }
  }

  console.log('Database Seeded Successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
