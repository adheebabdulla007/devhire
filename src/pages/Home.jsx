import JobList from "../components/JobList";

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mt-4 mb-4">Available Jobs</h1>
      <JobList />
    </div>
  );
}

export default Home;
