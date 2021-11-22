import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login updateToken={props.updateToken} />} />
        <Route path="/signup" element={<Signup token={props.updateToken} />} />
      </Routes>
    </div>
  );
};

export default Auth;
