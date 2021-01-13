import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import {Col, Row} from 'react-grid-system'
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
                            
                        </M.CardContent>
                    </S.Card>
                </S.RightItem>
            </M.Grid>
         );
    }
}
 
export default Header;