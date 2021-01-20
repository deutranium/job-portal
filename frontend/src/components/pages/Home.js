import React, { useEffect, useContext, useLayoutEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import MainContainer from "../layout/MainContainer/MainContainer"
import Landing from './auth/Landing';
import axios from "axios";


const Home = () => {
    const { data, setData } = useContext(UserContext);

    // console.log(UserContext);
    // console.log("bhvd")

    useEffect(() => {
        async function checkLogin() {
            // let token = localStorage.getItem("auth-token");
            // const tokenResponse = await axios.post(
            //     "http://localhost:5000/users/tokenIsValid",
            //     null,
            //     { headers: { "x-auth-token": token } }
            // );
    
            // if (tokenResponse.data) {
            //     const userRes = await axios.get("http://localhost:5000/users/", {
            //         headers: { "x-auth-token": token },
            //     });
            //     setData(userRes);
            // }
            // else {
            //     setData("lmao");
            // }
            // setData({
            //     auth: true,
            //     token: token
            // })
            console.log("bgfndfjko")
            console.log(data)
        }

        checkLogin()
    }, [])
    // const checkPaths = async() => {

    // }
    // useEffect(() => {
    //     console.log(userData);
    //     console.log("1111111111")
    //     // checkPaths()
    // }, [userData.user])
    return (
        <div>
            {data.auth ? (
                <MainContainer>
                    <h1>Welcome {data.token}</h1>
                </MainContainer>
            ) : (
                <>
                    <Landing />
                </>
            )}
            {/* hehe
            {/* {console.log(UserContext)} */}
            {/* {data} */}
            <div>
                {JSON.stringify(data)}
            </div> */}
        </div>
    );
}

export default Home;