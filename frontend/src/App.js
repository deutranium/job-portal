import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
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
import Logout from "./components/pages/auth/Logout";

// initial state
const initialState = {
    auth: false,
    token: null,
    user: null,
};

// context to monitor user login states
const ContextReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                auth: true,
                token: action.payload.token,
                user: action.payload.userRes.data,
            };
        case "LOGOUT":
            return {
                ...state,
                auth: false,
                token: null,
                user: null,
            };
    }
};

const App = () => {
    const [userData, dispatch] = useReducer(ContextReducer, initialState);

    const tokenMain = localStorage.getItem("auth-token");

    const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        const tokenResponse = await axios.post(
            "http://localhost:5000/users/tokenIsValid",
            null,
            { headers: { "x-auth-token": token } }
        );
        if (tokenResponse.data) {
            const userRes = await axios.get("http://localhost:5000/users/", {
                headers: { "x-auth-token": token },
            });
            dispatch({
                type: "LOGIN",
                payload: {
                    token,
                    userRes,
                },
            });
        } else {
            dispatch({
                type: "LOGOUT",
            });
        }
    };


    useEffect(() => {
        window.addEventListener("storage", (e) => {
            try {
                checkLoggedIn();
            } catch {
                dispatch({
                    type: "LOGOUT",
                });
            }
        });
    }, []);
    
    useEffect(() => {
        if (tokenMain) {
            checkLoggedIn()
        }
        else {
            dispatch({
                type: "LOGOUT",
            });
        }
    }, [tokenMain])

    return (
        <ThemeProvider theme={Theme}>
            <MuiThemeProvider theme={T.theme}>
                <GlobalStyle />
                <BrowserRouter>
                    <UserContext.Provider value={{ userData, dispatch }}>
                        {/* <Landing /> */}
                        {/* <Header /> */}
                        <Switch>
                            {console.log("App.......")}
                            {console.log(userData)}
                            <Route exact path="/" component={Home} />
                            <Route path="/register" component={SignUp} />
                            <Route path="/login" component={Landing} />
                            <Route path="/logout" component={Logout} />
                        </Switch>
                    </UserContext.Provider>
                </BrowserRouter>
            </MuiThemeProvider>
        </ThemeProvider>
    );
};

export default App;
