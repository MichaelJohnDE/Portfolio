'use client';

import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function VercelAnalytics() {
  const pathname = usePathname();

  // Exclude admin and login routes (public side only)
  if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          if (event.url.includes('/admin') || event.url.includes('/login')) {
            return null;
          }
          return event;
        }}
      />
      <SpeedInsights
        beforeSend={(data) => {
          // Ignore non-navigation requests (Server Actions, API calls)
          // to prevent 'startTime' crash on failed POSTs
          if (
            data.url.includes('/admin') ||
            data.url.includes('/login') ||
            data.url.includes('/api/')
          ) {
            return null;
          }
          return data;
        }}
      />
    </>
  );
}
