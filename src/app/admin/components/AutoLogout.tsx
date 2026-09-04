'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoLogout({ timeoutMinutes = 30 }: { timeoutMinutes?: number }) {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/auth/signout', { method: 'POST' });
      router.push('/login?message=Session expired due to inactivity');
      router.refresh();
    } catch (err) {
      console.error('Failed to auto-logout', err);
    }
  }, [router]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Set timer to trigger logout after timeoutMinutes
      timeoutId = setTimeout(handleLogout, timeoutMinutes * 60 * 1000);
    };

    // Initialize the timer
    resetTimer();

    // Events that indicate the user is active
    const events = ['mousemove', 'keydown', 'wheel', 'DOMMouseScroll', 'mouseWheel', 'mousedown', 'touchstart', 'touchmove'];

    events.forEach((event) => {
      // Use { passive: true } to not block scrolling
      window.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [handleLogout, timeoutMinutes]);

  return null; // This component doesn't render anything
}
