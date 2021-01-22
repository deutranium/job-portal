import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import MainContainer from "../components/layout/MainContainer/MainContainer";
import Landing from "./auth/Landing";
import axios from "axios"

const Home = () => {
    const history = useHistory();
    const { data, setData } = useContext(UserContext);

    if (data.auth == "UNAUTHENTICATED") {
        history.push("/login");
    }

    console.log(data)

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
                    <h1>Welcome {data.user.name}</h1>
                </MainContainer>
            ) : (
                <h3>Loading....</h3>
            )}
        </div>
    );
};

export default Home;
