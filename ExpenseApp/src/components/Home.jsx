import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/auth"); 
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h1>Welcome to Expense Tracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
    </div>
  );
};

export default Home;


