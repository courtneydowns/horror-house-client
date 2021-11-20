import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = (props) => {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Login updateToken={props.updateToken} />
        </Route>
        <Route exact path="/register">
          <Register updateToken={props.updateToken} />
        </Route>
      </Router>
    </div>
  );
};

export default Auth;
