import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../../auth/AuthOptions';
import {Col, Row} from 'react-grid-system'
import * as S from "./styled"

class Header extends Component {
   
    render() { 
        return ( 
            <S.Head>
                {/* <Row align="center" justify="between">
                    <Col> */}
                    Job Portal
                    {/* </Col>
                    <Col align="right"> */}
                    <AuthOptions />
                    {/* </Col>
                </Row> */}
                
            </S.Head>
         );
    }
}
 
export default Header;