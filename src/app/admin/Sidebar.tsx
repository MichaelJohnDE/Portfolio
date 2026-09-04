'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Skills', href: '/admin/skills', icon: 'psychology' },
    { name: 'Experience', href: '/admin/experience', icon: 'work' },
    { name: 'Projects', href: '/admin/projects', icon: 'integration_instructions' },
    { name: 'Certifications', href: '/admin/certifications', icon: 'workspace_premium' },
    { name: 'Profile & Settings', href: '/admin/profile', icon: 'settings' },
    { name: 'Danger Zone', href: '/admin/danger-zone', icon: 'warning' },
  ];

  return (
    <>
      <aside className={`bg-surface border-r border-outline-variant/20 hidden md:flex flex-col h-screen sticky top-0 z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`p-6 border-b border-outline-variant/20 flex items-center justify-between`}>
          {!isCollapsed ? (
            <div>
              <Link href="/admin" className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface whitespace-nowrap overflow-hidden">
                Admin <span className="text-primary">Panel</span>
              </Link>
              <p className="text-on-surface-variant text-sm mt-1 truncate">{userEmail}</p>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <span className="font-bold text-primary text-xl">A</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            // Dashboard should match exactly, others can match prefix
            const isActive = link.href === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(link.href);
              
            return (
              <Link
                key={link.name}
                href={link.href}
                title={isCollapsed ? link.name : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive 
                    ? (link.name === 'Danger Zone' ? 'bg-error text-on-error font-bold' : 'bg-primary text-on-primary font-bold') 
                    : (link.name === 'Danger Zone' ? 'text-error hover:bg-error/10' : 'text-on-surface hover:bg-surface-variant hover:text-primary')
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <span className={`material-symbols-outlined text-[20px] transition-colors ${
                  isActive 
                    ? (link.name === 'Danger Zone' ? 'text-on-error' : 'text-on-primary')
                    : (link.name === 'Danger Zone' ? 'text-error group-hover:text-error' : 'text-on-surface-variant group-hover:text-primary')
                }`}>
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span className={`font-medium text-sm whitespace-nowrap`}>{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className={`p-4 border-t border-outline-variant/20 flex ${isCollapsed ? 'flex-col gap-2' : 'items-center justify-between gap-2'}`}>
          <form action="/auth/signout" method="post" className={isCollapsed ? 'w-full' : 'flex-1'}>
            <button 
              title={isCollapsed ? "Sign Out" : undefined}
              className={`flex items-center gap-3 w-full px-3 py-2.5 transition-colors rounded-lg ${
                isCollapsed ? 'justify-center' : ''
              } text-on-surface-variant hover:text-error hover:bg-error/10`}
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Sign Out</span>}
            </button>
          </form>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className={`p-2.5 text-on-surface-variant hover:bg-surface-variant hover:text-primary rounded-lg transition-colors flex-shrink-0 ${isCollapsed ? 'w-full flex justify-center' : ''}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isCollapsed ? 'menu' : 'menu_open'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
