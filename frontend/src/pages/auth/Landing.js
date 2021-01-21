import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import * as S from "./styled";
import * as M from "@material-ui/core";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Landing() {
	const { data, setData } = useContext(UserContext);

	const register = () => history.push("/register");

	// Login
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	const login = async (e) => {
		e.preventDefault();
		try {
			const loginUser = { email, password };

			// login user
			const loginResponse = await axios.post(
				"http://localhost:5000/users/login",
				loginUser
			);

			// get user info
			const userResponse = await axios
				.get("http://localhost:5000/users/", {
					headers: {
						"x-auth-token": data.token,
					},
				})
				.then((res) => {
					setData({
						...data,
						userData: res.data,
					});
				})
				.catch((err) => {
					console.log(err);
				});

			// set context data
			setData({
				...data,
				auth: "AUTHENTICATED",
				token: loginResponse.data.token,
				user: loginResponse.data.user,
				userData: userResponse.data,
			});

			// set local storage values
			localStorage.setItem("auth", "AUTHENTICATED");
			localStorage.setItem("token", loginResponse.data.token);
			localStorage.setItem("user_id", loginResponse.data.user.id);
			localStorage.setItem("user_name", loginResponse.data.user.name);
			localStorage.setItem(
				"user_category",
				loginResponse.data.user.category
			);

			history.push("/");
		} catch (err) {
			err && setError(err);
		}
	};

	return (
		<M.Grid container>
			<S.LeftItem item md={5} sm={3} xs={0}></S.LeftItem>
			<S.RightItem item md={7} sm={9} xs={12}>
				<S.Card>
					<M.CardContent>
						<S.AccentText>Login</S.AccentText>
						{error && <ErrorNotice>{error}</ErrorNotice>}
						<form onSubmit={login}>
							<S.Field
								id="standard-basic email"
								label="Email"
								fullWidth
								type="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<S.Field
								id="standard-basic password"
								type="password"
								label="Password"
								fullWidth
								onChange={(e) => setPassword(e.target.value)}
							/>
							<S.Button
								variant="contained"
								color="primary"
								type="submit"
								value="Login"
							>
								Login
							</S.Button>
						</form>
						New user?{" "}
						<S.Link onClick={register}>Register here!</S.Link>
						<S.Divider></S.Divider>
					</M.CardContent>
				</S.Card>
			</S.RightItem>
		</M.Grid>
	);
}

export default Landing;
