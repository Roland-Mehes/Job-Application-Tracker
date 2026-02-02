import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import JobCard from './JobCard';
import type { Job } from '@/types/kanban';
import { useDndContext } from '@dnd-kit/core';

export default function SortableJobCard({ job }: { job: Job }) {
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

  /**
   * decide where the cursor is relative to the center of the card  (top or bottom)
   */
  let showTopIndicator = false;
  let showBottomIndicator = false;

  if (isOver && active && over?.rect && active.id !== job.id) {
    const activeRect = active.rect.current.translated;
    const overRect = over.rect;

    if (activeRect) {
      const pointerY = activeRect.top;
      const overMiddleY = overRect.top + overRect.height / 2;

      if (pointerY < overMiddleY) {
        showTopIndicator = true;
      } else {
        showBottomIndicator = true;
      }
    }
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/*  Marking the top of the card when dropping */}
      {showTopIndicator && (
        <div className={`h-0.5 bg-primary rounded-full opacity-80 py-1 `} />
      )}

      <JobCard {...job} />

      {/*  Marking the bottom of the card when dropping */}
      {showBottomIndicator && (
        <div className="h-0.5 py-1 bg-primary rounded-full opacity-80" />
      )}
    </div>
  );
}
