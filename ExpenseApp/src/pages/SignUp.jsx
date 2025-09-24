import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = ({ setIsLoggedIn }) => {
  const initialState = { email: "", password: "", confirmPassword: "" };
  const [isLogin, setIsLogin] = useState(true);
  const [inputValue, setInputValue] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = inputValue.email;
    const enteredPassword = inputValue.password;

    if (!isLogin && inputValue.password !== inputValue.confirmPassword) {
      alert("Passwords must match");
      return;
    }

    let url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`;

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
        else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userUID", data.localId);
        localStorage.setItem("token", data.idToken);

        setIsLoggedIn(true);
        navigate("/"); 

        alert(`${isLogin ? "Login Successful!" : "Account Created Successfully!"}`);
      })
      .catch((err) => alert(err.message));

    setInputValue(initialState);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{marginTop:"100px",margin:"auto",width:"60%"}}>
      <form onSubmit={handleSubmit} className="form">
        <h1>{isLogin ? "Login" : "SignUp"}</h1>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputValue.email}
          required
                  placeholder="Email"
                  style={{background:!isLogin?"gray":"black",borderRadius:"5px",border:"none",color:isLogin?"white":"black"}}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={inputValue.password}
          required
                  placeholder="Password"
                  style={{background:!isLogin?"gray":"black",borderRadius:"5px",border:"none",color:isLogin?"white":"black"}}
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={inputValue.confirmPassword}
            required
                      placeholder="Confirm Password"
                       style={{background:"gray",borderRadius:"5px",border:"none",color:"black"}}
          />
        )}
        <button type="submit"className="btn">{isLogin ? "Login" : "Sign Up"}</button>
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Create new account" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default SignUp;



