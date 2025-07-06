import jobs from "../data/jobs";
import JobCard from "./JobCard";

function JobList() {
  return (
    <div className="p-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
