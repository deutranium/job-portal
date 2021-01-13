import React, { Component } from 'react';
import AuthOptions from '../../auth/AuthOptions';
import * as S from "./styled"
import * as M from '@material-ui/core';

import Recruiter from "./Recruiter"
import Applicant from "./Applicant"

import TabGrp from "./../../layout/Tabs/Tabs"

const tabs = {
    "Recruiter":{
        component: <Recruiter />
    },
    "Applicant": {
        component: <Applicant />
    }
}

class Landing extends Component {
   
    render() { 
        return ( 
                <M.Grid container>
                <S.LeftItem item md={5} sm={3} xs={0}>
                    {/* <img src="https://images.unsplash.com/photo-1603993097397-89c963e325c7" /> */}
                </S.LeftItem>
                <S.RightItem item md={7} sm={9} xs={12}>
                    <S.Card>
                        <M.CardContent>
                            <S.AccentText>
                                Login
                            </S.AccentText>
                            <S.Field id="standard-basic" label="Email" fullWidth/>
                            <S.Field id="standard-basic" type="password" label="Password" fullWidth/>
                            <S.Button variant="contained" color="primary">Login</S.Button>
                            
                            
                            <S.Divider></S.Divider>
                            
                            
                            {/* Sign Up */}
                            
                            <S.AccentText>
                                Sign Up
                            </S.AccentText>
                            
                            <S.Field id="standard-basic" label="Name" fullWidth required />
                            <S.Field id="standard-basic" label="Email" fullWidth required />
                            <S.Field id="standard-basic" type="password" label="Password" fullWidth required />
                            
                            <M.RadioGroup row aria-label="position" name="position">
                                <M.Grid container>
                                    <M.Grid item md={6} sm={6} xs={12}>
                                        <M.FormControlLabel
                                            value="recruiter"
                                            control={<M.Radio color="primary" />}
                                            label="I'm a Recruiter"
                                            />
                                    </M.Grid>
                                    <M.Grid item md={6} sm={6} xs={12}>
                                        <M.FormControlLabel
                                            value="applicant"
                                            control={<M.Radio color="primary" />}
                                            label="I'm an Applicant"
                                            />
                                    </M.Grid>
                                </M.Grid>
                            </M.RadioGroup>

                            <S.Button variant="contained" color="primary">Sign up as Recruiter</S.Button>
                

                            {/* <TabGrp tabs={tabs} /> */}

                        </M.CardContent>
                    </S.Card>
                </S.RightItem>
            </M.Grid>            
         );
    }
}
 
export default Landing;