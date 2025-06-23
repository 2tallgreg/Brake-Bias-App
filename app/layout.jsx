// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header"; // Corrected import path
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StyledComponentsRegistry from '@/lib/registry'; // --- ADD THIS IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brake Bias",
  description: "Aggregated Car Reviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StyledComponentsRegistry> {/* --- WRAP with Registry --- */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}