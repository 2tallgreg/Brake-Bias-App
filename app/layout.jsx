// app/layout.jsx
import './globals.css';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata = {
  title: 'Brake Bias - Car Review Aggregator',
  description: 'Stop Guessing. Start Driving. Your definitive source for aggregated car reviews.',
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