import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import ClientProviders from '../components/ClientProviders';
import ThemeToggleFAB from '../components/ThemeToggleFAB';

import type { Metadata } from 'next';
import { prisma } from '../lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  let profile = null;
  try {
    profile = await prisma.profile.findUnique({ where: { id: "singleton" } });
  } catch (e) {
    console.error("Failed to load profile for metadata", e);
  }
  
  const title = profile ? `${profile.firstName} ${profile.lastName} - Portfolio` : 'Michael John Danville Enciso - Portfolio';
  const description = profile ? profile.summary : 'Full-Stack Web Developer Portfolio';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mjd-built.com';

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: profile?.roles || ['Full-Stack Developer', 'Web Development', 'Portfolio', 'Software Engineer'],
    authors: [{ name: profile ? `${profile.firstName} ${profile.lastName}` : 'Michael John Danville Enciso' }],
    creator: profile ? `${profile.firstName} ${profile.lastName}` : 'Michael John Danville Enciso',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      title,
      description,
      siteName: profile?.logoText || 'MJDBuilt',
      images: [
        {
          url: `${baseUrl}/assets/images/LinkedIn-Banner.png`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/assets/images/LinkedIn-Banner.png`],
    },
    icons: {
      icon: '/assets/images/MJDBuilt_logo.png',
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-surface text-on-surface">
        <ThemeProvider>
          <ClientProviders>
            {children}
            <ThemeToggleFAB />
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
