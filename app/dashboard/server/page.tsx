import React from 'react';
// import getServerJobs from '@/app/api/kanban/getJob/route';
import { getJobs } from '@/app/features/jobs/job.action';

const ServerJobs = async () => {
  const jobs = await getJobs();

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="flex flex-col gap-6 bg-red-300">
          <div className="flex flex-col bg-blue-300 w-300">
            <h1 className="bg-yellow-400 text-6xl">{job.title}</h1>
            <p>{job.description}</p>
            <p>{job.salary}</p>
            <p>{job.skills}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServerJobs;
