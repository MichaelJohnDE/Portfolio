import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
      },
      cookies: {
        get(name) {
          if (typeof document === 'undefined') return undefined;
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? match[2] : undefined;
        },
        set(name, value, options) {
          if (typeof document === 'undefined') return;
          // Strip expiration to create a session cookie
          const { maxAge, expires, ...rest } = options;
          let cookieStr = `${name}=${value}`;
          if (rest.domain) cookieStr += `; domain=${rest.domain}`;
          if (rest.path) cookieStr += `; path=${rest.path}`;
          if (rest.sameSite) cookieStr += `; samesite=${rest.sameSite}`;
          if (rest.secure) cookieStr += `; secure`;
          document.cookie = cookieStr;
        },
        remove(name, options) {
          if (typeof document === 'undefined') return;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${options.path || '/'}`;
        },
      }
    }
  )
}
