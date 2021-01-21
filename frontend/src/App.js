import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useReducer,
	useMemo,
} from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";

import { ThemeProvider } from "styled-components";
import { Theme, GlobalStyle } from "./theme";
import * as T from "./muiTheme";
import Landing from "./components/pages/auth/Landing";
import SignUp from "./components/pages/auth/SignUp";

import Home from "./components/pages/Home";
import UserContext from "./context/UserContext";
import { MuiThemeProvider } from "@material-ui/core";
import Logout from "./components/pages/auth/Logout";

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
	console.log(data);
	console.log("bejvlkndc");

	const providerData = useMemo(() => ({ data, setData }), [data, setData]);

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
