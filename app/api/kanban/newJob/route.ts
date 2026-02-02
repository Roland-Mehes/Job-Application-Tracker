// /app/api/jobs/kanban/newJob/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { kanbanJob } from '@/db/schema/kanban';
import { auth } from '@/lib/auth/auth';
import { v4 as uuid } from 'uuid';
import { eq, desc } from 'drizzle-orm';
import { headers } from 'next/headers';

type DefaultStatus = 'attended' | 'rejected' | 'interview';

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { company, title, description } = await req.json();

  const userId = session.user.id;

  const maxOrderResult = await db
    .select({ maxOrder: kanbanJob.order })
    .from(kanbanJob)
    .where(eq(kanbanJob.userId, userId))
    .orderBy(desc(kanbanJob.order))
    .limit(1);

  const nextOrder =
    maxOrderResult[0]?.maxOrder != null ? maxOrderResult[0].maxOrder + 1 : 0;

  const newJob = {
    id: uuid(),
    userId,
    status: 'attended' as DefaultStatus, // default column
    title,
    company,
    description,
    order: nextOrder,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(kanbanJob).values(newJob);

  return NextResponse.json(newJob);
}
