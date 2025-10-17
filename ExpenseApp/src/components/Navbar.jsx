import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    backgroundColor: "#7e03a7ff",
    padding: "10px 20px",
    boxSizing:"border-box",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    width: "100%",
    top: "0",
    left:"0"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
    transition: "color 0.3s ease, transform 0.2s ease",
  };

  const activeLinkStyle = {
    color: "#ffe082",
    borderBottom: "2px solid #ffe082",
    transform: "scale(1.05)",
  };
 const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/auth"); 
  };
  return (
    <nav style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Home
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle)}
      >
        Profile
          </NavLink>
          <button
  onClick={handleLogout}
  style={{
    background: "linear-gradient(135deg, #b944bfff, #ecb1f0)",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(214, 51, 132, 0.4)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => {
    e.target.style.background = "linear-gradient(135deg, #c2185b, #e573c0)";
    e.target.style.boxShadow = "0 6px 15px rgba(194, 24, 91, 0.5)";
    e.target.style.transform = "translateY(-2px)";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "linear-gradient(135deg, #f15ba6ff, #ecb1f0)";
    e.target.style.boxShadow = "0 4px 10px rgba(214, 51, 132, 0.4)";
    e.target.style.transform = "translateY(0)";
  }}
>
  Logout
</button>

    </nav>
  );
};

export default Navbar;
