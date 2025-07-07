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
    const fetch = async () => {
      try {
        const q = query(collection(db, "jobs"), orderBy("posted", "desc"));
        const snap = await getDocs(q);
        setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs((p) => p.filter((j) => j.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const toggleStatus = async (id, s) => {
    try {
      const newSt = s === "active" ? "inactive" : "active";
      await updateDoc(doc(db, "jobs", id), { status: newSt });
      setJobs((p) => p.map((j) => (j.id === id ? { ...j, status: newSt } : j)));
    } catch {
      alert("Status update failed");
    }
  };

  const filtered = jobs
    .filter(
      (j) =>
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((j) => (typeFilter ? j.type === typeFilter : true));

  const totalPages = Math.ceil(filtered.length / perPage);
  const current = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or company..."
          className="border p-2 rounded flex-1"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option>Full-Time</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't posted any jobs yet. Start by creating your first one!
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {current.map((job) => (
              <div
                key={job.id}
                className="border p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="space-x-2">
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
                <p className="text-gray-700">
                  {job.company} • {job.type}
                </p>
                <p className="text-gray-700">
                  {job.location} • {job.experience}
                </p>
                <p className="text-gray-700">
                  Posted{" "}
                  {formatDistanceToNow(job.posted.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
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
