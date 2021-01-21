import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import MainContainer from "../components/layout/MainContainer/MainContainer";
import Landing from "./auth/Landing";

const Home = () => {
	const history = useHistory();
	const { data } = useContext(UserContext);

	if (!data.auth) {
		history.push("/login");
	}
	return (
		<div>
			{data.auth === "AUTHENTICATED" ? (
				<MainContainer>
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
