import KanbanBoard from '@/components/Dashboard/Kanban/KanbanBoard';

const Dashboard = async () => {
  return (
    <div className="mx-auto max-w-full flex flex-col gap-4">
      <KanbanBoard />
    </div>
  );
};

export default Dashboard;
