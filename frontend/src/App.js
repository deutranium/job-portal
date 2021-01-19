import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import * as T from "./muiTheme";
import Landing from "./components/pages/auth/Landing";
import SignUp from "./components/pages/auth/SignUp";

import Home from "./components/pages/Home";
import UserContext from "./context/userContext";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        console.log(token);
        console.log("[[[[[");
        console.log(userRes);

        // ERROR HEEEEEEEERRRRRRRRREEEEEEEEEE!!!!!!!!
        setUserData({
          token,
          user: userRes.data,
        });
        // console.log("1111111");
        // console.log(userData)
      }
    };

    checkLoggedIn();

    console.log("--------");
    console.log(userData);
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider theme={T.theme}>
        <GlobalStyle />
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            {/* <Landing /> */}
            {/* <Header /> */}
            <Switch>
                {console.log(userData)}
              <Route exact path="/" component={Home} />
              <Route path="/register" component={SignUp} />
              <Route path="/login" component={Landing} />
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
