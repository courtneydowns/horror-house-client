// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import UploadingProfileImage from "./UploadingProfileImage";

// const Signup = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [username, setUsername] = useState("");

//   let history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch(`http://localhost:3001/user/signup`, {
//       //1
//       method: "POST",
//       body: JSON.stringify({
//         user: {
//           username: username,
//           profileImage: profileImage,
//           email: email,
//           password: password,
//         },
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         history.push("/home");
//         props.updateToken(data.sessionToken);
//         localStorage.setItem("profileImage", profileImage);
//         localStorage.setItem("userName", username);
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         alert("Something went wrong. Please try again.");
//         return;
//       });
//   };

//   return (
//     <div className='signup'>
//       <p className='signup__header'>Sign up to search and scream!</p>
//       <form onSubmit={handleSubmit}>
//         <UploadingProfileImage
//           setProfileImage={setProfileImage}
//           profileImage={profileImage}
//           className='signup__photo'
//         />
//         <input
//           onChange={(e) => setUsername(e.target.value)}
//           name='username'
//           placeholder='Username'
//           value={username}
//           required
//           className='signup__input'
//         />
//         <input
//           type='email'
//           onChange={(e) => setEmail(e.target.value)}
//           name='email'
//           placeholder='Email'
//           value={email}
//           required
//           className='signup__input'
//         />
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           name='password'
//           placeholder='Password'
//           value={password}
//           required
//           type='password'
//           className='signup__input'
//         />
//         <button className='signup__button' type='submit'>
//           Signup
//         </button>
//       </form>
//       <p className='signup__toggle' onClick={() => history.push("./signin")}>
//         Don't have an account? Sign up here.{" "}
//       </p>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const { updateToken } = props;
  const [name, setName] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  let history = useHistory();

  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword1 = (e) => setPassword1(e.target.value);
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  // const handleProfileImage = (e) => setProfileImage(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsernameAvailable = () => {
    const userAvailFetch = async () => {
      try {
        if (validateUsername(username)) {
          const usernameResults = await fetch(
            `http://localhost:3001/user/checkAvail/${username}`
          );
          const usernameJson = await usernameResults.json();
          setUsernameAvailable(usernameJson);
        } else if (username.length < 6) {
          setUsernameAvailable(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    userAvailFetch();
  };

  const validateName = (fullName) => fullName.split(" ").length >= 2;
  const validateUsername = (username) => username.length >= 6;
  const validateEmail = (emailAddress) =>
    emailAddress.split("").includes("@") && emailAddress.length >= 6;
  const validatePasswordsMatch = (p1, p2) => p1 === p2;
  const validatePasswordLength = (p1) => p1.length >= 8;

  useEffect(() => {
    setPasswordsMatch(validatePasswordsMatch(password1, password2));
  }, [password1, password2]);

  useEffect(handleUsernameAvailable, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      alert("Please fill out your full name.");
      return;
    }
    if (!validateUsername(username)) {
      alert("Username must be at least 6 characters long.");
      return;
    }
    if (!usernameAvailable) {
      alert("That username is already taken.");
    }
    if (!validateEmail(email)) {
      alert("Please use a valid email address.");
      return;
    }
    if (!passwordsMatch) {
      alert("Passwords must match.");
      return;
    }
    if (!validatePasswordLength(password1)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const fetchResults = await fetch(`http://localhost:3001/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          username,
          // profileImage,
          name: name
            .split(" ")
            .map((name) => name[0].toUpperCase() + name.slice(1))
            .join(" "),
          password: password1,
          email,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const json = await fetchResults.json();
      // console.log("json response", json);
      updateToken(json.sessionToken);
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit} className='signup__form'>
        {/* <UploadingProfileImage required /> */}
        <input
          placeholder='Full Name'
          name='full-name'
          required
          value={name}
          onChange={handleName}
          className='signup__input'
        />
        <input
          name='username'
          value={username}
          onChange={handleUsername}
          placeholder='Username'
          required
          className='signup__input'
        />
        <p
          style={{
            color: usernameAvailable ? "green" : "red",
          }}
        >
          {usernameAvailable === true
            ? "Username available!"
            : usernameAvailable === false
            ? "That username is already taken"
            : null}
        </p>
        <input
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleEmail}
          required
          className='signup__input'
        />
        <input
          required
          type='password'
          placeholder='password'
          value={password1}
          onChange={handlePassword1}
          className='signup__input'
        />
        <input
          color={!passwordsMatch ? "red" : null}
          required
          label={
            password2
              ? passwordsMatch
                ? "Passwords match ✔"
                : "Passwords must match"
              : "Re-enter password"
          }
          type='password'
          placeholder='Confirm Password'
          autoComplete='current-password'
          value={password2}
          onChange={handlePassword2}
          className='signup__input'
        />
        <button type='submit'>Sign up</button>
      </form>
      <p className='signup__toggle' onClick={() => history.push("./")}>
        Already have an account? Sign in here.{" "}
      </p>
    </div>
  );
};

export default Signup;
