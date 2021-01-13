import React, { Component } from 'react';
import AuthOptions from '../../auth/AuthOptions';
import * as S from "./styled"
import * as M from '@material-ui/core';

class Header extends Component {
   
    render() { 
        return ( 
                <M.Grid container>
                <S.LeftItem item md={5} sm={3} xs={12}>
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
                        </M.CardContent>
                    </S.Card>
                </S.RightItem>
            </M.Grid>            
         );
    }
}
 
export default Header;