import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/userContext"
// import AuthOptions from '../../auth/AuthOptions';
import * as S from "./styled"
import * as M from '@material-ui/core';
import ErrorNotice from '../../misc/ErrorNotice';

import TabGrp from "./../../layout/Tabs/Tabs"



function Landing() {
    const login = () => history.push("/login");

    const [applicantEmail, setApplicantEmail] = useState();
    const [applicantPassword, setApplicantPassword] = useState();
    const [applicantPasswordCheck, setApplicantPasswordCheck] = useState();
    // const [category, setCategory] = useState('applicant');
    const [applicantName, setApplicantName] = useState();
    const [error, setError] = useState();



    const [recruiterEmail, setRecruiterEmail] = useState();
    const [recruiterPassword, setRecruiterPassword] = useState();
    const [recruiterPasswordCheck, setRecruiterPasswordCheck] = useState();
    // const [category, setCategory] = useState('applicant');
    const [recruiterName, setRecruiterName] = useState();
    const [recruiterContact, setRecruiterContact] = useState();
    const [recruiterBio, setRecruiterBio] = useState();





    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const applicantSubmit = async (e) => {
        e.preventDefault();
        let category = "applicant";
        let email = applicantEmail;
        let password = applicantPassword;
        let passwordCheck = applicantPasswordCheck;
        let name = applicantName;

        try {
            const newUser = { email, password, passwordCheck, name, category };
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

    const recruiterSubmit = async (e) => {
        e.preventDefault();
        let category = "recruiter";
        let email = recruiterEmail;
        let password = recruiterPassword;
        let passwordCheck = recruiterPasswordCheck;
        let name = recruiterName;

        try {
            const newUser = { email, password, passwordCheck, name, category };
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

    const tabs = {
        "Applicant": {
            component: <form onSubmit={applicantSubmit}>
                <S.Field id="standard-basic" label="Name" fullWidth required onChange={e => setApplicantName(e.target.value)} />
                <S.Field id="standard-basic" label="Email" type="email" fullWidth required onChange={e => setApplicantEmail(e.target.value)} />
                <M.Grid container spacing={1}>
                    <M.Grid item md={6}>
                        <S.Field id="standard-basic" type="password" label="Password" fullWidth required onChange={e => setApplicantPassword(e.target.value)} />
                    </M.Grid>
                    <M.Grid item md={6}>
                        <S.Field id="standard-basic" type="password" label="Confirm Password" fullWidth required onChange={e => setApplicantPasswordCheck(e.target.value)} />
                    </M.Grid>
                </M.Grid>
                {/* <M.Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </M.Button> */}
                <S.Button variant="contained" color="primary" type="submit">Sign up</S.Button>

            </form>
        },
        "Recruiter": {
            component:
                <form onSubmit={recruiterSubmit}>
                    <S.Field id="standard-basic" label="Name" fullWidth required onChange={e => setRecruiterName(e.target.value)} />
                    <S.Field id="standard-basic" label="Email" type="email" fullWidth required onChange={e => setRecruiterEmail(e.target.value)} />
                    <M.Grid container spacing={1}>
                        <M.Grid item md={6}>
                            <S.Field id="standard-basic" type="password" label="Password" fullWidth required onChange={e => setRecruiterPassword(e.target.value)} />
                        </M.Grid>
                        <M.Grid item md={6}>
                            <S.Field id="standard-basic" type="password" label="Confirm Password" fullWidth required onChange={e => setRecruiterPasswordCheck(e.target.value)} />
                        </M.Grid>
                    </M.Grid>

                    <S.Field id="standard-basic" label="Contact Number" type="number" fullWidth required onChange={e => setRecruiterContact(e.target.value)} />
                    <S.Field id="standard-basic" label="Bio (upto 250 words)" multiline fullWidth onChange={e => setRecruiterBio(e.target.value)} />

                    {/* <M.RadioGroup row aria-label="position" defaultValue="applicant" value={category} onChange={e => setCategory(e.target.value)}>
                <M.Grid container>
                    <M.Grid item md={6} sm={6} xs={12}>
                        <M.FormControlLabel
                            value="applicant"
                            control={<M.Radio color="primary" />}
                            label="I'm an Applicant"
                        />
                    </M.Grid>
                </M.Grid>
            </M.RadioGroup> */}

                    <S.Button variant="contained" color="primary" type="submit">Sign up</S.Button>

                </form>
        }
    }

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

                        <TabGrp tabs={tabs} />

                        Already registered? <S.Link onClick={login}>Sign in here!</S.Link>
                        <S.Divider></S.Divider>
                    </M.CardContent>
                </S.Card>
            </S.RightItem>
        </M.Grid>
    );
}

export default Landing;