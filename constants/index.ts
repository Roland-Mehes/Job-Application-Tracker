import type { Column } from '@/types/kanban';

export const NAVIGATION_ITEMS = [
  {
    name: 'Home',
    href: '/',
  },

  {
    name: 'Login',
    href: '/login',
  },
];

export const DEFAULT_COLUMNS: Column[] = [
  { id: 'attended', name: 'Attended Jobs', color: 'kanban-attended' },
  { id: 'rejected', name: 'Rejected Jobs', color: 'kanban-rejected' },
  { id: 'interview', name: 'Accepted to Interview', color: 'kanban-interview' },
];
