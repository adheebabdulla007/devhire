import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "var(--white)",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "var(--primary)",
          textDecoration: "none",
        }}
      >
        DevHire
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={navLinkStyle}>
          Home
        </Link>
        <Link to="/dashboard" style={navLinkStyle}>
          Dashboard
        </Link>
        <Link to="/login" style={navLinkStyle}>
          Login
        </Link>
        <Link to="/register" style={navLinkStyle}>
          Register
        </Link>
      </div>
    </nav>
  );
};

// ✅ Reusable link style
const navLinkStyle = {
  color: "var(--text-dark)",
  fontSize: "1rem",
  fontWeight: "500",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

export default Navbar;
