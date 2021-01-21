import React, { useContext, useEffect } from "react";
import * as S from "./styled";
import Navigation from "./Navigation";
import JobTable from "../JobTable/JobTable";
import UserContext from "./../../../context/UserContext";
import axios from "axios";

const MainContainer = ({ children }) => {
	// get data from context
	const { data, setData } = useContext(UserContext);

	return (
		<div>
			{/* side navigation */}
			<Navigation />

			{/* main content */}
			<S.Content>
				{/* get element children */}
				{children}

				{/* job listings */}
				<JobTable />
			</S.Content>
		</div>
	);
};

export default MainContainer;
