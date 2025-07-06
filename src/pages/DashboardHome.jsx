import { useAuth } from "@/context/AuthContext.jsx";

const DashboardHome = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      window.location.href = "/login"; // simple redirect after logout
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      {user ? (
        <>
          <p className="text-green-600 mb-2">Welcome, {user.email}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-red-600">You are not logged in.</p>
      )}
    </div>
  );
};

export default DashboardHome;
