import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Logout = () => {
	const { setData } = useContext(UserContext);
	const history = useHistory();

    localStorage.setItem("auth", "UNAUTHENTICATED");
	setData({
		auth: "UNAUTHENTICATED",
		token: null,
		user: null,
		userData: null,
	});
	history.push("/");

    return <div>Logging you out...</div>;
};

export default Logout;
