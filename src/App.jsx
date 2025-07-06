import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";

import DashboardHome from "./pages/DashboardHome";
import DashboardJobs from "./pages/DashboardJobs";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import DashboardLayout from "./layouts/DashboardLayout"; // ✅ IMPORT

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<SavedJobs />} />

        {/* ✅ PROTECTED DASHBOARD ROUTES WITH LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="jobs" element={<DashboardJobs />} />
          <Route path="create" element={<CreateJob />} />
          <Route path="applicants/:id" element={<Applicants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
