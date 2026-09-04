'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ViewTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track once per path change
    if (trackedPath.current === pathname) return;
    
    // Prevent tracking in admin dashboard
    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return;

    trackedPath.current = pathname;

    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: pathname }),
    }).catch((err) => {
      console.error('Failed to track view', err);
    });
  }, [pathname]);

  return null;
}
