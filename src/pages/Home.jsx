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
        console.error("Error fetching jobs:", err);
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
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Latest Jobs
      </h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "150px",
          }}
        >
          <option value="all">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "2",
            minWidth: "200px",
          }}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "150px",
          }}
        >
          <option value="newest">Newest First</option>
          <option value="salary">Salary High to Low</option>
        </select>
      </div>

      {/* Job Listings */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          🚫 No jobs found. Please check back later.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((job) => (
            <Link
              to={`/job/${job.id}`}
              key={job.id}
              style={{
                display: "block",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1.5rem",
                textDecoration: "none",
                color: "#333",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)")
              }
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#6366F1", // Indigo
                  marginBottom: "0.5rem",
                }}
              >
                {job.title}
              </h2>
              <p style={{ color: "#555", marginBottom: "0.3rem" }}>
                {job.company} • {job.type}
              </p>
              <p style={{ color: "#555", marginBottom: "0.3rem" }}>
                {job.location} • {job.experience}
              </p>
              <p style={{ fontWeight: "500", color: "#10B981" }}>
                {job.salary}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
