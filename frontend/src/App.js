import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import * as T from "./muiTheme";

import Landing from "./pages/auth/Landing";
import SignUp from "./pages/auth/SignUp";

import Home from "./pages/Home";
import UserContext from "./context/UserContext";
import { MuiThemeProvider } from "@material-ui/core";
import Logout from "./pages/auth/Logout";
import Profile from "./pages/Profile"

const previousState = {
    auth: localStorage.getItem("auth"),
    token: localStorage.getItem("token"),
    user: {
        id: localStorage.getItem("user_id"),
        name: localStorage.getItem("user_name"),
        category: localStorage.getItem("user_category"),
    },
};

const initialState = {
    auth: previousState.auth ? previousState.auth : "UNAUTHENTICATED",
    token: null || previousState.token,
    user: null || previousState.user,
    userData: null,
};


const App = () => {
    const [data, setData] = useState(initialState);

    const providerData = useMemo(() => ({ data, setData }), [data, setData]);

    return (

        <ThemeProvider theme={Theme}>
            <MuiThemeProvider theme={T.theme}>
                <GlobalStyle />
                <BrowserRouter>
                    <UserContext.Provider value={providerData}>

                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={SignUp} />
                        <Route path="/login" component={Landing} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/profile" component={Profile} />

                    </UserContext.Provider>
                </BrowserRouter>
            </MuiThemeProvider>
        </ThemeProvider>
    );
};

export default App;
