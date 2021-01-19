import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import MainContainer from "../layout/MainContainer/MainContainer"

function Home () {
    const {userData} = useContext(UserContext);
    console.log(UserContext);
    console.log("Home......")
    const history = useHistory();

    useEffect(() => {
        console.log(".........");
        console.log(userData);
        if(!userData.user)
            history.push("/login");

    }, []);
    return (
        <div>
            
            <MainContainer>
            {userData.user ? (
                <h1>Welcome {userData.user.name}</h1>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
            </MainContainer>
        </div>
    );
}
 
export default Home;