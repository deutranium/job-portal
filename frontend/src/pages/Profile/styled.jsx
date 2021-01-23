import styled from "styled-components";
import * as M from "@material-ui/core";
import * as P from '@material-ui/pickers';


export const Header = styled.div`
    font-size: 24px;
    font-weight: 300;
    padding: 20px 0 30px 0;
    color: ${(props) => props.theme.accent}
`;

export const TextField = styled(M.TextField)`
    margin: 0 20px !important;
`;

export const Divider = styled(M.Divider)`
    margin-top: 40px !important;
`;

export const KeyboardDatePicker = styled(P.KeyboardDatePicker)`
    margin: 50px 20px 20px !important;
`;

export const EducationWrapper = styled.div`
    margin: 50px 0;
`;