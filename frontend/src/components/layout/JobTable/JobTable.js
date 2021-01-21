import React from "react";
import * as S from "./styled";
import { Col, Container, Row } from "react-grid-system";
import * as M from "@material-ui/core";
import JobRow from "./JobRow";

const JobTable = () => {
	return (
		<M.StylesProvider injectFirst>
			<S.HeadRow align="center">
				<Col md={2.5}>Title</Col>
				{/* <Col>Posted on</Col> */}
				<Col md={1.8}>Deadline</Col>
				<Col md={1.2}>Type</Col>
				<Col md={2}>Recruiter</Col>
				<Col md={1}>Duration</Col>
				<Col md={1.5}>Salary Per Month</Col>
				<Col md={1}>Rating</Col>
				<Col md={1}></Col>
			</S.HeadRow>
			<JobRow />
			<JobRow />
		</M.StylesProvider>
	);
};

export default JobTable;
