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
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsArray);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter((job) => {
      const matchesType = filterType === "all" || job.type === filterType;
      const matchesLocation = job.location
        .toLowerCase()
        .includes(filterLocation.toLowerCase());
      return matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortOption === "salary") {
        const getMinSalary = (salary) =>
          parseInt(
            salary.split("₹")[1]?.split("-")[0]?.trim()?.replace(/[^\d]/g, "")
          ) || 0;

        return getMinSalary(b.salary) - getMinSalary(a.salary);
      } else {
        return b.posted?.seconds - a.posted?.seconds; // Newest first
      }
    });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          placeholder="Filter by location"
          className="border p-2 rounded flex-1"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="salary">Salary High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Link
              to={`/job/${job.id}`}
              key={job.id}
              className="border p-5 rounded-xl shadow-md hover:shadow-lg transition duration-200 block"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Company:</strong> {job.company} • <strong>Type:</strong>{" "}
                {job.type}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {job.location} •{" "}
                <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-gray-600">
                <strong>Salary:</strong> {job.salary}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
