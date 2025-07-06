import { useState } from "react";
import jobs from "../data/jobs";
import JobCard from "../components/JobCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const term = searchTerm.trim().toLowerCase();

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.type.toLowerCase().includes(term) ||
      job.experience.toLowerCase().includes(term)
  );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Latest Job Listings</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title, company, location, type, or experience..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      {/* Result Count */}
      <p className="text-gray-500 mb-6">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </p>

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No jobs found for your search.</p>
      )}
    </main>
  );
}

export default Home;
