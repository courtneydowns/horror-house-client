import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Homepage from "./components/homepage/Homepage";
import SearchMovie from "./components/searchMovie/SearchMovie";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Homepage token={sessionToken} clearToken={clearToken} />
    ) : (
      <Auth token={sessionToken} updateToken={updateToken} />
    );
  };
  // {!sessionToken && <Sitebar clickLogout={clearToken} />}
  {
    /* <Sitebar clickLogout={clearToken} /> */
  }

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          {protectedViews()}
        </Route>
        {/* <Route exact path='/home'>
          <Homepage token={sessionToken} />
        </Route> */}
        <Route exact path='/search'>
          <SearchMovie />
        </Route>
        {/* <Route exact path="/profile">
                <ViewProfile token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/characters">
                <Characters token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/magical-objects">
                <MagicalObjects token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/spells">
                <Spells token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/potion-ingredients">
                <PotionIngredients token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/potions">
                <Potions token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/wand-cores">
                <WandCore token={this.state.sessionToken} />
              </Route> */}
        {/* <Route exact path="/wand-wood">
                <WandWood token={this.state.sessionToken} />
              </Route> */}
      </Switch>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Auth from "./components/Auth/Auth";
// import MainLayout from "./components/MainLayout";
// // import CreateProfile from "./components/Profile/CreateProfile";
// // import NotConnected from './components/MainLayoutComponents/NotConnected'
// import jwt_decode from "jwt-decode";
// import theme from "./components/Theme";
// import { ThemeProvider } from "@material-ui/styles";

// function App() {
//   //STATE VARIABLE AND SETTERS
//   // const [socket, setSocket] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [usersInfo, setUsersInfo] = useState({});
//   // const [onlineUsers, setOnlineUsers] = useState(null);
//   // const [notifications, setNotifications] = useState(null);
//   // const [typingUsers, setTypingUsers] = useState([]);
//   // const [matchlistNotifications, setMatchlistNotifications] = useState([]);
//   const [token, setToken] = useState("");

//   //LOGGING IN AND SIGNING UP
//   const updateToken = (t) => {
//     localStorage.setItem("token", t);
//     setToken(t);
//   };

//   //LOGGING OUT
//   const clearToken = () => {
//     setToken("");
//     setUsersInfo({});
//     // setOnlineUsers(null);
//     // setSocket(null);
//     setUserId(null);
//     localStorage.clear();
//   };

//   //LOOKING FOR TOKEN IN LOCAL STORAGE WHEN APP LOADS
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setToken(localStorage.getItem("token"));
//     }
//   }, []);

//   //DECODING THE TOKEN IF IT EXISTS
//   useEffect(() => {
//     if (token && localStorage.getItem("token") !== undefined) {
//       setUserId(jwt_decode(token).id);
//     }
//   }, [token]);

//   //OPENING A NEW SOCKET FOR CHAT AND REAL-TIME FEATURES
//   // useEffect(() => {
//   //   const newSocket = io(`${API_URL}`);
//   //   setSocket(newSocket);
//   //   return () => {
//   //     newSocket.close();
//   //   };
//   // }, [setSocket, userId]);

//   //EMITTING AND CAPTURING SOCKET EVENTS
//   // useEffect(() => {
//   //   if (token && userId && socket) {
//   //     socket.emit("newLogin", userId);
//   //     socket.on("userCreated", (obj) => {
//   //       setUsersInfo({ ...usersInfo, matches: obj.matches, user: obj.user });
//   //     });
//   //     socket.on("newUser", (socketIds) => {
//   //       setOnlineUsers(socketIds);
//   //     });
//   //     socket.on("matchUpdate", (obj) => {
//   //       socket.emit("newLogin", userId);
//   //     });
//   //     socket.on("notificationResponse", (notifications) => {
//   //       setNotifications(notifications);
//   //     });
//   //     socket.on("chatNotificationUpdate", (chatNotifications) => {
//   //       setMatchlistNotifications(chatNotifications);
//   //     });
//   //     socket.on("userTyping", (obj) => {
//   //       if (obj.typing) {
//   //         setTypingUsers([...typingUsers, obj.senderId]);
//   //       } else {
//   //         setTypingUsers(typingUsers.filter((user) => user !== obj.senderId));
//   //       }
//   //     });
//   //   }
//   // }, [socket, token, userId]);

//   //FETCHING NOTIFICATIONS
//   // useEffect(() => {
//   //   const notificationsFetch = async () => {
//   //     const response = await fetch(`${API_URL}/note/`, {
//   //       method: "GET",
//   //       headers: new Headers({
//   //         "Content-Type": "application/json",
//   //         Authorization: localStorage.getItem("token"),
//   //       }),
//   //     });
//   //     const notificationsJson = await response.json();
//   //     // console.log(notificationsJson.notifications);
//   //     setNotifications(notificationsJson.notifications);
//   //   };
//   //   if (usersInfo?.user && token && userId) {
//   //     notificationsFetch();
//   //   }
//   // }, [usersInfo?.matches, token, userId]);

//   //PROPS OBJECT
//   const mainLayoutProps = {
//     // socket,
//     token,
//     usersInfo,
//     // onlineUsers,
//     // notifications,
//     // matchlistNotifications,
//     // typingUsers,
//     // setTypingUsers,
//     // setMatchlistNotifications,
//     // setNotifications,
//     setUsersInfo,
//     // setOnlineUsers,
//     clearToken,
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div className='App'>
//         {token ? (
//           <MainLayout mainLayoutProps={mainLayoutProps} />
//         ) : (
//           <Auth
//             setUsersInfo={setUsersInfo}
//             updateToken={updateToken}
//             usersInfo={usersInfo}
//             // socket={socket}
//           />
//         )}
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;
