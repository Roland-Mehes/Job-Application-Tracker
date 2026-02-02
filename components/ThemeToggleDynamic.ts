'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./ThemeSwitcher'), {
  ssr: false, // ensures the toggle only renders on client
});
