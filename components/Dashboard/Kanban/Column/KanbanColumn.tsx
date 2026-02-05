'use client';
import { useDroppable } from '@dnd-kit/core';
import KanbanJobCard from '../Cards/KanbanJobCard';
import type { Column, Job } from '@/types/kanban';

export default function KanbanColumn({
  column,
  jobs,
}: {
  column: Column;
  jobs: Job[];
}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 w-80 shrink-0 border border-border rounded-2xl shadow-lg min-h-50"
      style={{ ['--column-color' as string]: `var(--${column.color})` }}
    >
      <h2
        className="font-bold text-lg text-center py-3 rounded-t-2xl"
        style={{
          backgroundColor: `var(--${column.color})`,
          color: 'var(--primary-foreground)',
        }}
      >
        ({jobs.length}) {column.name}
      </h2>
      <div className="px-4 pb-4 flex flex-col gap-4">
        {jobs.length === 0 ? (
          <div className="flex items-center justify-center text-muted-foreground italic border-2 border-dashed rounded h-32">
            No jobs in this column
          </div>
        ) : (
          jobs.map((job) => <KanbanJobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
