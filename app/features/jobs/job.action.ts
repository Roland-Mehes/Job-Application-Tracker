'use server';

import db from '@/db';
import { kanbanJob } from '@/db/schema/kanban';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { eq, asc } from 'drizzle-orm';
import { CreateJobInput } from './job.schema';

export async function createJob(input: CreateJobInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const [lastJob] = await db
    .select({ order: kanbanJob.order })
    .from(kanbanJob)
    .where(eq(kanbanJob.userId, userId))
    .orderBy(asc(kanbanJob.order))
    .limit(1);

  await db.insert(kanbanJob).values({
    id: crypto.randomUUID(),
    userId,
    status: 'attended',
    order: (lastJob?.order ?? 0) + 1,
    ...input,
  });
}

export async function getJobs() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const jobs = await db
    .select()
    .from(kanbanJob)
    .where(eq(kanbanJob.userId, userId))
    .orderBy(asc(kanbanJob.order));

  return jobs;
}
