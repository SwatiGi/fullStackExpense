import React, { useState } from 'react'
import "./SignUp.css"

const SignUp = () => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [isLogin, setIsLogin] = useState(true);
  const [inputValue, setInputValue] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = inputValue.email;
    const enteredPassword = inputValue.password;

    // password confirm check only on SignUp
    if (!isLogin && inputValue.password !== inputValue.confirmPassword) {
      alert("Passwords must match");
      return;
    }

    let url;

    if (isLogin) {
      localStorage.setItem("email", enteredEmail);
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
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
        // authCtx.login(data.idToken, expirationTime.toISOString()); // agar context use kar rahe ho to uncomment karo
        alert(
          `${isLogin ? "Login Successful!" : "Account Created Successfully!"}`
        );
      })
      .catch((err) => {
        alert(err.message);
      });

    setInputValue(initialState);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h1>{isLogin ? "Login" : "SignUp"}</h1>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={inputValue.email}
          required
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputValue.password}
          required
          placeholder="Password"
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            value={inputValue.confirmPassword}
            required
            placeholder="Confirm Password"
          />
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? "Create new account" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
