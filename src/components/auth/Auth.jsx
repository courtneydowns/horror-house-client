import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth(props) {
  const [loginShowing, setLoginShowing] = useState(true);

  const toggleView = () => setLoginShowing(!loginShowing);

  return (
    <div>
      {loginShowing ? (
        <Login
          token={props.sessionToken}
          updateToken={props.updateToken}
          toggleView={toggleView}
        />
      ) : (
        <Signup
          updateToken={props.updateToken}
          token={props.sessionToken}
          //   toggleView={toggleView}
        />
      )}
    </div>
  );
}
