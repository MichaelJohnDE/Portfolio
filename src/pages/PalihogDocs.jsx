import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const PalihogDocs = () => {
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

      <section className="py-32 px-[5%] md:px-[6%] lg:px-[8%] relative z-10">
        <div className="w-full mx-auto">
          <motion.h1 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6"
          >
            PALIHOG App <span className="text-accent">Documentation</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center text-text-secondary max-w-3xl mx-auto mb-16 text-lg"
          >
            <strong>PALIHOG App</strong> is a campus-based, real-time task-management mobile application designed
            for students across various colleges and universities. Originally developed as a capstone project, the
            app connects students who need help with tasks to other students who can fulfill those requests.
          </motion.p>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bento-card p-8 mb-16 max-w-3xl mx-auto text-center hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-6 text-text-primary">
              Project <span className="text-accent-alt">Credits</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <i className="fas fa-code text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary">Michael John Danville Enciso</p>
                <p className="text-sm text-text-muted mt-1">Primary Full-Stack Developer</p>
              </div>
              <div>
                <i className="fas fa-paint-brush text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary">Mitzi Rosales</p>
                <p className="text-sm text-text-muted mt-1">Logo Design & Frontend</p>
              </div>
              <div>
                <i className="fas fa-object-group text-3xl mb-3 text-brand-cyan"></i>
                <p className="font-bold text-text-primary">Keziah Rane Marie Lonoy <br/>& Apryl Jash Evangelista</p>
                <p className="text-sm text-text-muted mt-1">UI/UX Design</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16 max-w-4xl mx-auto bento-card p-8"
          >
            <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-6">Powered By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-4xl text-text-secondary">
              <i className="devicon-androidstudio-plain hover:text-brand-cyan transition-colors cursor-pointer" title="Android Studio"></i>
              <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-brand-cyan transition-colors" title="Expo">EXPO</span>
              <i className="devicon-react-original hover:text-brand-cyan transition-colors cursor-pointer" title="React Native & React"></i>
              <i className="devicon-laravel-plain hover:text-red-500 transition-colors cursor-pointer" title="Laravel"></i>
              <i className="devicon-php-plain hover:text-blue-400 transition-colors cursor-pointer" title="PHP"></i>
              <i className="devicon-firebase-plain hover:text-yellow-400 transition-colors cursor-pointer" title="Firebase"></i>
              <i className="devicon-tailwindcss-plain hover:text-cyan-400 transition-colors cursor-pointer" title="Tailwind CSS"></i>
              <i className="devicon-vitejs-plain hover:text-purple-400 transition-colors cursor-pointer" title="Vite"></i>
              <i className="devicon-figma-plain hover:text-pink-400 transition-colors cursor-pointer" title="Figma"></i>
            </div>
          </motion.div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Technical <span className="text-accent-alt">Architecture</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-mobile-alt"></i> Mobile App Stack
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Core:</strong> React Native (v0.79) & Expo (v53).</li>
                <li><strong className="text-text-primary">Navigation:</strong> Expo Router & React Navigation for deep-linking.</li>
                <li><strong className="text-text-primary">UI/Animations:</strong> <code>react-native-reanimated</code> for native-driven smoothness.</li>
                <li><strong className="text-text-primary">Integrations:</strong> Geolocation via Maps, native media handling using Expo ecosystem.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-desktop"></i> Web Admin Stack
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Framework:</strong> Built as a Modern SPA using React 19 and Vite 7.</li>
                <li><strong className="text-text-primary">State & Routing:</strong> Inertia.js v2 bridging React seamlessly to the backend.</li>
                <li><strong className="text-text-primary">UI/UX:</strong> Tailwind CSS v4, Material UI (MUI) v7, and Radix UI primitives.</li>
                <li><strong className="text-text-primary">Architecture:</strong> Hybrid SSR-ready (<code>build:ssr</code>) for optimized FCP.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-server"></i> Unified Backend Infrastructure
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Primary Engine:</strong> Laravel 12 (PHP 8.2+) powering robust business logic, queues, and headless operations.</li>
                <li><strong className="text-text-primary">Database:</strong> Firebase v12 (Firestore) for real-time document storage, bidding logic, and messaging threads.</li>
                <li><strong className="text-text-primary">Real-time Systems:</strong> Custom targeted notification broadcasting and secure live location-sharing endpoints.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-shield-alt"></i> Security Implementations
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">RBAC Rules:</strong> Strict Firestore admin separation to protect data and bidding constraints.</li>
                <li><strong className="text-text-primary">Web Security:</strong> CSRF protection via Laravel/Inertia, strict XSS sanitization, protected middleware routes.</li>
                <li><strong className="text-text-primary">Headless Auth:</strong> Laravel Fortify handles secure backend authentication.</li>
                <li><strong className="text-text-primary">Data Integrity:</strong> Soft deletion patterns and field-level validation for monetary systems.</li>
              </ul>
            </motion.div>
          </div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Web Admin <span className="text-accent">Portal</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-4 hover:border-brand-cyan/50">
              <img src="/assets/images/web-admin-login.png" alt="Admin Login" className="rounded-xl w-full h-auto" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-4 hover:border-brand-cyan/50">
              <img src="/assets/images/web-admin-dashboard.png" alt="Admin Dashboard" className="rounded-xl w-full h-auto" />
            </motion.div>
          </div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Mobile App <span className="text-accent">Interfaces</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-4 hover:border-brand-emerald/50 flex justify-center">
              <img src="/assets/images/mobile-ui-1.jpg" alt="Mobile UI 1" className="rounded-xl max-h-[500px] object-contain" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-4 hover:border-brand-emerald/50 flex justify-center">
              <img src="/assets/images/mobile-ui-2.jpg" alt="Mobile UI 2" className="rounded-xl max-h-[500px] object-contain" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-4 hover:border-brand-emerald/50 flex justify-center">
              <img src="/assets/images/mobile-ui-3.png" alt="Mobile UI 3" className="rounded-xl max-h-[500px] object-contain" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PalihogDocs;
