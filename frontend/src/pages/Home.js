import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import MainContainer from "../components/layout/MainContainer/MainContainer";
import Landing from "./auth/Landing";
import axios from "axios"

import RecruiterHome from "./Home/RecruiterHome"
import ApplicantHome from "./Home/ApplicantHome"

const Home = () => {
    const history = useHistory();
    const { data, setData } = useContext(UserContext);

    if (data.auth == "UNAUTHENTICATED") {
        history.push("/login");
    }


    useEffect(() => {
        const userInfo = async () => {
            await axios
                .get("http://localhost:5000/users/", {
                    headers: {
                        "x-auth-token": data.token,
                    },
                })
                .then((res) => {
                    setData({
                        ...data,
                        auth: "AUTHENTICATED",
                        userData: res.data[0]
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        userInfo()
    }, [])

    return (
        <div>
            {data.userData ? (
                <MainContainer>
                    {console.log(data)}
                    {/* <h1>Welcome {data.userData.name}</h1> */}

                    {data.user.category == "applicant" ? (
                        <ApplicantHome />
                    ) : (
                        <RecruiterHome />
                    )}
                </MainContainer>
            ) : (
                <h3>Loading....</h3>
            )}
        </div>
    );
};

export default Home;
