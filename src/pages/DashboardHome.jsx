import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const DashboardHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to log out");
    }
  };

  return (
    <div className="dashboard-home">
      <h1 className="dashboard-title">Welcome to DevHire Dashboard</h1>

      {user ? (
        <>
          <p className="dashboard-subtitle">
            You are logged in as <strong>{user.email}</strong>
          </p>
          <Button className="logout-button" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p className="text-error">User not found. Please log in again.</p>
      )}
    </div>
  );
};

export default DashboardHome;
