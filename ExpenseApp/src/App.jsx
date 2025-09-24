import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import SignUp from "./pages/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useEffect(() => {
    if (localStorage.getItem("userUID")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
  
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
 
      <Route path="/auth" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;




