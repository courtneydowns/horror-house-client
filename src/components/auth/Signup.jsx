import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UploadingProfileImage from "./UploadingProfileImage";

const Signup = (props) => {
  const { updateToken } = props;
  // const { width } = useWindowDimensions();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  // const [email, setEmail] = useState("");
  // const [passwordsMatch, setPasswordsMatch] = useState(null);
  // const [usernameAvailable, setUsernameAvailable] = useState(null);

  let history = useHistory();

  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
};
const handleEmail = (e) => setEmail(e.target.value);
const handleProfileImage = (e) => setProfileImage(e.target.value);

// const handleUsernameAvailable = () => {
//   const userAvailFetch = async () => {
//     try {
//       if (validateUsername(username)) {
//         const usernameResults = await fetch(
//           `http://localhost:3001/user/checkAvail/${username}`
//         );
//         const usernameJson = await usernameResults.json();
//         setUsernameAvailable(usernameJson);
//       } else if (username.length < 6) {
//         setUsernameAvailable(null);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   userAvailFetch();
// };

// const validateName = (fullName) => fullName.split(" ").length >= 2;
// const validateUsername = (username) => username.length >= 6;
// const validateEmail = (emailAddress) =>
//   emailAddress.split("").includes("@") && emailAddress.length >= 6;
// const validatePasswordsMatch = (p1, p2) => p1 === p2;
// const validatePasswordLength = (p1) => p1.length >= 8;

// useEffect(() => {
//   setPasswordsMatch(validatePasswordsMatch(password1, password2));
// }, [password1, password2]);

// useEffect(handleUsernameAvailable, [username]);

// const handleSignup = (e) => {
//   e.preventDefault();
//   if (!validateName(name)) {
//     alert("Please fill out your full name.");
//     return;
//   }
//   if (!validateUsername(username)) {
//     alert("Username must be at least 6 characters long.");
//     return;
//   }
//   if (!usernameAvailable) {
//     alert("That username is already taken.");
//   }
//   if (!validateEmail(email)) {
//     alert("Please use a valid email address.");
//     return;
//   }
//   if (!passwordsMatch) {
//     alert("Passwords must match.");
//     return;
//   }
//   if (!validatePasswordLength(password1)) {
//     alert("Password must be at least 8 characters long.");
//     return;
//   }
const handleSubmit = (e) => {
  e.preventDefault();
  fetch(`http://localhost:3001/user/signup`, {
    method: "POST",
    body: JSON.stringify({
      user: {
        name: name,
        username: username,
        profileImage: profileImage,
        email: email,
        password1: password,
      },
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      history.push("/home");
      updateToken(data.sessionToken);
      localStorage.setItem("profileImage", profileImage);
      localStorage.setItem("username", username);
    })
    .catch((error) => {
      console.log("Error", error);
    });
  }

//   try {
//     const fetchResults = await fetch(`localhost:3001/user/signup`, {
//       method: "POST",
//       body: JSON.stringify({
//         profileImage: profileImage,
//         username: username,
//         name: name
//           .split(" ")
//           .map((name) => name[0].toUpperCase() + name.slice(1))
//           .join(" "),
//         password: password1,
//         email: email,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//     });
//     const json = await fetchResults.json();
//     console.log("json response", json);
//     updateToken(json.sessionToken);
//   } catch (err) {
//     console.error(err);
//   }
// };

return (
  <div className='signup'>
    <div form onSubmit={handleSubmit} className='signup__form'>
      <UploadingProfileImage setProfileImage={handleProfileImage} />
      {/* <label className='signup__label' htmlFor='name'>
          Full Name
        </label> */}
      <input
        className='signup__input'
        type='full-name'
        placeholder='Full Name'
        name='full-name'
        value={name}
        onChange={handleName}
      />
      <div className='signup__username'>
        {/* <label className='signup__label' htmlFor='username'>
            Username
          </label> */}
        <input
          className='signup__input'
          type='username'
          placeholder='Username'
          name='username'
          style={{
            color: usernameAvailable ? "green" : "red",
          }}
          value={username}
          onChange={handleUsername}
        />
        {usernameAvailable === true
          ? "Username available!"
          : usernameAvailable === false
          ? "That username is already taken"
          : null}
        {/* {usernameAvailable === true
            ? "Username available!"
            : usernameAvailable === false
            ? "That username is already taken"
            : null} */}
        <div className='signup__email'>
          {/* <label className='signup__label' htmlFor='email'>
              Email
            </label> */}
          <input
            className='signup__input'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleEmail}
          />
          <div className='signup__password1'>
            {/* <label className='signup__label' htmlFor='password'>
                Password
              </label> */}
            <input
              className='signup__input'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handlePassword}
            />
            {/* <div className='signup__password2'> */}
            {/* <label className='signup__label' htmlFor='password'>
                  Confirm Password
                </label> */}
            {/* <label
                  {...(password2
                    ? passwordsMatch
                      ? "Passwords match"
                      : "Passwords must match"
                    : "Re-enter password")}
                /> */}
            {/* <input
                  className='signup__input'
                  type='password'
                  placeholder='Confirm Password'
                  name='password'
                  value={password2}
                  onChange={handlePassword2}
                /> */}
            <button className='signup__button' type='submit'>
              Signup
            </button>
          </div>
          <p className='toggle' onClick={() => history.push("./")}>
            Don't have an account? Sign up here.{" "}
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default Signup;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { useHistory } from "react-router-dom";
// // import { Button, Form, FormGroup, Input } from "reactstrap";
// import UploadingProfileImage from "./UploadingProfileImage";

// const Signup = (props) => {
//   const { updateToken, toggleView } = props;
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [passwordsMatch, setPasswordsMatch] = useState(null);
//   const [usernameAvailable, setUsernameAvailable] = useState(null);
//   debugger;
//   const handleName = (e) => setName(e.target.value);
//   const handleUsername = (e) => setUsername(e.target.value);
//   const handlePassword1 = (e) => setPassword1(e.target.value);
//   const handlePassword2 = (e) => setPassword2(e.target.value);
//   const handleEmail = (e) => setEmail(e.target.value);
//   const handleUsernameAvailable = () => {
//     const userAvailfetch = async () => {
//       try {
//         if (validateUsername(username)) {
//           const usernameResults = await fetch(
//             `http://localhost:3001/user/checkAvail${username}`
//           );
//           const usernameJson = await usernameResults.json();
//           setUsernameAvailable(usernameJson);
//         } else if (username.length < 6) {
//           setUsernameAvailable(null);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     userAvailfetch();
//   };

//   // const history = useHistory();

//   const validateName = (fullName) => fullName.split(" ").length >= 2;

//   const validateUsername = (username = username.length >= 6);

//   const validateEmail = (emailAddress) =>
//     emailAddress.split("").include("@") && emailAddress.length >= 6;

//   const validatePasswordsMatch = (p1, p2) => p1 === p2;

//   const validatePasswordLength = (p1) => p1.length >= 8;

//   useEffect(() => {
//     setPasswordsMatch(validatePasswordsMatch(password1, password2));
//   }, [password1, password2]);

//   useEffect(handleUsernameAvailable, [username]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateName(name)) {
//       alert("Please fill out your full name.");
//       return;
//     }
//     if (validateUsername(username)) {
//       alert("Username must be at least 6 characters long.");
//       return;
//     }
//     if (!usernameAvailable) {
//       alert("That username is already taken.");
//       return;
//     }
//     if (!validateEmail(email)) {
//       alert("Please use a valid email address.");
//       return;
//     }
//     if (!passwordsMatch) {
//       alert("Passwords must match.");
//       return;
//     }
//     if (!validatePasswordLength(password1)) {
//       alert("Password must be at least 8 characters long.");
//       return;
//     }

//     try {
//       const fetchResults = await fetch("http:localhost:3000/user/signup", {
//         method: "POST",
//         body: JSON.stringify({
//           username,
//           name: name
//             .split(" ")
//             .map((name) => name[0].toUpperCase() + name.slice(1))
//             .join(" "),
//           password: password1,
//           email,
//         }),
//         headers: new Headers({ "Content-Type": "application/json" }),
//       });
//       const json = await fetchResults.json();
//       updateToken(json.sessionToken);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <div className='login'>
//         <UploadingProfileImage />
//         <h4 className='login-title'>Signup</h4>
//         <div form onSubmit={handleSubmit}>
//           <label className='login__label' htmlFor='full-name'>
//             Full Name
//           </label>
//           <input
//             className='login__input'
//             onChange={handleName}
//             name='full-name'
//             id='full-name'
//             value={name}
//           />
//           <form>
//             <label className='login__label' htmlFor='username'>
//               Username
//             </label>
//             <input
//               title='Username must be at least 6 characters!'
//               className='login__input'
//               type='username'
//               onChange={handleUsername}
//               id='username'
//               name='username'
//               value={username}
//             />
//             <div>
//               <label className='login__label' htmlFor='email'>
//                 Email
//               </label>
//               <input
//                 className='login__input'
//                 type='email'
//                 onChange={handleEmail}
//                 id='email'
//                 name='email'
//                 value={email}
//               />
//               <div>
//                 <label className='login__label' htmlFor='password1'>
//                   Password
//                 </label>
//                 <input
//                   title='Please choose a password'
//                   className='login__input'
//                   type='password'
//                   onChange={handlePassword1}
//                   id='password'
//                   name='password'
//                   value={password1}
//                 />
//                 <input
//                   title='Confirmpassword'
//                   className='login__input'
//                   label={
//                     password2
//                       ? passwordsMatch
//                         ? "Passwords match ✔"
//                         : "Passwords must match"
//                       : "Re-enter password"
//                   }
//                   onChange={handlePassword2}
//                   id='password'
//                   name='password'
//                   value={password2}
//                   type='password'
//                   autoComplete='current-password'
//                 />
//                 <button
//                   className='signup__button'
//                   id='login__button'
//                   type='submit'
//                 >
//                   Login
//                 </button>
//               </div>
//               <p className='toggle'>
//                 <Link onClick={toggleView}>
//                   {"Already have an account? Sign in here!"}
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
