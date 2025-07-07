import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const DashboardJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), orderBy("posted", "desc"));
        const snapshot = await getDocs(q);
        const jobsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      try {
        await deleteDoc(doc(db, "jobs", id));
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete job.");
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const jobRef = doc(db, "jobs", id);
      await updateDoc(jobRef, {
        status: currentStatus === "active" ? "inactive" : "active",
      });

      // update local state
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id
            ? {
                ...job,
                status: currentStatus === "active" ? "inactive" : "active",
              }
            : job
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update job status.");
    }
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((job) =>
      typeFilter ? job.type.toLowerCase() === typeFilter.toLowerCase() : true
    );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or company..."
          className="border p-2 rounded w-full md:w-2/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Job Cards */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : currentJobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="space-y-6">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="border p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <Link
                  to={`/job/${job.id}`}
                  className="text-xl font-semibold text-indigo-700 hover:underline"
                >
                  {job.title}
                </Link>
                <div className="space-x-2">
                  <button
                    onClick={() => toggleStatus(job.id, job.status || "active")}
                    className={`text-sm px-3 py-1 rounded ${
                      job.status === "inactive"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {job.status === "inactive" ? "Inactive" : "Active"}
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {job.company} • <strong>Type:</strong>{" "}
                {job.type}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {job.location} •{" "}
                <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Posted:</strong>{" "}
                {formatDistanceToNow(job.posted.toDate(), { addSuffix: true })}
              </p>

              <p className="text-gray-800 mt-3">
                {job.description.length > 150
                  ? job.description.slice(0, 150) + "..."
                  : job.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardJobs;
