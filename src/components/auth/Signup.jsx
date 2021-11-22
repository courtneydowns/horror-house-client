import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadingProfile from "./uploadingProfileImage";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setprofileImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          profileImage: profileImage,
          email: email,
          password: password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
        localStorage.setItem("profileImage", profileImage);
        localStorage.setItem("username", username);
      })
      .catch((error) => {
        console.log("Error", error);
        alert("Something went wrong. Please try again.");
        return;
      });
  };

  return (
    <div className="wrapper">
      <div className="login-register">
        <p className="register-intro">
          Sign up to become a part of a scream-tast-ic community!
        </p>
        <form onSubmit={handleSubmit}>
          <UploadingProfile
            setprofileImage={setprofileImage}
            profileImage={profileImage}
          />
        </form>
        <form>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
            value={username}
            required
          />
        </form>
        <form>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            value={email}
            required
          />
        </form>
        <form>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            value={password}
            required
          />
          <button id="auth-login" type="submit" style={{ marginTop: "5%" }}>
            Signup
          </button>
        </form>
        <p className="auth-toggle">
          Already have an account?{" "}
          <Link className="auth-toggle-link" to="/" variant="body2">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
