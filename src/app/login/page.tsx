"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { logAdminLogin } from './actions';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        // Log the successful login on the server to capture IP and Device
        try {
          await logAdminLogin();
        } catch (logError) {
          console.error("Failed to log admin login:", logError);
        }
        
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      console.error("Login process error:", err);
      setError("An unexpected error occurred during sign in.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-background selection:bg-primary/30">
      
      {/* Clean, subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--on-background) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="z-10 w-full max-w-md p-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full bg-surface p-8 sm:p-10 rounded-[1.5rem] border border-outline-variant/30 signature-shadow relative overflow-hidden"
        >
          {/* Subtle top highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 h-16 w-auto transition-transform hover:scale-105">
              <img 
                src="/assets/images/MJDBuilt_logo.png" 
                alt="Brand Logo" 
                className="h-full w-auto object-contain mx-auto" 
              />
            </Link>
            <h1 className="text-2xl font-display font-bold text-on-surface mb-2 tracking-tight">Admin Portal</h1>
            <p className="text-on-surface-variant text-sm">Sign in to manage your portfolio</p>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-error-container/30 border border-error/20 text-error p-4 rounded-xl mb-6 text-sm flex items-center gap-3 overflow-hidden"
            >
              <span className="material-symbols-outlined text-[20px] flex-shrink-0">error</span>
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-label-caps text-on-surface-variant ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-label-caps text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-container border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-primary text-on-primary font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2 hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
