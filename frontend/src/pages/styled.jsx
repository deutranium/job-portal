import styled from "styled-components";
import * as M from "@material-ui/core";


export const Header = styled.div`
    font-size: 24px;
    font-weight: 300;
    padding: 20px 0 30px 0;
    color: ${(props) => props.theme.accent}
`;

export const TextField = styled(M.TextField)`
    margin: 0 10px;
`;

