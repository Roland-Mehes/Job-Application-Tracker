import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';

import Navbar from '@/components/Navbar';
import { auth } from '@/lib/auth/auth';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Job Application Tracker',
  description: 'Track and save your job applications',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ThemeProviderWrapper>
          <Navbar session={session} />

          <main className="flex-1">{children}</main>

          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
