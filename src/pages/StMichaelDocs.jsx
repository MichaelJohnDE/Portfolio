import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const StMichaelDocs = () => {
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
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none fixed"></div>

      <section className="py-32 px-[5%] md:px-[6%] lg:px-[8%] relative z-10">
        <div className="w-full mx-auto">
          <motion.h1 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6"
          >
            St. Michael <span className="text-accent">Lights & Sounds</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center text-text-secondary max-w-3xl mx-auto mb-16 text-lg"
          >
            <strong>St. Michael Lights & Sounds</strong> is a premium, high-impact advertisement platform designed
            for a professional audio-visual rental company. This project focuses on high-end nocturnal aesthetics,
            smooth animations, and a seamless cross-platform user experience, delivering an immersive "live event"
            vibe to potential clients.
          </motion.p>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16 max-w-4xl mx-auto bento-card p-8"
          >
            <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-6">Powered By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-4xl text-text-secondary">
              <i className="devicon-react-original hover:text-cyan-400 transition-colors cursor-pointer"></i>
              <i className="devicon-tailwindcss-plain hover:text-cyan-400 transition-colors cursor-pointer"></i>
              <i className="devicon-vitejs-plain hover:text-purple-400 transition-colors cursor-pointer"></i>
              <i className="devicon-cloudflare-plain hover:text-yellow-500 transition-colors cursor-pointer"></i>
              <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-brand-cyan transition-colors">FRAMER MOTION</span>
            </div>
          </motion.div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Technical <span className="text-accent-alt">Architecture</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-video"></i> Video Player
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">YouTube Integration:</strong> Uses the official YouTube player for high-quality video playback.</li>
                <li><strong className="text-text-primary">Play on Scroll:</strong> Automatically starts playing (muted) when you scroll to the video section.</li>
                <li><strong className="text-text-primary">Mobile Friendly:</strong> Switch to a popup video on phones to save space and make it easier to watch.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-wave-square"></i> Smooth Animations
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Soundwave Effects:</strong> Simple, moving shapes that give the site a "live event" feeling.</li>
                <li><strong className="text-text-primary">Interactive Design:</strong> Hover effects and transitions that make the site feel responsive.</li>
                <li><strong className="text-text-primary">Fast Performance:</strong> Optimized to run smoothly on both computers and mobile devices.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-bolt"></i> Fast Hosting
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Cloudflare Pages:</strong> Hosted on a fast global network for quick loading times.</li>
                <li><strong className="text-text-primary">Instant Updates:</strong> Brand assets like the logo update immediately for all users.</li>
                <li><strong className="text-text-primary">Modern Build:</strong> Built with React and Vite for a clean, stable website codebase.</li>
              </ul>
            </motion.div>
          </div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            Live <span className="text-accent">Preview</span>
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="bento-card p-4 max-w-4xl mx-auto mb-8 hover:border-brand-emerald/50">
              <img src="/assets/images/stmichael_preview.png" alt="Preview" className="rounded-xl w-full h-auto" />
            </div>
            <a href="https://stmichaelpro.qzz.io/" target="_blank" rel="noreferrer" className="btn btn-primary px-8 text-lg font-bold">
              <i className="fas fa-external-link-alt pb-0.5 mr-2"></i> Visit Live Website
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StMichaelDocs;
