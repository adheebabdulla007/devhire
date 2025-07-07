import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 border-r border-gray-200">
        <h2 className="text-xl font-bold text-indigo-700 mb-6">📊 Dashboard</h2>
        <nav className="space-y-4 text-gray-700 font-medium">
          <NavLink to="/dashboard" className="block hover:text-indigo-600">
            🏠 Home
          </NavLink>
          <NavLink to="/dashboard/jobs" className="block hover:text-indigo-600">
            📋 Jobs
          </NavLink>
          <NavLink
            to="/dashboard/create"
            className="block hover:text-indigo-600"
          >
            ➕ Create Job
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
