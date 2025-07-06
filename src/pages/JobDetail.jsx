import { useParams, Link } from "react-router-dom";
import jobs from "../data/jobs";

function JobDetail() {
  const { id } = useParams();
  const jobId = parseInt(id);
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <div className="p-6 text-red-600 text-center">
        Job not found. Please check the URL.
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <Link to="/" className="text-blue-600 underline mb-4 block">
        ← Back to Job Listings
      </Link>

      <header>
        <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
        <p className="text-gray-600">
          {job.company} • {job.location}
        </p>
        <p className="text-sm text-gray-500 mb-4">Posted on: {job.posted}</p>
        <p className="mb-2">
          {job.type} | {job.experience}
        </p>
        <p className="text-green-700 font-semibold mb-6">{job.salary}</p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-800">{job.description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-800">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default JobDetail;
