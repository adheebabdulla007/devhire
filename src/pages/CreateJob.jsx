import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        ...job,
        posted: Timestamp.now(),
        requirements: job.requirements.split(",").map((r) => r.trim()),
      });

      alert("Job posted successfully!");
      navigate("/dashboard/jobs");
    } catch (error) {
      console.error("Error adding job: ", error);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border p-2 rounded"
          required
        />
        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
          className="border p-2 rounded"
          required
        />
        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <input
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="border p-2 rounded"
        />
        <input
          name="type"
          value={job.type}
          onChange={handleChange}
          placeholder="Full-Time / Remote / Contract"
          className="border p-2 rounded"
          required
        />
        <input
          name="experience"
          value={job.experience}
          onChange={handleChange}
          placeholder="Experience required"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="3"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="requirements"
          value={job.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma separated)"
          rows="2"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
