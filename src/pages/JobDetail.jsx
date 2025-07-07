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

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        Loading job details...
      </div>
    );

  if (!job)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        Job not found.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#333",
        }}
      >
        {job.title}
      </h1>

      <div
        style={{
          fontSize: "0.95rem",
          color: "#555",
          marginBottom: "1.5rem",
          lineHeight: "1.6",
        }}
      >
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

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#444",
          }}
        >
          Description
        </h2>
        <p style={{ color: "#333", lineHeight: "1.7" }}>{job.description}</p>
      </div>

      <div>
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#444",
          }}
        >
          Requirements
        </h2>
        <ul
          style={{
            paddingLeft: "1.25rem",
            listStyle: "disc",
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          {job.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetail;
