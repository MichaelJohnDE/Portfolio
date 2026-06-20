import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const RetailPosDocs = () => {
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
            Retail POS & <span className="text-accent">Inventory System</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center text-text-secondary max-w-3xl mx-auto mb-16 text-lg"
          >
            <strong>A dual-application retail solution</strong> featuring an Inventory Management System and a Point of Sale (POS). The administrative app allows managers to catalog products and track stock. The POS streamlines checkouts, applies dynamic discounts, and automatically syncs to deduct purchased items, ensuring accurate, real-time inventory management.
          </motion.p>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16 max-w-4xl mx-auto bento-card p-8"
          >
            <h3 className="text-sm text-text-muted uppercase tracking-widest font-bold mb-6">Powered By</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-4xl text-text-secondary">
              <i className="devicon-dot-net-plain hover:text-purple-500 transition-colors cursor-pointer" title=".NET Framework"></i>
              <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-brand-cyan transition-colors" title="VB.NET">VB.NET</span>
              <span className="font-extrabold text-xl tracking-wider text-text-primary cursor-default hover:text-blue-400 transition-colors" title="Windows Forms">WinForms</span>
              <i className="devicon-sqlite-plain hover:text-blue-400 transition-colors cursor-pointer" title="SQLite"></i>
            </div>
          </motion.div>

          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-8 text-center tracking-tight"
          >
            System <span className="text-accent-alt">Architecture</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-layer-group"></i> N-Tier Structure
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Shared Backend:</strong> Uses a distinct class library that encapsulates all database queries and logic.</li>
                <li><strong className="text-text-primary">Separation of Concerns:</strong> Cleanly separates the data layer from the user interfaces for better maintainability.</li>
                <li><strong className="text-text-primary">Dual Application:</strong> Features separate administrative and POS apps acting on the same logic tier.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-desktop"></i> Desktop GUI
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">Windows Forms:</strong> Leverages WinForms for a responsive and intuitive desktop user interface.</li>
                <li><strong className="text-text-primary">VB.NET Core:</strong> Application logic, data flow orchestration, and UI events powered by robust VB.NET.</li>
                <li><strong className="text-text-primary">Real-time Feedback:</strong> Immediate visual updates for checkout and inventory actions.</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bento-card p-8">
              <h3 className="text-brand-cyan text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-database"></i> Database Engine
              </h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li><strong className="text-text-primary">SQLite:</strong> A lightweight, serverless relational database engine used for persistent storage.</li>
                <li><strong className="text-text-primary">Devart dotConnect:</strong> Provides reliable and efficient ADO.NET database connectivity.</li>
                <li><strong className="text-text-primary">Data Integrity:</strong> Ensures secure and consistent catalog, stock, and transaction recording.</li>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              <div className="md:col-span-3 bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/Home.png" alt="Main Dashboard" className="rounded-xl w-full h-auto object-cover max-h-[400px]" />
                <p className="text-sm text-text-muted mt-3 text-center">Main System Dashboard</p>
              </div>
              
              {/* POS Section */}
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/POS1.png" alt="POS interface" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Point of Sale (POS) Interface</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/pos2.png" alt="POS checkout" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">POS Checkout Process</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/pos3.png" alt="POS receipt" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">POS Transaction Management</p>
              </div>

              {/* PMS Section */}
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/pms1.png" alt="Admin Dashboard" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Inventory Management Dashboard</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/pms2.png" alt="Product Catalog" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Product Catalog & Tracking</p>
              </div>
              <div className="bento-card p-4 hover:border-brand-cyan/50 transition-colors">
                <img src="/assets/images/pms3.png" alt="Stock Levels" className="rounded-xl w-full h-auto" />
                <p className="text-sm text-text-muted mt-3">Administrative Controls</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RetailPosDocs;
