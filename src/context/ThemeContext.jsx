import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
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

  const toggleTheme = (e) => {
    const isDark = document.documentElement.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';

    // Fallback if View Transitions API is not supported or if triggered without a mouse event
    if (!document.startViewTransition || !e || typeof e.clientX === 'undefined') {
      setTheme(nextTheme);
      return;
    }

    if (window.__themeTransition) {
      window.__themeTransition.skipTransition();
    }

    // Clean up existing style tag if spammed
    const existingStyle = document.getElementById('theme-transition-style');
    if (existingStyle) existingStyle.remove();

    // Disable default crossfade so the clip-path edge is completely sharp
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
    
    // Capture the click coordinates
    const x = e.clientX;
    const y = e.clientY;

    const transition = document.startViewTransition(() => {
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

    window.__themeTransition = transition;

    transition.ready.then(() => {
      // Calculate the radius needed to cover the screen from the click origin
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
          duration: 800, // Slower, more graceful circular reveal
          easing: 'cubic-bezier(0.25, 1, 0.30, 1)',
          // Always animate the NEW theme expanding outward
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    transition.finished.finally(() => {
      const styleToRemove = document.getElementById('theme-transition-style');
      if (styleToRemove) styleToRemove.remove();

      if (window.__themeTransition === transition) {
        window.__themeTransition = null;
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
