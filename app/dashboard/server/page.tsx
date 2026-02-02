import React from 'react';
import getServerJobs from '@/app/api/kanban/getJob/route';

const getJobs = async () => {
  const jobs = await getServerJobs();

  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <div key={job.id} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1>{job.title}</h1>
            <p>{job.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default getJobs;
