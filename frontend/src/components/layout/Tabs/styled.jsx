import styled from "styled-components";

export const TabWrapper = styled.div`
	margin-top: 20px;
	${(props) =>
		Object.keys(props.theme).map(
			(key) =>
				`.selected-${key} {
                    border-top: 2px solid ${props.theme[key]};
                    color: ${props.theme[key]} !important;
                }`
		)}
`;
