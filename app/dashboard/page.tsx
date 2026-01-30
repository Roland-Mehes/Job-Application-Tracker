import KanbanBoard from '@/components/KanbanBoard';

const Dashboard = async () => {
  return (
    <div className="mx-auto max-w-full p-4 flex flex-col gap-4">
      <KanbanBoard />
    </div>
  );
};

export default Dashboard;
