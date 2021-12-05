import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
// import Sitebar from "./components/sitebar/Sitebar";
import Homepage from "./components/homepage/Homepage";
import SearchMovie from "./components/searchMovie/SearchMovie";

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
  // {!sessionToken && <Sitebar clickLogout={clearToken} />}
  {
    /* <Sitebar clickLogout={clearToken} /> */
  }

  return (
    <div>
      {/* <Auth token={sessionToken} updateToken={updateToken} /> */}
      <Switch>
        <Route exact path='/'>
          {protectedViews()}
        </Route>
        <Route exact path='/home'>
          <Homepage token={sessionToken} />
        </Route>
        <Route exact path='/search'>
          <SearchMovie />
        </Route>
        {/* <Route exact path="/profile">
                <ViewProfile token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/characters">
                <Characters token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/magical-objects">
                <MagicalObjects token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/spells">
                <Spells token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/potion-ingredients">
                <PotionIngredients token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/potions">
                <Potions token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/wand-cores">
                <WandCore token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/wand-wood">
                <WandWood token={this.state.sessionToken} />
              </Route> */}
      </Switch>
    </div>
  );
}

export default App;
