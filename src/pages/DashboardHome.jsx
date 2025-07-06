import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const DashboardHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/login"); // ✅ SPA-friendly redirect
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div className="p-4">
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
        <p className="text-red-600">User not found. Please log in again.</p>
      )}
    </div>
  );
};

export default DashboardHome;
