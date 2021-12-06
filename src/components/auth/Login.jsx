import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    fetch(`http://localhost:3001/user/login`, {
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
        history.push("/home");
        props.updateToken(data.sessionToken);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("username", data.user.username);
      })
      .catch((error) => {
        console.log("Error", error);
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
          <p className='auth-toggle'>
            Don't have an account?{" "}
            <Link className='auth-toggle-link' to='/signup' variant='body2'>
              Sign up
            </Link>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
