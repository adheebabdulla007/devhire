import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Link to={`/job/${job.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer bg-white">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <p className="text-sm text-gray-600">
          {job.company} • {job.location}
        </p>
        <p className="text-sm">
          {job.type} | {job.experience}
        </p>
        <p className="font-medium text-green-700">{job.salary}</p>
      </div>
    </Link>
  );
}
export default JobCard;
