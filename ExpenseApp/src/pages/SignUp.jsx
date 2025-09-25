import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = ({ setIsLoggedIn }) => {
  const initialState = { email: "", password: "", confirmPassword: "" };
  const [isLogin, setIsLogin] = useState(true);      
  const [showForgot, setShowForgot] = useState(false); 
  const [inputValue, setInputValue] = useState(initialState);
  const [forgotEmail, setForgotEmail] = useState(""); 
  const navigate = useNavigate();

  const apiKey = "AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU";


  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = inputValue.email;
    const enteredPassword = inputValue.password;

    if (!isLogin && inputValue.password !== inputValue.confirmPassword) {
      alert("Passwords must match");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else
          return res.json().then((data) => {
            let errorMessage = data?.error?.message || "Authentication failed!";
            throw new Error(errorMessage);
          });
      })
      .then((data) => {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userUID", data.localId);
        localStorage.setItem("token", data.idToken);

        setIsLoggedIn(true);
        navigate("/");
        
        // alert(`${isLogin ? "Login Successful!" : "Account Created Successfully!"}`);

         toast.success(
      `${isLogin ? "Login Successful! 🎉" : "Account Created Successfully! 🎉"}`,
      { position: "top-center" }
    );
      })
      .catch((err) => alert(err.message));

    setInputValue(initialState);
  };

  
  const handleSendResetLink = () => {
    if (!forgotEmail) {
      alert("Please enter your email!");
      return;
    }

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: forgotEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error.message);
        else {
          alert("Password reset link sent! Check your inbox.");
          setShowForgot(false); // go back to login
          setForgotEmail("");
        }
      })
      .catch((err) => alert(err.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginTop: "100px", margin: "auto", width: "60%" }}>
      {!showForgot ? (
        <form onSubmit={handleSubmit} className="form">
          <h1>{isLogin ? "Login" : "SignUp"}</h1>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputValue.email}
            required
            placeholder="Email"
            style={{
              background: !isLogin ? "gray" : "black",
              borderRadius: "5px",
              border: "none",
              color: isLogin ? "white" : "black",
            }}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputValue.password}
            required
            placeholder="Password"
            style={{
              background: !isLogin ? "gray" : "black",
              borderRadius: "5px",
              border: "none",
              color: isLogin ? "white" : "black",
            }}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={inputValue.confirmPassword}
              required
              placeholder="Confirm Password"
              style={{ background: "gray", borderRadius: "5px", border: "none", color: "black" }}
            />
          )}

          <button type="submit" className="btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Forgot Password Link */}
          {isLogin && (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <button
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Create new account" : "Already have an account? Login"}
          </p>
        </form>
      ) : (
       
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            style={{ padding: "8px", width: "250px", margin: "5px" }}
          />
          <br />
          <button onClick={handleSendResetLink} style={{ marginTop: "10px", padding: "8px 15px" }}>
            Send Reset Link
          </button>
          <br />
          <button
            onClick={() => setShowForgot(false)}
            style={{ marginTop: "10px", background: "none", border: "none", color: "red" }}
          >
            Back to Login
          </button>
        </div>
      )}
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

export default SignUp;




