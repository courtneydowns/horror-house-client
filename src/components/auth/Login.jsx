import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FaGhost } from "react-icons/fa";
import house from "../../assets/house.jpg";
import "../../sass/main.scss";

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
    <Grid container component='main' sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${house})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <header>
          <h1 className='signin__header'>Welcome back to Horror House!</h1>
        </header>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#cc0000" }}>
            <FaGhost style={{ fontSize: "3rem" }} />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              validate
              onChange={handleUsername}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              validate
              autoComplete='current-password'
              onChange={handlePassword}
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item> */}
              <p
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                className='signup__toggle'
                onClick={() => history.push("./signup")}
              >
                Already have an account? Sign up here.{" "}
              </p>
              {/* </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// export default function Login({ updateToken }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsername = (e) => setUsername(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);

//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const fetchResults = await fetch(`http://localhost:3001/user/`, {
//         method: "POST",
//         body: JSON.stringify({ username, password }),
//         headers: new Headers({
//           "Content-Type": "application/json",
//         }),
//       });
//       const json = await fetchResults.json();
//       if (!json.user || !json.sessionToken) {
//         alert(json.message);
//         return;
//       }
//       updateToken(json.sessionToken);
//       history.push("/home");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     // <div className='signin'>
//     //   <form className='signin__form' onSubmit={handleSubmit}>
//     //     <h3 className='signin__h3'>Signin</h3>
//     //     <div className='signin__container'>
//     //       <input
//     //         type='username'
//     //         onChange={handleUsername}
//     //         name='username'
//     //         placeholder='Username'
//     //         required
//     //         value={username}
//     //         className='signin__input'
//     //       />
//     //       <input
//     //         type='password'
//     //         onChange={handlePassword}
//     //         name='password'
//     //         placeholder='Password'
//     //         type='password'
//     //         required
//     //         value={password}
//     //         className='signin__input'
//     //       />
//     //       <button className='signin__button' type='submit'>
//     //         Login
//     //       </button>
//     //     </div>
//     //   </form>{" "}
//     //   <p className='signin__toggle' onClick={() => history.push("./signup")}>
//     //     Don't have an account? Sign up here.{" "}
//     //   </p>
//     // </div>
//   );
// }
