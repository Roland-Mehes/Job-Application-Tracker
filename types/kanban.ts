export type ColumnId = 'attended' | 'rejected' | 'interview';

export interface Column {
  id: ColumnId;
  name: string;
  color: string;
}

export interface Job {
  id: string;
  status: ColumnId;
  jobTitle: string;
  companyName: string;
  description: string;
  salary: string;
  skills: string[];
  interviewDate?: string;
  order: number;
}

export interface JobCardProps {
  jobTitle: string;
  companyName: string;
  description: string;
  salary: string;
  skills: string[];
  interviewDate?: string;
}
