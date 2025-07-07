import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-6">Loading jobs...</p>;
  if (jobs.length === 0) return <p className="p-6">No jobs found.</p>;

  return (
    <div className="p-6 grid gap-6">
      {jobs.map((job) => (
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
  );
};

export default Home;
