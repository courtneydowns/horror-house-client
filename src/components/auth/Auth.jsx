import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Login updateToken={props.updateToken} />
        </Route>
        <Route exact path="/signup">
          <Signup updateToken={props.updateToken} />
        </Route>
      </Router>
    </div>
  );
};

export default Auth;
