import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import UploadingProfileImage from "./UploadingProfileImage";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/user/signup`, {
      //1
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
        history.push("/home");
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
    <div className='wrapper'>
      <div className='login-register'>
        <p className='register-intro'>
          Sign up to see photos from your friends and their pets.
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <UploadingProfileImage
              setProfileImage={setProfileImage}
              profileImage={profileImage}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              name='username'
              placeholder='Username'
              value={username}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              placeholder='Email'
              value={email}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              placeholder='Password'
              value={password}
              required
            />
          </FormGroup>
          <Button id='auth-login' type='submit' style={{ marginTop: "5%" }}>
            Signup
          </Button>
        </Form>
        <p className='auth-toggle'>
          Already have an account?{" "}
          <Link className='auth-toggle-link' to='/' variant='body2'>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
