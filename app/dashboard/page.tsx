import KanbanBoard from '@/components/Dashboard/Kanban/Board/KanbanBoard';
import getServerJobs from '@/app/api/kanban/getJob/route';

const Dashboard = async () => {
  const jobs = await getServerJobs();

  return (
    <div className="mx-auto max-w-full flex flex-col gap-4">
      <KanbanBoard initialJobs={jobs} />
    </div>
  );
};

export default Dashboard;
