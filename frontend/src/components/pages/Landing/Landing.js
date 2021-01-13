import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "./../../../context/userContext"
// import AuthOptions from '../../auth/AuthOptions';
import * as S from "./styled"
import * as M from '@material-ui/core';
import ErrorNotice from '../../misc/ErrorNotice';

function Landing() {


    // Registration
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();

        try {
            const newUser = { email, password, passwordCheck, name };
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }

    };

    // Login
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [error, setError] = useState();

    // const { setUserData } = useContext(UserContext);
    // const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
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

                        

                        <S.Field id="standard-basic" label="Email" fullWidth />
                        <S.Field id="standard-basic" type="password" label="Password" fullWidth />
                        <S.Button variant="contained" color="primary">Login</S.Button>


                        <S.Divider></S.Divider>


                        {/* Sign Up */}

                        <S.AccentText>
                            Sign Up
                        </S.AccentText>
                        {error && <ErrorNotice>{error}</ErrorNotice>}
                        <form onSubmit={register}>
                        <S.Field id="standard-basic" label="Name" fullWidth required onChange={e => setName(e.target.value)} />
                        <S.Field id="standard-basic" label="Email" fullWidth required onChange={e => setEmail(e.target.value)} />
                        <S.Field id="standard-basic" type="password" label="Password" fullWidth required onChange={e => setPassword(e.target.value)} />
                        <S.Field id="standard-basic" type="password" label="Confirm Password" fullWidth required onChange={e => setPasswordCheck(e.target.value)} />

                        <M.RadioGroup row aria-label="position" name="position" defaultValue="applicant">
                            <M.Grid container>
                            <M.Grid item md={6} sm={6} xs={12}>
                                    <M.FormControlLabel
                                        value="applicant"
                                        control={<M.Radio color="primary" />}
                                        label="I'm an Applicant"
                                    />
                                </M.Grid>
                                <M.Grid item md={6} sm={6} xs={12}>
                                    <M.FormControlLabel
                                        value="recruiter"
                                        control={<M.Radio color="primary" />}
                                        label="I'm a Recruiter"
                                        selected
                                    />
                                </M.Grid>
                            </M.Grid>
                        </M.RadioGroup>

                        <S.Button variant="contained" color="primary" type="submit">Sign up</S.Button>
                        </form>
                    </M.CardContent>
                </S.Card>
            </S.RightItem>
        </M.Grid>
    );
}

export default Landing;