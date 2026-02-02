'use client';
import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/constants';
import UserDropdownMenu from './UserDropdownMenu';
import type { Session } from '@/types/session';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = ({ session }: { session: Session }) => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 text-foreground backdrop-blur border-b border-border  ">
        <div className="container mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold text-primary">
            <Link href={'/'}>Logo</Link>
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-4">
            {session?.user ? (
              <div>
                <UserDropdownMenu session={session} />
              </div>
            ) : (
              <nav className="flex gap-6 md:gap-12">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm relative "
                    key={item.name}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
