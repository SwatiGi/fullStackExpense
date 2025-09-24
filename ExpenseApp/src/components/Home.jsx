import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
        <p style={{ border: "1px solid red", padding: "10px", background: "gray" }} >Your profile is not complete
        <NavLink to='/profile'>go to profile</NavLink>
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
    </div>
  );
};

export default Home;


