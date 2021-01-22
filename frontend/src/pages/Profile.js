import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import MainContainer from "../components/layout/MainContainer/MainContainer";
import UserContext from "../context/UserContext";
import * as M from "@material-ui/core";
import * as S from "./styled";
import * as I from '@material-ui/icons';

const Logout = () => {
    const { data, setData } = useContext(UserContext);


    return (
        <MainContainer>
            <M.TextField
                id="input-with-icon-textfield"
                label="TextField"
                InputProps={{
                    startAdornment: (
                        <M.InputAdornment position="start">
                            <I.AccountCircle />
                        </M.InputAdornment>
                    ),
                }}
            />
        </MainContainer>
    );
};

export default Logout;
