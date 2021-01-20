import React, { useEffect, useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/UserContext';

const Logout = () => {

    const {data, setData} = useContext(UserContext);
    const history = useHistory();
    // useEffect(() => {
        localStorage.setItem("auth", "UNAUTHENTICATED");
        console.log(localStorage.getItem("auth"))
        setData({
            auth: "UNAUTHENTICATED",
            token: null,
            user: null
        })
        history.push("/")
    // })
    return (
        <div>
            Logging you out...
        </div>
    );
}
 
export default Logout;
