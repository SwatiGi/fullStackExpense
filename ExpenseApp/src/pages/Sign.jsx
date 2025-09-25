import React, { useRef, useState, useEffect } from "react";
import './Sign.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const apiKey = "AIzaSyAldW9iw7I-eLFW7ihK1WE_JYjxfySjHAU";
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // Check session on mount
    useEffect(() => {
        const token = localStorage.getItem("idToken");
        if (token) setIsAuthenticated(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (!enteredEmail || !enteredPassword) {
            toast.error("Please enter email and password!");
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
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            else return res.json().then(data => {
                let errorMessage = data.error?.message || "Authentication failed!";
                throw new Error(errorMessage);
            });
        })
        .then(data => {
            // Save token to localStorage
            localStorage.setItem("idToken", data.idToken);
            setIsAuthenticated(true);

            // Success Toast
            toast.success(isLogin ? "Login Successful!" : "Sign Up Successful!");

            // Clear inputs
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";

            console.log(data); // Optional: token & user info
        })
        .catch(err => {
            toast.error(err.message);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("idToken");
        setIsAuthenticated(false);
        toast.info("Logged out successfully!");
    };

    if (isAuthenticated) {
        return (
            <div className="sign-container">
                <h1>Welcome!</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
            </div>
        )
    }

    return (
        <div className="sign-container">
            <form className="sign-form" onSubmit={handleSubmit}>
                <h1>{isLogin ? "Login" : "Sign Up"}</h1>
                <input
                    type="email"
                    placeholder="Email"
                    ref={emailInputRef}
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                />
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>

            <ul className="toggle-login" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                <li>
                    <a href="#">
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </a>
                </li>
            </ul>

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

export default Sign;


