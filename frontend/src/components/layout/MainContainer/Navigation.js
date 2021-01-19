import React, { useEffect, useContext } from 'react';
import * as S from "./styled";
import * as M from '@material-ui/core';
import LineIcon from 'react-lineicons';

// import UserContext from '../../../context/userContext';
import { useHistory } from 'react-router-dom';


const navData = [
    {
        img: "home", text: "Home", url: "/"
    }
]

const Navigation = () => {

    // const {userData} = useContext(UserContext);
    const history = useHistory();

    const logout = () => history.push("/logout");

    return (
        <S.MainNav>
            <S.Profile>
                {/* <S.ImgDiv> */}

                    {/* <S.ProfileImg src={require("./assets/panda.svg")} /> */}
                    <S.Avatar alt="Cindy Baker" src={require("./assets/panda.svg")} />
                {/* </S.ImgDiv> */}
                {/* {userData.user} */}
                <S.NameDiv>Lorem Ipsum</S.NameDiv>
                <S.EmailDiv>applicant@bo.nd</S.EmailDiv>
            </S.Profile>
            <S.NavItems>
                <S.NavItem active>
                    <LineIcon name="home" />
                    <S.NavItemText>Home</S.NavItemText>
                </S.NavItem>
                <S.NavItem>
                    <LineIcon name="list" />
                    <S.NavItemText>My Applications</S.NavItemText>
                </S.NavItem>
                <S.NavItem>
                    <LineIcon name="heart" />
                    <S.NavItemText>Profile</S.NavItemText>
                </S.NavItem>
            </S.NavItems>
            <S.Logout>
                <LineIcon name="lock" />
                <S.LogoutText onClick={logout}>Logout</S.LogoutText>
            </S.Logout>
        </S.MainNav>
    );
};

export default Navigation;
