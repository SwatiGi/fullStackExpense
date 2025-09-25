import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/auth"); 
  };
  const handleVerifyEmail = () => {
  const token = localStorage.getItem("token");
  if (!token) return toast.error("User not logged in!");

  fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("Verification email sent! Check your inbox.");
        console.log("Verify response:", data);
      }
    })
    .catch((err) => toast.error(err.message));
};



  return (
    <div>
      <div style={{ padding: "10px" }}>
        <h1>Welcome to Expense Tracker</h1>
      <hr />
        <p style={{ border: "1px solid red", padding: "10px", background: "gray" }} >Your profile is not complete
        <NavLink to='/profile'>go to profile</NavLink>
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button onClick={handleVerifyEmail}>Verify Email</button>
        <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
    </div>
  );
};

export default Home;


