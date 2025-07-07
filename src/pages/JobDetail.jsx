import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="p-6">Loading job details...</p>;
  if (!job) return <p className="p-6 text-red-600">Job not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Type:</strong> {job.type} • <strong>Location:</strong>{" "}
        {job.location}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Experience:</strong> {job.experience} • <strong>Salary:</strong>{" "}
        {job.salary}
      </p>

      <p className="mb-4">{job.description}</p>

      <h3 className="text-xl font-semibold mb-2">Requirements</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {job.requirements?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetail;
