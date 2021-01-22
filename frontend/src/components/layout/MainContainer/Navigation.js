import React, { useContext } from "react";
import * as S from "./styled";
import LineIcon from "react-lineicons";
import { useHistory } from "react-router-dom";

import UserContext from "./../../../context/UserContext";


const Navigation = (props) => {
    const { data, setData } = useContext(UserContext);
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
                <S.NameDiv>{data.user.name}</S.NameDiv>
            </S.Profile>


            <S.NavItems>
                {
                    props.data.map((item, index) =>
                        <S.NavItem active={item.active} onClick={() => history.push(item.url)}>
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
