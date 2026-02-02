import db from '@/db';
import { kanbanJob } from '@/db/schema/kanban';
import { auth } from '@/lib/auth/auth';
import { asc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';

const getServerJobs = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    throw new Error('You must be logged in to view this page');

  const jobs = await db
    .select()
    .from(kanbanJob)
    .where(eq(kanbanJob.userId, session.user.id))
    .orderBy(asc(kanbanJob.order));

  return jobs;
};

export default getServerJobs;
