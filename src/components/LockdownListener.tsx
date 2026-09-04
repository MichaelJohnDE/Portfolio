'use client';

import { useEffect, useState, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function LockdownListener() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const [isRestoring, setIsRestoring] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const [isPending, startTransition] = useTransition();
  const [isWaitingForRefresh, setIsWaitingForRefresh] = useState(false);

  // When a refresh finishes, we can remove the glitch overlay smoothly
  useEffect(() => {
    if (isWaitingForRefresh && !isPending) {
      setIsWaitingForRefresh(false);
      setIsGlitching(false);
      setIsRestoring(false);
    }
  }, [isPending, isWaitingForRefresh]);

  useEffect(() => {
    const supabase = createClient();
    
    // Listen for any updates to the Profile table
    const channel = supabase
      .channel('public:Profile')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Profile',
        },
        (payload) => {
          // Skip animations for admin and login routes so you aren't interrupted while working
          if (pathnameRef.current?.startsWith('/admin') || pathnameRef.current?.startsWith('/login')) {
            console.log('Admin route detected, skipping public lockdown animations.');
            router.refresh();
            return;
          }

          // Supabase Realtime only sends payload.old if the Postgres table is set to REPLICA IDENTITY FULL.
          // So we can't rely on payload.old. Instead, we can just check if it was explicitly updated to false.
          // To prevent it from firing on every profile update, we can check if it's transitioning to false.
          if (payload.new?.isLockedDown === false) {
            setIsRestoring(true);
            console.log('Profile updated to unlocked, morphing to restored screen...');
            
            // Wait 2.5 seconds to show the restored splash, then trigger the server transition
            setTimeout(() => {
              setIsWaitingForRefresh(true);
              startTransition(() => {
                router.refresh();
              });
            }, 2500); 
          } else if (payload.new?.isLockedDown === true) {
            // Trigger glitch animation for lockdown
            setIsGlitching(true);
            console.log('Profile updated to locked, triggering glitch sequence...');
            
            // Wait for the fall animation to mostly finish, then start the server transition
            setTimeout(() => {
              setIsWaitingForRefresh(true);
              startTransition(() => {
                router.refresh();
              });
            }, 2500); 
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {isRestoring && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          <motion.div
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div className="mb-8">
              <motion.div 
                layoutId="lockdown-icon-container"
                className="w-24 h-24 bg-brand-cyan/10 backdrop-blur-md rounded-3xl border border-brand-cyan/50 flex items-center justify-center text-brand-cyan shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              >
                <ShieldCheck size={48} />
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-[10vw] sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-brand-cyan/70 tracking-tight mb-4 whitespace-nowrap"
            >
              System Restored
            </motion.h1>
            <motion.p 
              className="text-brand-cyan font-mono tracking-widest text-sm uppercase flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Public Access Online
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {isGlitching && (
        <motion.div
          key="glitch-overlay"
          className="fixed inset-0 z-[9999] lockdown-overlay pointer-events-none flex flex-col items-center justify-center overflow-hidden bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Global CSS to make the rest of the site detach and fall down */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .public-site-content {
                animation: systemFall 2.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards !important;
                transform-origin: top center;
                pointer-events: none;
              }
              @keyframes systemFall {
                0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
                20% { transform: translateY(10px) scale(0.98) rotate(-1deg); filter: blur(2px); }
                100% { transform: translateY(100vh) scale(0.8) rotate(-5deg); opacity: 0; filter: blur(10px); }
              }
            `
          }} />

          {/* Falling Digital Code lines (Matrix style but Cyan) */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            className="absolute left-[20%] w-[1px] h-32 bg-brand-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
          />
          <motion.div
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity, delay: 0.2 }}
            className="absolute left-[80%] w-[2px] h-20 bg-brand-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
          />
          <motion.div
            animate={{ top: ["-5%", "105%"] }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity, delay: 0.5 }}
            className="absolute left-[50%] w-[1px] h-48 bg-error/50 shadow-[0_0_15px_rgba(255,0,0,0.8)] z-10"
          />

          {/* Sleek Warning Message */}
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            className="z-20 flex flex-col items-center"
          >
            <motion.div className="mb-6">
              <motion.div 
                layoutId="lockdown-icon-container" 
                className="w-24 h-24 bg-error/10 backdrop-blur-md rounded-3xl border border-error/50 flex items-center justify-center text-error shadow-[0_0_50px_rgba(255,0,0,0.4)]"
              >
                <ShieldCheck size={48} className="drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-error font-mono text-[7vw] sm:text-4xl md:text-6xl font-light tracking-[0.1em] md:tracking-widest uppercase mb-2 text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] whitespace-nowrap"
            >
              System Override
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
