import React, { useEffect, useContext, useLayoutEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import MainContainer from "../layout/MainContainer/MainContainer";
import Landing from "./auth/Landing";
import axios from "axios";

const Home = () => {
	const history = useHistory();
	const { data, setData } = useContext(UserContext);

	if (!data.auth) {
		history.push("/login");
	}
	return (
		<div>
			{data.auth == "AUTHENTICATED" ? (
				<MainContainer>
					{console.log(data)}
					{console.log("hehehe")}
					<h1>Welcome {data.user.name}</h1>
				</MainContainer>
			) : (
				<>
					<Landing />
				</>
			)}
		</div>
	);
};

export default Home;
