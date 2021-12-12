import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const { updateToken } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleUsername = (e) => setUsername(e.target.value);
  // const handlePassword = (e) => setPassword(e.target.value);

  const history = useHistory();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const fetchResults = await fetch(`http://localhost:3001/user/`, {
  //       method: "POST",
  //       body: JSON.stringify({ username, password }),
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //       }),
  //     });
  //     const json = await fetchResults.json();
  //     if (!json.user || !json.sessionToken) {
  //       alert(json.message);
  //       return;
  //     }
  //     updateToken(json.sessionToken);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/user/`, {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // if (!data.sessionToken) {
        //   console.log(data.sessionToken);
        //   return;
        // }
        updateToken(data.sessionToken);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("username", data.user.username);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='login-register'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
              type='username'
              onChange={(e) => setUsername(e.target.value)}
              name='username'
              required
              value={username}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              required
              value={password}
            />
            <button id='auth-login' type='submit'>
              Login
            </button>
          </form>{" "}
          <p className='toggle' onClick={() => history.push("./signup")}>
            Don't have an account? Sign up here.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
