# Michael John Danville Enciso - Full-Stack Portfolio

Welcome to the source code of my personal Full-Stack Web Developer portfolio! This project is a dynamic, highly-interactive web application built to showcase my experiences, projects, skills, and certifications. It features a custom-built content management system (CMS) / Admin panel that allows me to easily update my portfolio on the fly without needing to redeploy.

## 🚀 Tech Stack

This project is built using a modern, scalable, and highly performant technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Supabase](https://supabase.com/)
- **Animations & 3D:** [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **Content Parsing:** [React Markdown](https://github.com/remarkjs/react-markdown) & [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)

## Security

Security is treated as a first-class citizen in this project. The architecture includes multiple layers of protection against common web vulnerabilities (OWASP Top 10):

### 1. Robust Authentication & Authorization
The custom Admin panel is fully protected. Every single data mutation (adding, editing, deleting) is routed through Next.js Server Actions. Before any database transaction occurs, a strict server-side validation checks the Supabase JSON Web Token (JWT) to ensure only the authenticated admin has access.

### 2. Path Traversal & File Upload Security
When images or resumes are uploaded through the admin dashboard, the server actively sanitizes filenames. All special characters are stripped via regular expressions and timestamps are appended. This prevents malicious actors from executing path traversal attacks (e.g., attempting to overwrite system files).

### 3. XSS (Cross-Site Scripting) Protection
The application avoids dangerous React patterns completely (e.g., zero usage of `dangerouslySetInnerHTML`). All rich-text (Markdown) content rendered on the frontend is parsed using `react-markdown`, which inherently escapes and sanitizes potentially malicious HTML and `<script>` injections by default.

### 4. SQL Injection Immunity
All database interactions are handled via the Prisma ORM. Prisma natively utilizes parameterized queries, making traditional SQL Injection attacks virtually impossible.

### 5. CSRF (Cross-Site Request Forgery) Protection
Because the application relies on Next.js Server Actions for all form submissions and data mutations, it inherits Next.js's built-in CSRF protection. This automatically validates the `Origin` and `Host` headers to ensure requests are intentionally originating from the application itself.

### 6. SEO Protection for Admin Routes
To ensure that search engines do not crawl or index administrative pages, strict SEO guards are in place. This includes an active `robots.txt` disallow rule for `/admin/` as well as enforced `<meta name="robots" content="noindex, nofollow" />` tags injected into the layout of the entire admin dashboard.

---

*Designed and engineered by Michael John Danville Enciso.*
