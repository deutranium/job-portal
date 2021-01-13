import React, { Component } from 'react';
import * as S from "./styled"
import * as M from '@material-ui/core';

class Applicant extends Component {
   
    render() { 
        return ( 
                <>
                <S.Field id="standard-basic" label="Name" fullWidth required />
                <S.Field id="standard-basic" label="Email" fullWidth required />
                <S.Field id="standard-basic" type="password" label="Password" fullWidth required />
                <S.Field id="standard-basic" type="number" label="Contact Number" fullWidth required />
                <S.Field id="standard-basic" label="Bio (upto 250 words)" fullWidth multiline/>
                <S.Button variant="contained" color="primary">Sign up as Recruiter</S.Button>
                </>          
         );
    }
}
 
export default Applicant;