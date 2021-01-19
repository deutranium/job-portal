import React, { useEffect, useContext, useLayoutEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import MainContainer from "../layout/MainContainer/MainContainer"
import Landing from './auth/Landing';


const Home = () => {
    const {userData} = useContext(UserContext);
    // const checkPaths = async() => {

    // }
    // useEffect(() => {
    //     console.log(userData);
    //     console.log("1111111111")
    //     // checkPaths()
    // }, [userData.user])
    return (
        <div>
            {userData.user ? (
                <MainContainer>
                    <h1>Welcome {userData.user.name}</h1>
                </MainContainer>
            ) : (
                <>
                    <Landing />
                </>
            )}
        </div>
    );
}
 
export default Home;