import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import ClientProviders from '../components/ClientProviders';
import ThemeToggleFAB from '../components/ThemeToggleFAB';

export const metadata = {
  title: 'Michael John Danville Enciso - Portfolio',
  description: 'Full-Stack Web Developer Portfolio',
  icons: {
    icon: '/assets/images/MJDBuilt_logo.png',
  },
};

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
