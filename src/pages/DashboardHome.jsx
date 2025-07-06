import { useAuth } from "@/context/AuthContext";

const DashboardHome = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      window.location.href = "/login"; // ✅ redirect after logout
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

      {user ? (
        <>
          <p className="mb-2 text-gray-800">
            You're logged in as: <strong>{user.email}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-red-600">User not found. Please login again.</p>
      )}
    </div>
  );
};

export default DashboardHome;
