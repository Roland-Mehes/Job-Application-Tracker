import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { kanbanJob } from '@/db/schema/kanban';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth/auth'; // better-auth session helper

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession();
  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { jobs, movedJob } = body; // jobs = új sorrend, movedJob = { id, status, targetOrder }

  const userId = session.user.id;

  await db.transaction(async (tx) => {
    // 1. ha ugyanazon oszlopban reorder
    if (jobs) {
      for (const job of jobs) {
        await tx
          .update(kanbanJob)
          .set({ order: job.order })
          .where(eq(kanbanJob.id, job.id));
      }
    }

    // 2. ha másik oszlopba mozgatták
    if (movedJob) {
      const { id, status, targetOrder } = movedJob;

      // előző oszlop order csökkentése
      const prevJob = await tx
        .select()
        .from(kanbanJob)
        .where(eq(kanbanJob.id, id))
        .then((r) => r[0]);
      if (prevJob) {
        await tx.execute(sql`
          UPDATE kanban_job
          SET "order" = "order" - 1
          WHERE user_id = ${userId}
            AND status = ${prevJob.status}
            AND "order" > ${prevJob.order}
        `);
      }

      // új oszlopban hely csinálása
      await tx.execute(sql`
        UPDATE kanban_job
        SET "order" = "order" + 1
        WHERE user_id = ${userId}
          AND status = ${status}
          AND "order" >= ${targetOrder}
      `);

      // maga a kártya mozgatása
      await tx
        .update(kanbanJob)
        .set({ status, order: targetOrder })
        .where(eq(kanbanJob.id, id));
    }
  });

  return NextResponse.json({ success: true });
}
