import { DEFAULT_COLUMNS, DEFAULT_JOBS } from '@/constants';

const Dashboard = () => {
  return (
    <div className=" mx-auto flex gap-10 max-w-full ">
      {DEFAULT_COLUMNS.map((column) => (
        <div key={column.name}>
          {/* <KanbanBoard
            title={column.name}
            bgColor={column.bgColor}
            jobs={DEFAULT_JOBS} 
          /> */}
          ELEM
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
