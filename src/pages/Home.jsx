import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = jobs
    .filter(
      (job) =>
        (filterType === "all" || job.type === filterType) &&
        job.location.toLowerCase().includes(filterLocation.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "salary") {
        const getMin = (s) => parseInt(s.replace(/[^0-9]/g, "")) || 0;
        return getMin(b.salary) - getMin(a.salary);
      }
      return b.posted?.seconds - a.posted?.seconds;
    });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Latest Jobs</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          className="border p-2 rounded flex-1"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="salary">Salary High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600">
          🚫 No jobs found. Please check back later.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <Link
              to={`/job/${job.id}`}
              key={job.id}
              className="border p-5 rounded-xl shadow hover:shadow-lg transition duration-200 block"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600">
                {job.company} • {job.type}
              </p>
              <p className="text-gray-600">
                {job.location} • {job.experience}
              </p>
              <p className="text-gray-600 mt-2">{job.salary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
