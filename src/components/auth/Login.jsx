import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
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
        props.updateToken(data.sessionToken);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("username", data.user.username);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    // <div>
    //   <div className='wrapper'>
    //     <div className='login-register'>
    //       <form onSubmit={handleSubmit}>
    //         <label htmlFor='username'>Username</label>
    //         <input
    //           type='username'
    //           onChange={(e) => setUsername(e.target.value)}
    //           name='username'
    //           required
    //           value={username}
    //         />
    //         <label htmlFor='password'>Password</label>
    //         <input
    //           type='password'
    //           onChange={(e) => setPassword(e.target.value)}
    //           name='password'
    //           required
    //           value={password}
    //         />
    //         <button id='auth-login' type='submit'>
    //           Login
    //         </button>
    //       </form>{" "}

    <div className='login'>
      <div form onSubmit={handleSubmit}>
        <label className='login__label' htmlFor='username'>
          Username
        </label>
        <input
          className='login__input'
          type='username'
          onChange={handleUsername}
          name='username'
          value={username}
        />
        <div>
          <label className='login__label' htmlFor='password'>
            Password
          </label>
          <input
            className='login__input'
            type='password'
            onChange={handlePassword}
            name='password'
            value={password}
          />
          <button className='login__button' type='submit'>
            Login
          </button>
        </div>
        {/* <p className='toggle'>
            <Link onClick={toggleView}>
              {"Don't have an account? Sign up here!"}
            </Link>
          </p> */}
        <p className='toggle' onClick={() => history.push("./signup")}>
          Don't have an account? Sign up here.{" "}
        </p>
        {/* <Link className='auth-toggle-link' to='/signup' variant='body2'>
              Sign up
            </Link> */}
      </div>{" "}
    </div>
  );
};

export default Login;
