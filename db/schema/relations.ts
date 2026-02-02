import { relations } from 'drizzle-orm';
import { user } from './auth';
import { kanbanJob } from './kanban';

// Relations between user and kanbanJob
export const userRelations = relations(user, ({ many }) => ({
  kanbanJobs: many(kanbanJob),
}));
