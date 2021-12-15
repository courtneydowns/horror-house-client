import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login({ updateToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchResults = await fetch(`http://localhost:3001/user/`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const json = await fetchResults.json();
      if (!json.user || !json.sessionToken) {
        alert(json.message);
        return;
      }
      updateToken(json.sessionToken);
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='signin'>
      <form className='signin__form' onSubmit={handleSubmit}>
        <h3 className='signin__h3'>Signin</h3>
        <div className='signin__container'>
          <input
            type='username'
            onChange={handleUsername}
            name='username'
            placeholder='Username'
            required
            value={username}
            className='signin__input'
          />
          <input
            type='password'
            onChange={handlePassword}
            name='password'
            placeholder='Password'
            type='password'
            required
            value={password}
            className='signin__input'
          />
          <button className='signin__button' type='submit'>
            Login
          </button>
        </div>
      </form>{" "}
      <p className='signin__toggle' onClick={() => history.push("./signup")}>
        Don't have an account? Sign up here.{" "}
      </p>
    </div>
  );
}
