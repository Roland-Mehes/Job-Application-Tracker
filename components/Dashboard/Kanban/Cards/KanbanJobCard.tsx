'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDndContext } from '@dnd-kit/core';
import JobCard from '../Cards/JobCard';
import type { Job } from '@/types/kanban';

export default function KanbanJobCard({ job }: { job: Job }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
    over,
  } = useSortable({ id: job.id });
  const { active } = useDndContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  let showTop = false,
    showBottom = false;
  if (isOver && active && over?.rect && active.id !== job.id) {
    const activeRect = active.rect.current.translated;
    const overMiddle = over.rect.top + over.rect.height / 2;
    if (activeRect) showTop = activeRect.top < overMiddle;
    if (activeRect) showBottom = activeRect.top >= overMiddle;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {showTop && (
        <div className="h-0.5 bg-primary rounded-full opacity-80 py-1" />
      )}
      <JobCard {...job} />
      {showBottom && (
        <div className="h-0.5 bg-primary rounded-full opacity-80 py-1" />
      )}
    </div>
  );
}
