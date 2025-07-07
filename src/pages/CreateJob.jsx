import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

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
      await addDoc(collection(db, "jobs"), {
        ...job,
        posted: Timestamp.now(),
        requirements: job.requirements
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean),
      });

      alert("Job posted successfully!");
      navigate("/dashboard/jobs");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Post a New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary (e.g. ₹8 - ₹12 LPA)"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          name="type"
          value={job.type}
          onChange={handleChange}
          placeholder="Full-Time / Remote / Contract"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          name="experience"
          value={job.experience}
          onChange={handleChange}
          placeholder="Experience required (e.g. 2+ years)"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="4"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <textarea
          name="requirements"
          value={job.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma separated)"
          rows="3"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
