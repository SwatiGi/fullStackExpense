import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseForm from "./ExpenseForm"
const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

 
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
        <h1 style={{marginTop:"80px",color:"purple",borderBottom:"2px solid purple",}}>Welcome to Expense Tracker</h1>
      <div style={{ padding: "10px",display:"flex" ,justifyContent:"space-between" }}>
      <span style={{ border: "1px solid purple", padding: "10px", background: "none", borderRadius: "5px" }} >Your profile is not complete
        <NavLink to='/profile'>go to profile</NavLink>
        </span>
       
      <button onClick={handleVerifyEmail} style={{color:"white",border:"none" , borderRadius:"5px",padding:"10px 20px",background:"linear-gradient(145deg, #b944bfff, #ecb1f0)"}} >Verify Email</button>
      </div>
       
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
      <ExpenseForm/>
    </div>
  );
};

export default Home;


