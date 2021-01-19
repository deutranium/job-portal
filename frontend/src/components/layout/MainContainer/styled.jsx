import styled from "styled-components";
import * as M from '@material-ui/core';

export const MainNav = styled.div`
    height: 100vh;
    position: fixed;
    background-color: ${(props) => props.theme.bgSecondary};
    width: 300px;
    padding: 150px 20px;
`;

export const Content = styled.div`
    margin-left: 300px;
    padding: 100px;
    min-width: 100vh;
    background-color: ${(props) => props.theme.bgPrimary}
`;

export const Profile = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const ProfileImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100px;
`;

export const Avatar = styled(M.Avatar)`
    width: 104px !important;
    height: 104px !important;
    border-radius: 50%;
    background: ${(props) => props.theme.bgPrimary};
    border: 2px solid ${(props) => props.theme.accent};
`;

export const NameDiv = styled.div`
    padding-top: 10px;
    font-weight: 600;
    font-size: 24px;
    color: ${(props) => props.theme.lightAccent}
`;

export const EmailDiv = styled.div`
    font-weight: 300;
    font-size: 18px;
    color: ${(props) => props.theme.lightSecondary}
`;

export const NavItems = styled.div`
    padding: 100px 0px 300px 0;
`;

export const NavItem = styled.div`
    color: ${(props) => props.active ? props.theme.lightAccent : props.theme.lightSecondary};
    display: flex;
    align-items: center;
    font-weight: ${(props) => props.active ? 600 : 300};
    font-size: 16px;
    padding: 15px 30px;
    border-left: 5px solid ${(props) => props.active ? "white" : "transparent"};
`;

export const NavItemText = styled.div`
    padding-left: 20px;
`;

export const Logout = styled.div`
    color: ${(props) => props.theme.lightAccent};
    padding: 0 30px;
    display: flex;
    align-items: center;
    font-weight: 900;
`;

export const LogoutText = styled.div`
    padding: 0 20px;
`;
