import db from '@/db';
import { kanbanJob } from '@/db/schema/kanban';
import { auth } from '@/lib/auth/auth';
import { asc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { normalizeKanbanStatus } from '@/types/kanbanStatus';
import type { Job } from '@/types/kanban';

const getServerJobs = async (): Promise<Job[]> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error('You must be logged in to view this page');
  }

  const dbJobs = await db
    .select()
    .from(kanbanJob)
    .where(eq(kanbanJob.userId, session.user.id))
    .orderBy(asc(kanbanJob.order));

  return dbJobs.map((job) => ({
    id: job.id,
    status: normalizeKanbanStatus(job.status),
    jobTitle: job.title,
    companyName: job.company ?? '',
    description: job.description ?? '',
    salary: job.salary ?? '',
    interviewDate: job.interviewDate?.toISOString(),
    order: job.order,
    skills: job.skills || [],
    createdAt: job.createdAt.toISOString(),
  }));
};

export default getServerJobs;
