"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, MouseEvent } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: MouseEvent<HTMLElement> | null) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'dark'; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e?: MouseEvent<HTMLElement> | null) => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    if (!(document as any).startViewTransition || !e || typeof e.clientX === 'undefined') {
      setTheme(nextTheme);
      return;
    }

    const win = window as any;
    if (win.__themeTransition) {
      win.__themeTransition.skipTransition();
    }

    const existingStyle = document.getElementById('theme-transition-style');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'theme-transition-style';
    style.innerHTML = `
      * { transition: none !important; }
      ::view-transition-old(root) {
        animation: none;
        opacity: 1;
        z-index: 1;
      }
      ::view-transition-new(root) {
        animation: none;
        opacity: 1;
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
    
    const x = e.clientX;
    const y = e.clientY;

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      const root = window.document.documentElement;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    });

    win.__themeTransition = transition;

    transition.ready.then(() => {
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`
      ];
      
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 800,
          easing: 'cubic-bezier(0.25, 1, 0.30, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    transition.finished.finally(() => {
      const styleToRemove = document.getElementById('theme-transition-style');
      if (styleToRemove) styleToRemove.remove();

      if (win.__themeTransition === transition) {
        win.__themeTransition = null;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
