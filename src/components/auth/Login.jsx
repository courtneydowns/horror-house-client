import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.sessionToken) {
          alert("Username or Password is incorrect. Please try again.");
          return;
        }
        history.push("/home");
        props.updateToken(data.sessionToken);
        localStorage.setItem("profilePhoto", data.user.profilePhoto);
        localStorage.setItem("username", data.user.username);
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
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              value={email}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              required
              type={toggle === true ? "password" : "text"}
            />
            <i
              className={
                toggle === true
                  ? "far fa-eye password-icon"
                  : "far fa-eye-slash password-icon"
              }
              onClick={() => setToggle(!toggle)}
            />
          </FormGroup>
          <Button id="auth-login" type="submit">
            Login
          </Button>
        </Form>
        <p className="auth-toggle">
          Don't have an account?{" "}
          <Link className="auth-toggle-link" to="/register" variant="body2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
