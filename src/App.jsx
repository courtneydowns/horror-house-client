import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./css/style.css";
import "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/auth/Login";
import Login2 from "./components/auth/Login2";
import Signup from "./components/auth/Signup";
import Navbar from "./components/navbar/Navbar";

export default function App() {
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

  // const protectedViews = () => {
  //   return sessionToken === localStorage.getItem("token") ? (
  //     <Homepage token={sessionToken} clearToken={clearToken} />
  //   ) : (
  //     <Auth token={sessionToken} updateToken={updateToken} />
  //   );
  // };
  // {!sessionToken && <Sitebar clickLogout={clearToken} />}
  {
    /* <Sitebar clickLogout={clearToken} /> */
  }

  return (
    <div>
      <main>
        <Switch>
          <Route exact path='/'>
            <Login2 token={sessionToken} updateToken={updateToken} />
          </Route>
          <Route exact path='/signup'>
            <Signup token={sessionToken} updateToken={updateToken} />
          </Route>

          {sessionToken === localStorage.getItem("token") && (
            <>
              <Route exact path='/home'>
                <Homepage token={sessionToken} />
              </Route>
              <header>
                <Navbar clearToken={clearToken} />
              </header>
            </>
          )}
        </Switch>
      </main>
    </div>
  );
}
