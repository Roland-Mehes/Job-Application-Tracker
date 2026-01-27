import type { Metadata } from 'next';

import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Job Application Tracker',
  description: 'Track and save your job applications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
