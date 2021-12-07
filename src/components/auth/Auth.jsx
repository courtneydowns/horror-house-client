// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";

// const Auth = (props) => {
//   return (
//     <div>
//       <Router>
//         <Route exact path='/'>
//           <Login updateToken={props.updateToken} />
//         </Route>
//         <Route exact path='/signup'>
//           <Signup updateToken={props.updateToken} />
//         </Route>
//       </Router>
//     </div>
//   );
// };

// export default Auth;
// import CssBaseline from "@material-ui/core/CssBaseline";
// import React, { useState } from "react";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
// import Login from "./Login";
// import Signup from "./Signup";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     backgroundImage: "url(https://unsplash.com/photos/E15sFNfajSI)",
//     backgroundRepeat: "no-repeat",
//     backgroundColor:
//       theme.palette.type === "light"
//         ? theme.palette.grey[50]
//         : theme.palette.grey[900],
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function Auth(props) {
//   const { updateToken, setUsersInfo } = props;
//   const [loginShowing, setLoginShowing] = useState(true);
//   const classes = useStyles();

//   const toggleView = () => setLoginShowing(!loginShowing);

//   return (
//     <Grid container component='main' className={classes.root}>
//       <CssBaseline />
//       <Grid item xs={false} sm={4} md={7} className={classes.image} />
//       {loginShowing ? (
//         <Login
//           classes={classes}
//           updateToken={updateToken}
//           setUsersInfo={setUsersInfo}
//           toggleView={toggleView}
//         />
//       ) : (
//         <Signup
//           classes={classes}
//           updateToken={updateToken}
//           setUsersInfo={setUsersInfo}
//           toggleView={toggleView}
//         />
//       )}
//     </Grid>
//   );
// }
