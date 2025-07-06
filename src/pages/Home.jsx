import { useState } from "react";
import jobs from "../data/jobs";
import JobCard from "../components/JobCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Latest Job Listings</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title, company, or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-6"
      />

      {/* Render Job Cards */}
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
