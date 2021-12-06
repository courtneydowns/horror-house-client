import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = (props) => {
  return (
    <div>
      <Router>
        <Route exact path='/login'>
          <Login updateToken={props.updateToken} />
        </Route>
        <Route exact path='/signup'>
          <SignUp updateToken={props.updateToken} />
        </Route>
      </Router>
    </div>
  );
};

export default Auth;
