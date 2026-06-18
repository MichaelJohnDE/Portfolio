import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const FSUUDocs = () => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-sans relative min-h-screen bg-background text-text-primary overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-surface/80 glass-nav shadow-lg border-b border-outline-variant/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-text-secondary hover:text-brand-cyan transition-colors font-medium"
          >
            <i className="fas fa-arrow-left"></i> Back to Portfolio
          </Link>
          <div className="flex items-center gap-4">
            
            <span className="text-xs font-mono text-text-muted opacity-50 hidden sm:block">V4.0</span>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(39,39,42,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(39,39,42,0.4)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none fixed"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none fixed"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none fixed"></div>

      <section className="py-32 px-[5%] md:px-[6%] lg:px-[8%] relative z-10">
        <div className="w-full mx-auto">
          {/* Hero */}
          <motion.h1 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6"
          >
            FSUU <span className="text-accent">Website</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center text-text-secondary max-w-3xl mx-auto mb-16 text-lg"
          >
            <strong>Father Saturnino Urios University Website</strong> is the official university web platform — a
            unified full-stack system with a public-facing React SPA and a feature-rich Admin CMS.
          </motion.p>

          {/* Project Credits */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bento-card p-8 mb-16 max-w-3xl mx-auto text-center hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-6 text-text-primary">
              Project <span className="text-accent-alt">Credits</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <i className="fas fa-code text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary text-sm">John Paul Linogao</p>
                <p className="text-xs text-text-muted mt-1">Full-Stack Developer</p>
              </div>
              <div>
                <i className="fas fa-code text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary text-sm">Jowehl Radaza</p>
                <p className="text-xs text-text-muted mt-1">Full-Stack Developer</p>
              </div>
              <div>
                <i className="fas fa-code text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary text-sm">Michael John Danville Enciso</p>
                <p className="text-xs text-text-muted mt-1">Full-Stack Developer</p>
              </div>
              <div>
                <i className="fas fa-code text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary text-sm">Mark Ezequiel Pereyra</p>
                <p className="text-xs text-text-muted mt-1">Full-Stack Developer</p>
              </div>
            </div>
          </motion.div>

          {/* Powered By */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16 max-w-4xl mx-auto bento-card p-8"
          >
            <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-6">Powered By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-4xl text-text-secondary">
              <i className="devicon-laravel-plain hover:text-red-500 transition-colors cursor-pointer" title="Laravel 12"></i>
              <i className="devicon-php-plain hover:text-indigo-400 transition-colors cursor-pointer" title="PHP 8.2+"></i>
              <i className="devicon-react-original hover:text-cyan-400 transition-colors cursor-pointer" title="React 18"></i>
              <i className="devicon-vitejs-plain hover:text-purple-400 transition-colors cursor-pointer" title="Vite 6"></i>
              <i className="devicon-tailwindcss-plain hover:text-cyan-400 transition-colors cursor-pointer" title="Tailwind CSS 4"></i>
              <i className="devicon-mysql-plain hover:text-blue-400 transition-colors cursor-pointer" title="MySQL"></i>
              <i className="devicon-redis-plain hover:text-red-400 transition-colors cursor-pointer" title="Redis"></i>
              <i className="devicon-figma-plain hover:text-pink-400 transition-colors cursor-pointer" title="Figma"></i>
              <i className="devicon-docker-plain hover:text-sky-400 transition-colors cursor-pointer" title="Docker"></i>
              <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-brand-cyan transition-colors">
                ANT DESIGN
              </span>
            </div>
          </motion.div>

          {/* Technical Architecture */}
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Technical <span className="text-accent-alt">Architecture</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-globe"></i> Public Website
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Visitor-facing:</strong> The visitor-facing side of the university website, designed to be fast and easy to navigate on any device.</li>
                <li><strong className="text-text-primary">Features:</strong> Supports rich content pages, an interactive campus map, and publicly accessible university information.</li>
                <li><strong className="text-text-primary">Performance:</strong> Built for quick loading and smooth browsing without unnecessary page reloads.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-desktop"></i> Admin CMS
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Management Dashboard:</strong> A private management dashboard where authorized university staff can create and manage website content.</li>
                <li><strong className="text-text-primary">Content Tools:</strong> Includes tools for writing articles, uploading images, managing files, and building page layouts visually.</li>
                <li><strong className="text-text-primary">Access Control:</strong> Each staff account only sees and accesses the sections they are permitted to manage.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-server"></i> Backend
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Centralized System:</strong> A single backend powers both the public website and the admin panel, keeping all data and logic in one place.</li>
                <li><strong className="text-text-primary">Real-time Updates:</strong> Supports real-time updates so admin users see changes and notifications instantly.</li>
                <li><strong className="text-text-primary">Report Generation:</strong> Can generate downloadable reports and documents for administrative needs.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-shield-alt"></i> Security
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Authentication:</strong> Only verified and active users can log in and access protected areas of the system.</li>
                <li><strong className="text-text-primary">Role-based Access:</strong> Each admin role has a defined set of permissions — no one can access areas outside their scope.</li>
                <li><strong className="text-text-primary">Data Encryption:</strong> All communication between the browser and the server is encrypted and secure.</li>
              </ul>
            </motion.div>
          </div>

          {/* DevOps */}
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            DevOps & <span className="text-accent">Infrastructure</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-emerald text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fab fa-docker"></i> Containerization
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Consistent Environments:</strong> The entire system is packaged so it runs the same way on every machine, from development to production.</li>
                <li><strong className="text-text-primary">Isolated Services:</strong> Each part of the application runs in isolation, making it easier to maintain and update independently.</li>
              </ul>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-emerald text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-lock"></i> Secure Development
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Local HTTPS:</strong> Development is done over a secure, encrypted connection — the same way the live site runs.</li>
                <li><strong className="text-text-primary">Environment Parity:</strong> Security measures are applied consistently across both local and production environments.</li>
              </ul>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-emerald text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-rocket"></i> Deployment
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Streamlined Releases:</strong> Pushing updates to the live site is handled through a streamlined process that minimizes downtime.</li>
                <li><strong className="text-text-primary">Environment Sync:</strong> The development and live environments are kept in sync to avoid unexpected issues during releases.</li>
              </ul>
            </motion.div>
          </div>

          {/* Coming Soon - HIDDEN */}
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight hidden"
          >
            Live <span className="text-accent">Preview</span>
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16 text-center hidden"
          >
            <div className="bento-card p-6 md:p-12 max-w-2xl mx-auto hover:border-brand-cyan/30">
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                  <i className="fas fa-hourglass-half text-3xl text-brand-cyan"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Awaiting Official Launch</h3>
                  <p className="text-text-secondary text-sm max-w-sm mx-auto">The project has been completed and delivered, and is currently awaiting its official launch.</p>
                </div>
                <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0"></span>
                  Pending Launch
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default FSUUDocs;
