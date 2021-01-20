import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext"
import * as S from "./styled"
import * as M from '@material-ui/core';
import ErrorNotice from '../../misc/ErrorNotice';


function Landing() {

    const { data, setData } = useContext(UserContext);

    const register = () => history.push("/register");

    // Login
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { userData, dispatch } = useContext(UserContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);
            // changeUserData({
            //     token: loginResponse.data.token,
            //     user: loginResponse.data.user
            // });
            console.log(loginResponse);
            // console.log("************")
            // dispatch({
            //     type: "LOGIN",
            //     payload: {
            //         token: loginResponse.data.token,
            //         userRes: loginResponse.data.user
            //     }
            // })
            // localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("auth", "AUTHENTICATED");
            setData({
                auth: "AUTHENTICATED",
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            history.push("/");

        } catch (err) {
            err && setError(err)
            // console.log("lol")
        }

    };





    return (
        <M.Grid container>
            <S.LeftItem item md={5} sm={3} xs={0}>
            </S.LeftItem>
            <S.RightItem item md={7} sm={9} xs={12}>
                <S.Card>
                    <M.CardContent>
                        <S.AccentText>
                            Login
                        </S.AccentText>
                        {error && <ErrorNotice>{error}</ErrorNotice>}
                        <form onSubmit={login}>
                            <S.Field id="standard-basic" label="Email" fullWidth type="email" id="email" onChange={e => setEmail(e.target.value)} />
                            <S.Field id="standard-basic" type="password" label="Password" fullWidth id="password" onChange={e => setPassword(e.target.value)} />
                            <S.Button variant="contained" color="primary" type="submit" value="Login">Login</S.Button>
                        </form>
                            New user? <S.Link onClick={register}>Register here!</S.Link>

                        <S.Divider></S.Divider>

                    </M.CardContent>
                </S.Card>
            </S.RightItem>
        </M.Grid>
    );
}

export default Landing;