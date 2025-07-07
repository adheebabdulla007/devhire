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
import Button from "@/components/ui/Button";

const DashboardJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), orderBy("posted", "desc"));
        const snap = await getDocs(q);
        setJobs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job.");
    }
  };

  const toggleStatus = async (id, status) => {
    const newStatus = status === "active" ? "inactive" : "active";
    try {
      await updateDoc(doc(db, "jobs", id), { status: newStatus });
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
      );
    } catch {
      alert("Failed to update job status.");
    }
  };

  const filtered = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) => (typeFilter ? job.type === typeFilter : true));

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Manage Jobs
      </h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or company..."
          style={{
            flex: 1,
            padding: "0.6rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "0.6rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <option value="">All Types</option>
          <option>Full-Time</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>
      </div>

      {/* Job Cards */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          🚫 No jobs found. Start by posting your first job.
        </p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {current.map((job) => (
              <div
                key={job.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  transition: "0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                    {job.title}
                  </h3>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      onClick={() =>
                        toggleStatus(job.id, job.status || "active")
                      }
                      className={
                        job.status === "inactive"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }
                    >
                      {job.status === "inactive" ? "Inactive" : "Active"}
                    </Button>
                    <Button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <p style={{ color: "#555" }}>
                  <strong>{job.company}</strong> • {job.type}
                </p>
                <p style={{ color: "#555" }}>
                  {job.location} • {job.experience}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#888" }}>
                  Posted{" "}
                  {formatDistanceToNow(job.posted.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardJobs;
