import { Row } from "react-grid-system";
import styled from "styled-components";
import * as M from "@material-ui/core";

export const HeadRow = styled(Row)`
    background: #eee;
    padding: 20px 0;
    border-bottom: 1px solid ${(props) => props.theme.primary}
    color: ${(props) => props.theme.accent};
    margin: 50px 0 20px;
`;

export const JobRow = styled(Row).attrs({ align: "center" })`
	padding: 20px 0;
	border-bottom: 1px solid ${(props) => props.theme.border1};
`;

export const JobTitle = styled.span`
	color: ${(props) => props.theme.accent};
	font-weight: 900;
	font-size: 16px;
`;

export const PostedOn = styled.span`
	color: ${(props) => props.theme.dark1};
	font-size: 12px;
`;

export const Recruiter = styled.span`
	color: ${(props) => props.theme.accent};
	font-weight: 400;
	font-size: 15px;
`;

export const RecruiterMail = styled.span`
	color: ${(props) => props.theme.accent};
	font-weight: 300;
`;

export const JobButton = styled(M.Button).attrs({
	variant: "contained",
})`
	background-color: ${(props) =>
		props.color ? props.color : "green"} !important;
	color: ${(props) => props.theme.lightAccent};
`;
