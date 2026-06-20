import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const LeVoyageDocs = () => {
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
        </div>
      </nav>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(39,39,42,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(39,39,42,0.4)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none fixed"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none fixed"></div>

      <section className="py-32 px-[5%] md:px-[6%] lg:px-[8%] relative z-10">
        <div className="w-full mx-auto">
          <motion.h1 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6"
          >
            Le <span className="text-accent">Voyage</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center text-text-secondary max-w-3xl mx-auto mb-16 text-lg"
          >
            <strong>Le Voyage</strong> is a conceptual web project envisioning a digital travel guide and virtual ambassador for the Philippines. Going beyond simple itineraries, this concept explores the country's 7,641 islands by blending inspiring destinations with rich history, local cuisine, and practical guidance to create an educational platform for travelers.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center bento-card p-8 hover:border-brand-cyan/30 transition-colors"
            >
              <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-6">Modernized Stack</h3>
              <div className="flex flex-wrap justify-center items-center gap-6 text-4xl text-text-secondary">
                <i className="devicon-laravel-original hover:text-red-500 transition-colors cursor-pointer" title="Laravel"></i>
                <i className="devicon-php-plain hover:text-indigo-400 transition-colors cursor-pointer" title="Modern PHP"></i>
                <i className="devicon-mysql-plain hover:text-blue-400 transition-colors cursor-pointer" title="MySQL / Eloquent ORM"></i>
                <i className="devicon-bootstrap-plain hover:text-purple-500 transition-colors cursor-pointer" title="Bootstrap 5"></i>
                <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-brand-cyan transition-colors" title="Vite">VITE</span>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center bento-card p-8 bg-surface-container-lowest/50 border-dashed border-outline-variant/30 hover:border-outline-variant/60 transition-colors flex flex-col justify-center"
            >
              <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-2">Former Legacy Stack</h3>
              <p className="text-xs text-text-secondary mb-6 max-w-xs mx-auto opacity-80">
                <strong>2-Person Team:</strong> Originally built with a partner who developed the raw PHP backend and provided the initial template.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-4xl text-text-muted/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                <span className="font-extrabold text-xl tracking-wider cursor-default hover:text-orange-500 transition-colors" title="XAMPP Local Server">XAMPP</span>
                <i className="devicon-php-plain hover:text-indigo-400 transition-colors cursor-pointer" title="Raw Procedural PHP"></i>
                <i className="devicon-mysql-plain hover:text-blue-400 transition-colors cursor-pointer" title="Direct MySQLi / Raw Dumps"></i>
                <i className="devicon-bootstrap-plain hover:text-purple-500 transition-colors cursor-pointer" title="Older Bootstrap & Basic CSS"></i>
              </div>
            </motion.div>
          </div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Project <span className="text-accent-alt">Modernization Journey</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-layer-group"></i> Architecture Upgrade
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">From Procedural to MVC:</strong> Transitioned from a legacy XAMPP/raw PHP setup to Laravel's robust MVC architecture.</li>
                <li><strong className="text-text-primary">Blade Templates:</strong> Adopted Laravel's templating engine to render dynamic views efficiently.</li>
                <li><strong className="text-text-primary">Modern Build Tool:</strong> Replaced manual asset inclusion with Vite for frontend bundling.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-paint-brush"></i> Premium UI Overhaul
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Cohesive Design System:</strong> Completely revamped an older Bootstrap setup into a modern, visually stunning interface.</li>
                <li><strong className="text-text-primary">Dynamic Interactions:</strong> Integrated AOS (Animate On Scroll) for smooth entry animations and Javascript for an interactive chatbot.</li>
                <li><strong className="text-text-primary">Engaging Elements:</strong> Vector icons via FontAwesome and hover micro-interactions to wow the user.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-database"></i> Database Enhancements
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Eloquent ORM:</strong> Replaced direct MySQLi queries with Laravel's safe and expressive Eloquent ORM.</li>
                <li><strong className="text-text-primary">Migrations over Dumps:</strong> Shifted from raw SQL database dumps to structured, trackable database migrations.</li>
                <li><strong className="text-text-primary">Improved Security:</strong> Benefiting from Laravel's built-in protections against SQL injection and cross-site request forgery.</li>
              </ul>
            </motion.div>
          </div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Showcase <span className="text-accent">Gallery</span>
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto mb-8">
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyageHeroSection.png" alt="Home page preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Landing Page</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyageAbout.png" alt="About section preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">About the Project</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyagePlaces.png" alt="Places preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Destinations</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyageMuseums.png" alt="Museums preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Cultural Highlights</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyageGuide.png" alt="Guide preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Travel Guides</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/LeVoyageFeedback.png" alt="Feedback preview" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Community Feedback</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LeVoyageDocs;
