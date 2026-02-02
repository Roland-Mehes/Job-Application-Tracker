'use client';

import { useDroppable } from '@dnd-kit/core';
import KanbanJobCard from './KanbanJobCard';

import type { Column, Job } from '@/types/kanban';

interface Props {
  column: Column;
  jobs: Job[];
  activeJobId?: string;
  placeholderIndex?: number; // hova mutat a placeholder
}

export default function KanbanColumn({ column, jobs }: Props) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 w-80 shrink-0 border border-border rounded-2xl shadow-lg`}
      style={{
        ['--column-color' as string]: `var(--${column.color})`,
      }}
    >
      <h2
        className="font-bold text-lg text-center py-3 rounded-t-2xl"
        style={{
          backgroundColor: `var(--${column.color})`,
          color: 'var(--primary-foreground)',
        }}
      >
        {column.name}
      </h2>

      <div className="px-4 pb-4 flex flex-col gap-4">
        {jobs.map((job) => (
          <KanbanJobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
