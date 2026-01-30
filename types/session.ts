import { auth } from '@/lib/auth/auth';

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
