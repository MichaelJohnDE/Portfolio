'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, KeyRound, Loader2 } from 'lucide-react';

export default function SudoLockScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/sudo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success! Refresh the page to bypass the layout lock
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-surface-container/60 backdrop-blur-md border border-error/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
      >
        {/* Warning Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-error/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-error/10 text-error mb-4 border border-error/20">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Restricted Area</h2>
          <p className="text-sm text-on-surface-variant">
            You are attempting to access the Danger Zone. Please confirm your password to continue.
          </p>
        </div>

        {error && (
          <div className="bg-error/10 text-error text-sm p-3 rounded-xl mb-6 border border-error/20 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-1.5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-error transition-colors">
                <KeyRound size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-error focus:ring-1 focus:ring-error/50 transition-all"
                required
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-error text-on-error font-medium py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:bg-error/90 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Verifying...
              </>
            ) : (
              'Unlock Danger Zone'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
