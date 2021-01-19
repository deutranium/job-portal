import React, { useEffect, useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/userContext';

const Logout = () => {

    const {userData, dispatch} = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        localStorage.setItem("auth-token", "");
        dispatch({
            type: "LOGOUT",
        });
        history.push("/")
    })
    return (
        <div>
            Logging you out...
        </div>
    );
}
 
export default Logout;
