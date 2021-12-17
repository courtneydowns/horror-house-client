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
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const handleFullName = (e) => setFullName(e.taget.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword1 = (e) => setPassword(e.target.value);
  const handlePassword2 = (e) => setPassword2(e.target.valuse);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchResults = await fetch(`http://localhost:3001/user/signup`, {
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
          <h1 className='signin__header'>Welcome to Horror House!</h1>
        </header>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      ></Grid>
      <Box
        sx={{
          marginTop: 8,
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
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='full-name'
            label='Full Name'
            name='full-name'
            autoComplete='full-name'
            autoFocus
            validate
            value={fullName}
            onChange={handleFullName}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='username'
            label='Username'
            type='username'
            id='password'
            validate
            autoComplete='username'
            value={username}
            onChange={handleUsername}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='email'
            label='Email'
            type='email'
            id='email'
            validate
            autoComplete='email'
            value={email}
            onChange={handleEmail}
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
            value={"password"}
            onChange={handlePassword1}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Confirm Password'
            type='password'
            id='password'
            validate
            autoComplete='current-password'
            value={password2}
            onChange={handlePassword2}
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
              onClick={() => history.push("./")}
            >
              Already have an account? Sign up here.{" "}
            </p>
            {/* </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
