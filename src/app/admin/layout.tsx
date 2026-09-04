import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import Link from 'next/link';

import Sidebar from './Sidebar';
import AutoLogout from './components/AutoLogout';

import { ToastProvider } from '../../contexts/ToastContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Protect the admin routes (except the login page itself, which handles its own layout/auth)
  if (!user) {
    redirect('/login');
  }

  return (
    <ToastProvider>
      <AutoLogout timeoutMinutes={30} />
      <div className="min-h-screen bg-background flex">
        {/* Sidebar Navigation */}
        <Sidebar userEmail={user.email} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden relative w-full">
          {/* Mobile Header */}
          <header className="md:hidden bg-surface border-b border-outline-variant/20 h-16 flex items-center justify-between px-4 sticky top-0 z-10">
            <Link href="/admin" className="font-bold text-on-surface">
              Admin <span className="text-primary">Panel</span>
            </Link>
            {/* Add a simple mobile menu toggle here if needed later */}
            <form action="/auth/signout" method="post">
              <button className="text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </form>
          </header>
          
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
