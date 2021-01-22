import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import * as S from "./styled";
import * as M from "@material-ui/core";
import * as L from "@material-ui/lab";


function SignUp() {
	const login = () => history.push("/login");

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordCheck, setPasswordCheck] = useState();
	const [category, setCategory] = useState("applicant");
	const [name, setName] = useState();

	const [error, setError] = useState();

	const [contactNumber, setContactNumber] = useState();
	const [bio, setBio] = useState("");

	const { data, setData } = useContext(UserContext);
    const history = useHistory();
    
    if(data.auth == "AUTHENTICATED")
        history.push("/")

	const submit = async (e) => {
		e.preventDefault();

		try {
			const newUser = { email, password, passwordCheck, name, category };

			// normal user registration
			await axios.post("http://localhost:5000/users/register", newUser);

			// category specific registration
			if (category === "applicant") {
				const newApplicant = { email, name };
				await axios.post(
					"http://localhost:5000/applicant/register",
					newApplicant
				);
				console.log("app");
			} else {
				const newRecruiter = { email, name, contactNumber, bio };
				await axios.post(
					"http://localhost:5000/recruiter/register",
					newRecruiter
				);
				console.log("rec");
			}

			// user login
			const loginResponse = await axios.post(
				"http://localhost:5000/users/login",
				{
					email,
					password,
				}
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
						userData: res.data[0],
					});
				})
				.catch((err) => {
					console.log(err);
				});

			// set context values
			setData({
				...data,
				auth: "AUTHENTICATED",
				token: loginResponse.data.token,
				user: loginResponse.data.user
			});

			// set values in local storage
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
			err.response.data.msg && setError(err.response.data.msg);
		}
	};

	return (
		<M.Grid container>
			<S.LeftItem item md={5} sm={3} xs={0}></S.LeftItem>
			<S.RightItem item md={7} sm={9} xs={12}>
				<S.Card>
					<M.CardContent>
						{/* Sign Up */}
						<S.AccentText>Sign Up</S.AccentText>
						<form onSubmit={submit}>
							<S.Field
								id="standard-basic"
								label="Name"
								fullWidth
								required
								onChange={(e) => setName(e.target.value)}
                                />
							<S.Field
								id="standard-basic"
								label="Email"
								type="email"
								fullWidth
								required
								onChange={(e) => setEmail(e.target.value)}
                                />
							<M.Grid container spacing={1}>
								<M.Grid item md={6}>
									<S.Field
										id="standard-basic"
										type="password"
										label="Password"
										fullWidth
										required
										onChange={(e) =>
											setPassword(e.target.value)
										}
                                        />
								</M.Grid>
								<M.Grid item md={6}>
									<S.Field
										id="standard-basic"
										type="password"
										label="Confirm Password"
										fullWidth
										required
										onChange={(e) =>
											setPasswordCheck(e.target.value)
										}
                                        />
								</M.Grid>
							</M.Grid>

							<S.RadioGroup
								row
								aria-label="position"
								defaultValue="applicant"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
                                >
								<M.Grid container>
									<M.Grid item md={6} sm={6} xs={12}>
										<M.FormControlLabel
											value="applicant"
											control={
                                                <M.Radio color="primary" />
											}
											label="I'm an Applicant"
                                            />
									</M.Grid>
									<M.Grid item md={6} sm={6} xs={12}>
										<M.FormControlLabel
											value="recruiter"
											control={
                                                <M.Radio color="primary" />
											}
											label="I'm a Recruiter"
                                            />
									</M.Grid>
								</M.Grid>
							</S.RadioGroup>

							{category === "recruiter" && (
                                <>
									<S.Field
										id="standard-basic"
										label="Contact Number"
										type="number"
										fullWidth
										required
										onChange={(e) =>
											setContactNumber(e.target.value)
										}
                                        />
									<S.Field
										id="standard-basic"
										label="Bio (upto 250 words)"
										multiline
										fullWidth
										onChange={(e) => setBio(e.target.value)}
                                        />
								</>
							)}
                            {error && <L.Alert severity="error">{error}</L.Alert>}
							<S.Button
								variant="contained"
								color="primary"
								type="submit"
                                >
								Sign up
							</S.Button>
						</form>
						Already registered?{" "}
						<S.Link onClick={login}>Sign in here!</S.Link>
						<S.Divider></S.Divider>
					</M.CardContent>
				</S.Card>
			</S.RightItem>
		</M.Grid>
	);
}

export default SignUp;
