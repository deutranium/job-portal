import React, { useState, useEffect, useLayoutEffect, useReducer, useMemo } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import * as T from "./muiTheme";
import Landing from "./components/pages/auth/Landing";
import SignUp from "./components/pages/auth/SignUp";

import Home from "./components/pages/Home";
import UserContext from "./context/UserContext";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import Logout from "./components/pages/auth/Logout";

const previousState = localStorage.getItem("auth");

const initialState = {
    auth: false || previousState,
    token: "lol"
}

const App = () => {
    const [data, setData] = useState(initialState);

    const providerData = useMemo(() => ({ data, setData }), [data, setData])

    return (
        <ThemeProvider theme={Theme}>
            <MuiThemeProvider theme={T.theme}>
                <GlobalStyle />
                <BrowserRouter>
                    <UserContext.Provider value={providerData}>
                        {/* <Landing /> */}
                        {/* <Header /> */}
                        {/* <Switch> */}
                        {console.log("App.......")}
                        {/* {console.log(userData)} */}
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={SignUp} />
                        <Route path="/login" component={Landing} />
                        <Route path="/logout" component={Logout} />
                        {/* </Switch> */}
                    </UserContext.Provider>
                </BrowserRouter>
            </MuiThemeProvider>
        </ThemeProvider>
    );
};

export default App;
