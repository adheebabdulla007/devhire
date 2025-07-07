import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "jobs", id));
        if (snap.exists()) setJob({ id: snap.id, ...snap.data() });
        else setJob(null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading job details...</p>;
  if (!job)
    return <p className="p-6 text-center text-red-600">Job not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Type:</strong> {job.type} • <strong>Location:</strong>{" "}
          {job.location}
        </p>
        <p>
          <strong>Experience:</strong> {job.experience} •{" "}
          <strong>Salary:</strong> {job.salary}
        </p>
        <p>
          <strong>Posted:</strong>{" "}
          {formatDistanceToNow(job.posted.toDate(), { addSuffix: true })}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Description</h2>
        <p className="text-gray-800">{job.description}</p>
      </div>

      <div>
        <h2 className="font-semibold">Requirements</h2>
        <ul className="list-disc list-inside text-gray-800">
          {job.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetail;
