import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from "sonner";
import { ConfirmProvider } from '@/components/confirm/ConfirmProvider';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={`${outfit.className} dark:bg-gray-900 text-gray-800 dark:text-white/90`}>
        <ThemeProvider>
          <ConfirmProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ConfirmProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
