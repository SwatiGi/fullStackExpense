import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userUID")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {/* Navbar show only if logged in */}
      {isLoggedIn && <Navbar  setIsLoggedIn={setIsLoggedIn}/>}
       
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Profile page */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/auth" />
          }
        />

        {/* Auth page */}
        <Route
          path="/auth"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;





// import React from 'react'
// import Sign from './pages/Sign'

// const App = () => {
//   return (
//     <div>
//     <Sign/>
//     </div>
//   )
// }

// export default App