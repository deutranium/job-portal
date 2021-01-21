import React from "react";
import * as S from "./styled";
import LineIcon from "react-lineicons";

import { useHistory } from "react-router-dom";

const Navigation = (props) => {
    // const {userData} = useContext(UserContext);
    const history = useHistory();

    const logout = () => history.push("/logout");

    return (
        <S.MainNav>
            <S.Profile>
                {/* <S.ImgDiv> */}

                {/* <S.ProfileImg src={require("./assets/panda.svg")} /> */}
                <S.Avatar
                    alt="Cindy Baker"
                    src={require("./assets/panda.svg")}
                />
                {/* </S.ImgDiv> */}
                {/* {userData.user} */}
                <S.NameDiv>Lorem Ipsum</S.NameDiv>
                <S.EmailDiv>applicant@bo.nd</S.EmailDiv>
            </S.Profile>


            <S.NavItems>
                {
                   props.data.map((item, index) => 
                   <S.NavItem active={item.active}>
                    <LineIcon name={item.img} />
                    <S.NavItemText>{item.text}</S.NavItemText>
                </S.NavItem>
                   )
                }
            </S.NavItems>

            
            <S.Logout>
                <LineIcon name="lock" />
                <S.LogoutText onClick={logout}>Logout</S.LogoutText>
            </S.Logout>
        </S.MainNav>
    );
};

export default Navigation;
