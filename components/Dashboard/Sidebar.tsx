'use client';
import { Sidebar as SidebarIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`relative h-full `}>
      <div>
        <SidebarIcon
          size={20}
          className={`absolute z-50 cursor-pointer top-0 right-0`}
          onClick={() => setIsOpen(!isOpen)}
        ></SidebarIcon>

        <div
          className={`border-r-2 border-dashed border-border p-4 h-full
  overflow-hidden transition-[max-width] duration-700
  ${isOpen ? 'max-w-56' : 'max-w-0'}`}
        >
          <li className={` ${isOpen ? 'block' : 'hidden'}`}>
            <ul>
              <li>
                <Link href="">Jobs</Link>
              </li>
              <li>
                <Link href="/dashboard/server">Database</Link>
              </li>
              <li>
                <Link href="">Settings</Link>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
