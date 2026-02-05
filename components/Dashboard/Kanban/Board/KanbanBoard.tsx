'use client';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useMemo, useState } from 'react';
import { DEFAULT_COLUMNS } from '@/constants';
import KanbanColumn from '@/components/Dashboard/Kanban/Column/KanbanColumn';
import type { Job } from '@/types/kanban';
import JobCard from '../Cards/JobCard';

type Props = {
  initialJobs: Job[];
};

export default function KanbanBoard({ initialJobs }: Props) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [activeItem, setActiveItem] = useState<Job | null>(null);

  const jobsByStatus = useMemo(() => {
    const map: Record<string, Job[]> = {
      attended: [],
      rejected: [],
      interview: [],
    };

    jobs.forEach((job) => {
      map[job.status].push(job);
    });

    return map;
  }, [jobs]);

  function handleDragStart(event: DragStartEvent) {
    const job = jobs.find((j) => j.id === event.active.id);

    setActiveItem(job ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setJobs((prev) => {
      const activeJob = prev.find((j) => j.id === active.id);
      if (!activeJob) return prev;

      // If we dropped on epmty column
      const columnDrop = DEFAULT_COLUMNS.find((col) => col.id === over.id);
      if (columnDrop) {
        const newStatus = columnDrop.id;
        const targetJobs = prev.filter((j) => j.status === newStatus);
        const newOrder = targetJobs.length;

        persistChanges(undefined, {
          id: activeJob.id,
          status: newStatus,
          targetOrder: newOrder,
        });

        return prev.map((j) =>
          j.id === activeJob.id
            ? { ...j, status: newStatus, order: newOrder }
            : j,
        );
      }

      // If we dropped on a card job
      const overJob = prev.find((j) => j.id === over.id);
      if (!overJob) return prev;

      // SAME COLUMN
      if (activeJob.status === overJob.status) {
        const columnJobs = prev
          .filter((j) => j.status === activeJob.status)
          .sort((a, b) => a.order - b.order);

        const oldIndex = columnJobs.findIndex((j) => j.id === active.id);
        const newIndex = columnJobs.findIndex((j) => j.id === over.id);

        const reordered = arrayMove(columnJobs, oldIndex, newIndex).map(
          (job, index) => ({ ...job, order: index }),
        );

        const newState = prev.map((job) =>
          job.status === activeJob.status
            ? reordered.find((j) => j.id === job.id)!
            : job,
        );

        // Database
        persistChanges(reordered);
        // Database

        return newState;
      }

      // DIFFERENT COLUMN
      const sourceJobs = prev
        .filter((j) => j.status === activeJob.status)
        .sort((a, b) => a.order - b.order)
        .filter((j) => j.id !== activeJob.id);

      const targetJobs = prev
        .filter((j) => j.status === overJob.status)
        .sort((a, b) => a.order - b.order);

      const newIndex = targetJobs.findIndex((j) => j.id === over.id);

      const updatedTarget = [
        ...targetJobs.slice(0, newIndex),
        { ...activeJob, status: overJob.status },
        ...targetJobs.slice(newIndex),
      ].map((job, index) => ({ ...job, order: index }));

      const updatedSource = sourceJobs.map((job, index) => ({
        ...job,
        order: index,
      }));

      // Database
      persistChanges(undefined, {
        id: activeJob.id,
        status: overJob.status,
        targetOrder: newIndex,
      });
      // Database

      return [
        ...prev.filter(
          (j) => j.status !== activeJob.status && j.status !== overJob.status,
        ),
        ...updatedSource,
        ...updatedTarget,
      ];
    });
  }

  function handleDragCancel() {
    setActiveItem(null);
  }

  return (
    <DndContext
      id="draggable-table-01"
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-6 overflow-x-auto mx-auto min-h-[70vh]">
        {DEFAULT_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            jobs={jobsByStatus[column.id] ?? []}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? <JobCard {...activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

//**
// Kesobb torolni!!!
//  */

async function persistChanges(
  newJobs?: Job[],
  movedJob?: { id: string; status: string; targetOrder: number },
) {
  try {
    await fetch('/api/kanban/move/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobs: movedJob ? undefined : newJobs,
        movedJob,
      }),
    });
  } catch (err) {
    console.error('Failed to persist Kanban changes', err);
  }
}
