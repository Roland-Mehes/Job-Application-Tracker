'use client';

import { useDroppable } from '@dnd-kit/core';
import DraggableJobCard from './DraggableJobCard';

import type { Column, Job } from '@/types/kanban';

interface Props {
  column: Column;
  jobs: Job[];
  activeJobId?: string;
  placeholderIndex?: number; // hova mutat a placeholder
}

export default function KanbanColumn({ column, jobs }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 w-80 shrink-0 rounded-2xl bg-muted shadow-lg ${isOver ? 'border-2 border-green-500' : ''} `}
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
          <DraggableJobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
