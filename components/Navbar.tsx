import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/constants';

const Navbar = () => {
  return (
    <header className="sticky z-999 bg-white/80 backdrop-blur border-b flex justify-between mb-10">
      <div className="container mx-auto px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold">Logo</div>

        {/* Navigation */}
        <nav className="flex gap-12">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              className="text-sm font-medium text-gray-600 hover:text-black transition"
              key={item.name}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
