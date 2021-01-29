import styled from "styled-components";
import * as M from "@material-ui/core";
import * as P from '@material-ui/pickers';

export const UpdateButton = styled(M.Button).attrs({"variant": "outlined"})`
    color: orange !important;
    border-color: orange !important;
    margin-right: 10px !important
`;

export const DeleteButton = styled(M.Button).attrs({"variant": "outlined"})`
    color: red !important;
    border-color: red !important;
`;

export const Filter = styled(M.Paper)`
    padding: 20px 50px;
    margin: 10px 0;
`;
