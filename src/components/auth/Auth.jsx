import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  return (
    <div>
      <h1>Auth.jsx</h1>
      <Router>
        <Route exact path="/">
          {console.log("is this working? login route auth.jsx")}
          <Login updateToken={props.updateToken} />
        </Route>
        <Route exact path="/signup">
          {console.log("is this working? signup route auth.jsx")}
          <Signup updateToken={props.updateToken} />
        </Route>
      </Router>
    </div>
  );
};

export default Auth;

// import React, { useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import { Link } from "react-router-dom";

// const Auth = (props) => {
//   const [login, setLogin] = useState(true);

//   const toggle = () => {
//     setLogin({ login: !login });
//   };

//   const authTernary = () => {
//     return true ? (
//       <Login updateToken={props.updateToken} toggle={toggle()} />
//     ) : (
//       <Signup
//         updateToken={props.updateToken}
//         // isSignedUp={props.isSignedUp}
//         toggle={toggle()}
//       />
//     );
//   };

//   return (
//     <div className="Auth">
//       <h1>Auth</h1>
//       <div className="wrapper">
//         <div className="login-signup">{authTernary()}</div>
//       </div>
//     </div>
//   );
// };

// export default Auth;
