import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-6">📊 Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard">🏠 Home</Link>
          <Link to="/dashboard/jobs">📋 Jobs</Link>
          <Link to="/dashboard/create">➕ Create Job</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
