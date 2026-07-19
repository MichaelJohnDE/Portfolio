'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string | null;
  link: string;
  deployedLink?: string | null;
  projectType: string;
  teamSize: string;
  tags: string[];
  collaborators: { name: string, role?: string }[];
  images: string[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const markdownComponents: any = {
  h2: ({ children }: any) => {
    const text = React.Children.toArray(children).map(c => (typeof c === 'string' ? c : '')).join('').trim();
    const words = text.split(' ');
    const last = words.length > 1 ? words.pop() : '';
    return (
      <motion.h2
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="font-headline-md text-3xl font-bold mb-6 mt-12 text-on-surface"
      >
        {words.join(' ')} <span className="text-primary">{last}</span>
      </motion.h2>
    );
  },
  ul: ({ children }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  ),
  li: ({ children }: any) => (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 signature-shadow-hover transition-all h-full"
    >
      {children}
    </motion.div>
  ),
  h3: ({ children }: any) => (
    <motion.h3 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="text-primary text-lg font-bold mb-3 flex items-center gap-2 font-headline-md"
    >
      <span className="material-symbols-outlined text-[20px]">check_circle</span>
      {children}
    </motion.h3>
  ),
  p: ({ children }: any) => (
    <motion.p 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="font-body-md text-on-surface-variant text-lg leading-relaxed mb-6"
    >
      {children}
    </motion.p>
  ),
  strong: ({ children }: any) => (
    <strong className="text-on-surface font-bold">{children}</strong>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-primary hover:underline transition-colors font-medium" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }: any) => (
    <motion.blockquote 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="border-l-4 border-primary bg-surface-container-high p-6 rounded-r-2xl my-8 italic text-on-surface-variant font-body-md"
    >
      {children}
    </motion.blockquote>
  ),
  code: ({ inline, children, ...props }: any) =>
    inline ? (
      <code className="bg-surface-container-highest text-primary px-1.5 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ) : (
      <motion.pre 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="bg-surface-container-highest p-6 rounded-2xl overflow-x-auto my-8 border border-outline-variant/20 shadow-inner"
      >
        <code className="text-sm font-mono text-on-surface-variant leading-relaxed">{children}</code>
      </motion.pre>
    ),
};

export default function ProjectPageClient({ project }: { project: Project }) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Splits title on " & " for cyan accent on the last part,
   * e.g. "Retail POS & Inventory System" -> "Retail POS & " + cyan("Inventory System")
   * Fallback: last word in cyan
   */
  const renderTitle = (title: string) => {
    if (title.includes(' & ')) {
      const idx = title.lastIndexOf(' & ');
      const before = title.substring(0, idx + 3); // includes " & "
      const after = title.substring(idx + 3);
      return <>{before}<span className="text-accent">{after}</span></>;
    }
    const words = title.split(' ');
    if (words.length > 1) {
      const last = words.pop();
      return <>{words.join(' ')} <span className="text-accent">{last}</span></>;
    }
    return <>{title}</>;
  };

  return (
    <div className="font-sans relative min-h-screen bg-background text-text-primary overflow-x-hidden">

      {/* ── Navbar (matches original: transparent → glass on scroll) ─────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-surface/80 glass-nav shadow-lg border-b border-outline-variant/20 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="w-full mx-auto px-[5%] md:px-[6%] lg:px-[8%] flex justify-between items-center">
          <Link href="/#projects" className="flex items-center gap-2 text-text-secondary hover:text-brand-cyan transition-colors font-medium">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span> Back to Portfolio
          </Link>
          <span className="text-xs font-mono text-text-muted opacity-50 hidden sm:block">{project.projectType}</span>
        </div>
      </nav>

      {/* ── Background (Subtle MD3 pattern) ─────────────────────────── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-outline-variant),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-outline-variant),0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none fixed" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none fixed" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none fixed" />

      {/* ── Main Layout ─────────────────────────────────────────────────── */}
      <section className="py-24 px-[5%] md:px-[6%] lg:px-[8%] relative z-10 min-h-screen">
        <div className="w-full mx-auto max-w-7xl mt-12">
          
          {/* Clean Hero Content */}
          <div className="mb-12 md:mb-16">
            <motion.h1 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="font-headline-lg text-4xl md:text-5xl lg:text-7xl text-on-surface mb-6 tracking-tight max-w-4xl"
            >
              {renderTitle(project.title)}
            </motion.h1>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="font-body-md text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-3xl"
            >
              {project.subtitle}
            </motion.p>
          </div>



          {/* Side-by-Side Content */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            
            {/* Left Sidebar (Sticky Metadata) */}
            <div className="w-full md:w-[30%] lg:w-[25%] flex-shrink-0">
              <div className="sticky top-28 flex flex-col gap-8">
                
                {/* Meta Box */}
                <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 signature-shadow-sm"
                >
                  <div className="mb-6">
                    <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-2 block">Role / Type</span>
                    <div className="flex items-center gap-2 text-on-surface font-medium">
                      <span className="material-symbols-outlined text-[20px] text-primary">category</span>
                      {project.projectType}
                    </div>
                  </div>
                  <div>
                    <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-2 block">Team Size</span>
                    <div className="flex items-center gap-2 text-on-surface font-medium">
                      <span className="material-symbols-outlined text-[20px] text-primary">groups</span>
                      {project.teamSize}
                    </div>
                  </div>
                  {project.deployedLink && (
                    <div className="mt-6 pt-6 border-t border-outline-variant/30">
                      <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm">
                        <span>View Live Project</span>
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </a>
                    </div>
                  )}
                </motion.div>

                {/* Collaborators */}
                {project.collaborators && project.collaborators.length > 0 && (
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 signature-shadow-sm"
                  >
                    <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-4 block">Collaborators</span>
                    <div className="flex flex-col gap-3">
                      {project.collaborators.map((collab, i) => {
                        const name = collab.name || 'Unknown';
                        const role = collab.role;
                        
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-on-surface font-medium text-sm leading-tight">{name}</span>
                              {role && <span className="text-on-surface-variant text-xs mt-0.5">{role}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Technologies */}
                {project.tags && project.tags.length > 0 && (
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 signature-shadow-sm"
                  >
                    <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-4 block">Technologies Used</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-on-primary transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

            {/* Right Main Content */}
            <div className="w-full md:w-[70%] lg:w-[75%] pb-32">
              
              {/* Dynamic Markdown Content */}
              {project.content ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {project.content}
                  </ReactMarkdown>
                </div>
              ) : null}

              {/* Showcase Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-24">
                  <motion.h2
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="font-headline-md text-3xl font-bold mb-10 text-on-surface"
                  >
                    Project <span className="text-primary">Gallery</span>
                  </motion.h2>

                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {project.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedImage(img)}
                        className="group rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 signature-shadow-hover transition-all relative aspect-video cursor-zoom-in"
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Empty state (no images and no content) */}
              {(!project.images || project.images.length === 0) && !project.content && (
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="text-center py-32 bg-surface-container rounded-3xl border border-dashed border-outline-variant/50"
                >
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-50 mb-4 block">construction</span>
                  <p className="text-on-surface font-medium text-xl">Detailed case study coming soon.</p>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-sm cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImage}
              alt="Expanded view"
              className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
