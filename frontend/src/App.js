import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import * as T from "./muiTheme";
import * as M from "@material-ui/core"

import Header from './components/layout/Header/Header';
import Landing from './components/pages/Landing/Landing';

import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import { HomeOutlined } from '@material-ui/icons';

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, { headers: { "x-auth-token": token } });
            if (tokenResponse.data) {
                const userRes = await axios.get("http://localhost:5000/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }

        checkLoggedIn();
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
          <Route exact path="/" component={Home} />
          {/* {/* <Route path="/register" component={Landing} /> */}
        <Route path="/login" component={Landing} />
        </Switch>
                    </UserContext.Provider>
                </BrowserRouter>
            </MuiThemeProvider>

        </ThemeProvider>

    );
}

export default App;
