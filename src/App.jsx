import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/jobs" element={<DashboardJobs />} />
        <Route path="/dashboard/create" element={<CreateJob />} />
        <Route path="/dashboard/applicants/:id" element={<Applicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
