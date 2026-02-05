'use client';

import { signOutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

export const LogoutBtn = () => {
  return (
    <Button onClick={signOutAction} variant="ghost" className="w-full">
      Sign Out
    </Button>
  );
};
