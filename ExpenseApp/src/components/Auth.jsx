import React, { useState } from "react";

const Auth = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    setShowForgot(true); 
  };

  const handleSendResetLink = () => {
    if (!email) {
      alert("Please enter your email!");
      return;
    }

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error.message);
        } else {
          alert("Password reset link sent to your email!");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {/* Forgot password link */}
      <div>
        <button
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
          onClick={handleForgotPassword}
        >
          Forgot password?
        </button>
      </div>

      {/* Forgot password form */}
      {showForgot && (
        <div style={{ marginTop: "15px" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />
          <br />
          <button
            onClick={handleSendResetLink}
            style={{ marginTop: "10px", padding: "8px 15px" }}
          >
            Send Reset Link
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
