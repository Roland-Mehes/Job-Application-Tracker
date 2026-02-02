import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const kanbanJob = pgTable(
  'kanban_job',
  {
    id: text('id').primaryKey(),

    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    status: text('status')
      .$type<'attended' | 'rejected' | 'interview'>()
      .notNull(),

    title: text('title').notNull(),
    company: text('company'),
    description: text('description'),
    salary: text('salary'),

    interviewDate: timestamp('interview_date'),

    order: integer('order').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('kanban_job_user_idx').on(table.userId),
    index('kanban_job_user_status_order_idx').on(
      table.userId,
      table.status,
      table.order,
    ),
  ],
);
