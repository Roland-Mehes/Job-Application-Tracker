export const KANBAN_STATUSES = ['attended', 'rejected', 'interview'] as const;

export type KanbanStatus = (typeof KANBAN_STATUSES)[number];

export function normalizeKanbanStatus(status: string): KanbanStatus {
  const normalized = status.toLowerCase().trim();

  if (!KANBAN_STATUSES.includes(normalized as KanbanStatus)) {
    throw new Error(`Invalid kanban status from DB: "${status}"`);
  }

  return normalized as KanbanStatus;
}
