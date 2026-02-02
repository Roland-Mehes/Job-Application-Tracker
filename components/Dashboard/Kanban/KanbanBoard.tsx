'use client';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useState } from 'react';
import { DEFAULT_COLUMNS, DEFAULT_JOBS } from '@/constants';
import KanbanColumn from './KanbanColumn';
import type { Job } from '@/types/kanban';
import JobCard from './JobCard';

export default function KanbanBoard() {
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);
  const [activeItem, setActiveItem] = useState<Job | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const job = jobs.find((j) => j.id === event.active.id);
    setActiveItem(job ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setJobs((prev) => {
      const activeJob = prev.find((j) => j.id === active.id);
      const overJob = prev.find((j) => j.id === over.id);

      if (!activeJob || !overJob) return prev;

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
            jobs={jobs.filter((job) => job.status === column.id)}
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
    await fetch('/api/kanban/move', {
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
