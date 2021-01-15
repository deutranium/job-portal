import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/userContext"
// import AuthOptions from '../../auth/AuthOptions';
import * as S from "./styled"
import * as M from '@material-ui/core';
import ErrorNotice from '../../misc/ErrorNotice';


function Landing() {
    const login = () => history.push("/login");

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [category, setCategory] = useState('applicant');
    const [name, setName] = useState();

    const [error, setError] = useState();
    
    const [contactNumber, setContactNumber] = useState();
    const [bio, setBio] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { email, password, passwordCheck, name, category };
            await axios.post("http://localhost:5000/users/register", newUser);
            if (category == "applicant"){
                const newApplicant = {email, name}
                await axios.post("http://localhost:5000/applicant/register", newApplicant);
                console.log("app")
            }
            else {
                const newRecruiter = {email, name, contactNumber, bio}
                await axios.post("http://localhost:5000/recruiter/register", newRecruiter);
                console.log("rec")
            }
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


    return (
        <M.Grid container>
            <S.LeftItem item md={5} sm={3} xs={0}>
            </S.LeftItem>
            <S.RightItem item md={7} sm={9} xs={12}>
                <S.Card>
                    <M.CardContent>
                        {/* Sign Up */}

                        <S.AccentText>
                            Sign Up
                        </S.AccentText>
                        {error && <ErrorNotice>{error}</ErrorNotice>}

                        <form onSubmit={submit}>
                            <S.Field id="standard-basic" label="Name" fullWidth required onChange={e => setName(e.target.value)} />
                            <S.Field id="standard-basic" label="Email" type="email" fullWidth required onChange={e => setEmail(e.target.value)} />
                            <M.Grid container spacing={1}>
                                <M.Grid item md={6}>
                                    <S.Field id="standard-basic" type="password" label="Password" fullWidth required onChange={e => setPassword(e.target.value)} />
                                </M.Grid>
                                <M.Grid item md={6}>
                                    <S.Field id="standard-basic" type="password" label="Confirm Password" fullWidth required onChange={e => setPasswordCheck(e.target.value)} />
                                </M.Grid>
                            </M.Grid>

                            <S.RadioGroup row aria-label="position" defaultValue="applicant" value={category} onChange={e => setCategory(e.target.value)}>
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
                                        />
                                    </M.Grid>
                                </M.Grid>
                            </S.RadioGroup>

                            {
                                (category == "recruiter") && <>
                                    <S.Field id="standard-basic" label="Contact Number" type="number" fullWidth required onChange={e => setContactNumber(e.target.value)} />
                                    <S.Field id="standard-basic" label="Bio (upto 250 words)" multiline fullWidth onChange={e => setBio(e.target.value)} />
                                </>
                            }
                            <S.Button variant="contained" color="primary" type="submit">Sign up</S.Button>

                        </form>

                        Already registered? <S.Link onClick={login}>Sign in here!</S.Link>
                        <S.Divider></S.Divider>
                    </M.CardContent>
                </S.Card>
            </S.RightItem>
        </M.Grid>
    );
}

export default Landing;