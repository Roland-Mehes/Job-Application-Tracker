'use client';

import AddNewJob from './Kanban/Cards/AddJobDialog';

const DashboardHeader = () => {
  return (
    <div className="p-4 w-ful flex justify-end">
      <AddNewJob />
    </div>
  );
};

export default DashboardHeader;
