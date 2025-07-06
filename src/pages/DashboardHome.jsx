import { useAuth } from "@/context/AuthContext.jsx";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      {user ? (
        <p className="text-green-600">Welcome, {user.email}</p>
      ) : (
        <p className="text-red-600">You are not logged in.</p>
      )}
    </div>
  );
};

export default DashboardHome;
