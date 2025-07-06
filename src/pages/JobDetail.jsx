import { useParams } from "react-router-dom";
import jobs from "../data/jobs";

function JobDetail() {
  const { id } = useParams(); // get id from URL
  const jobId = parseInt(id); // URL params are strings
  const job = jobs.find((job) => job.id === jobId); // find matching job

  if (!job) {
    return (
      <div className="p-6 text-red-600 text-center">
        Job not found. Please check the URL.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">
        {job.company} • {job.location}
      </p>
      <p className="mb-1">
        {job.type} | {job.experience}
      </p>
      <p className="text-green-700 font-semibold mb-4">{job.salary}</p>

      <div>
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p>
          This is a placeholder for job description. You can extend the job data
          object to include real description, skills, requirements, etc.
        </p>
      </div>
    </div>
  );
}

export default JobDetail;
