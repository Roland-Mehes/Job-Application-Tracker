import { KanbanStatus } from '@/types/kanbanStatus';

export interface Column {
  id: KanbanStatus;
  name: string;
  color: string;
}

export interface Job {
  id: string;
  status: KanbanStatus;
  jobTitle: string;
  companyName: string;
  description?: string;
  order: number;
  salary?: string;
  skills: string[];
  interviewDate?: string;
  createdAt: string;
}
