import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Sitebar from "./components/sitebar/Sitebar";
import Homepage from "./components/homepage/Homepage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken ? (
      <Homepage token={sessionToken} />
    ) : (
      <Auth token={sessionToken} updateToken={updateToken} />
    );
  };

  return (
    <div className="App">
      {!!sessionToken && <Sitebar clickLogout={clearToken} />}
      <Routes>
        <Route path="/signup" element={<Signup token={updateToken} />} />
        <Route path="/" element={<Login updateToken={updateToken} />} />
        <Route path="/home" element={<Homepage token={sessionToken} />} />
      </Routes>
    </div>
  );
}

export default App;
