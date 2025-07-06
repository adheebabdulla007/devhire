import { useState } from "react";
import jobsData from "@/data/jobs";

const DashboardJobs = () => {
  const [jobs, setJobs] = useState(jobsData);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this job?");
    if (confirmDelete) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Your Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <p className="text-sm text-gray-700">
                <strong>Company:</strong> {job.company} • <strong>Type:</strong>{" "}
                {job.type} • <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Experience:</strong> {job.experience} •{" "}
                <strong>Salary:</strong> {job.salary}
              </p>

              <p className="mt-2 text-gray-800">{job.description}</p>

              <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardJobs;
