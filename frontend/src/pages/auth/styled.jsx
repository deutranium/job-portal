import styled from "styled-components";
import * as M from "@material-ui/core";

export const Head = styled.div`
	display: flex;
	width: 100vw;
	justify-content: space-between;
	padding: 10px 20px;
	font-size: 24px;
	background-color: #850264;
`;

export const LeftItem = styled(M.Grid)`
	background-image: url("https://images.unsplash.com/photo-1499750310107-5fef28a66643");
	background-position: center;
	background-size: cover;
	min-height: 100vh;
`;

export const RightItem = styled(M.Grid)`
	padding: 200px 0 0 0;
	background-color: ${(props) => props.theme.bgPrimary};
`;

export const Card = styled(M.Card)`
	width: 500px;
	margin: auto;
	padding: 40px 10px;
	border-bottom: 3px solid ${(props) => props.theme.accent};
`;

export const AccentText = styled.div`
	color: ${(props) => props.theme.accent};
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 10px;
`;

export const Field = styled(M.TextField)`
	margin: 10px 0;
`;

export const Divider = styled.div`
	margin: 50px 0;
	text-transform: uppercase;
	border-bottom: 1px solid ${(props) => props.theme.accent};
`;

export const Button = styled(M.Button)`
	margin: 20px 0;
	font-weight: 600;
`;

export const Link = styled.a`
	color: ${(props) => props.theme.accent};
	text-decoration: none;
	cursor: pointer;
`;

export const RadioGroup = styled(M.RadioGroup)`
	margin-top: 30px;
`;
