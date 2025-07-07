import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const DashboardJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="p-4">Loading jobs...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-5 rounded-xl shadow-md hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {job.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {job.company} • <strong>Type:</strong>{" "}
                {job.type}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {job.location} •{" "}
                <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Salary:</strong> {job.salary}
              </p>

              <p className="text-gray-800 mt-3 mb-2">
                <strong>Description:</strong> {job.description}
              </p>

              <div className="mt-2">
                <p className="font-semibold text-gray-700 mb-1">
                  Requirements:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {job.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardJobs;
