import React, { useState } from "react";
import Login2 from "./Login2";
import Signup from "./Signup";

export default function Auth({ sessionToken, updateToken }) {
  const [loginShowing, setLoginShowing] = useState(true);

  const toggleView = () => setLoginShowing(!loginShowing);

  return (
    <div>
      {loginShowing ? (
        <Login2
          token={sessionToken}
          updateToken={updateToken}
          toggleView={toggleView}
        />
      ) : (
        <Signup
          updateToken={updateToken}
          token={sessionToken}
          toggleView={toggleView}
        />
      )}
    </div>
  );
}
