// app/layout.jsx
import './globals.css';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata = {
  title: 'Brake Bias - Car Review Aggregator',
  description: 'Find comprehensive car reviews and pricing information from professionals and owners',
  keywords: 'car reviews, vehicle comparison, automotive, car pricing',
  authors: [{ name: 'Brake Bias Team' }],
  openGraph: {
    title: 'Brake Bias - Car Review Aggregator',
    description: 'Find comprehensive car reviews and pricing information',
    url: 'https://brakebias.com',
    siteName: 'Brake Bias',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brake Bias - Car Review Aggregator',
    description: 'Find comprehensive car reviews and pricing information',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}