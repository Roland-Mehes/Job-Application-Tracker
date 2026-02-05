import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import { auth } from '@/lib/auth/auth';
import Sidebar from '@/components/Dashboard/Sidebar';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Hard auth enforcement
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-dvh flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col h-full">
        <DashboardHeader />
        <main className="flex-1 p-4"> {children}</main>
      </div>
    </div>
  );
}
