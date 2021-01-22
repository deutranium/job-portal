import React, { useContext } from "react";
import * as S from "./styled";
import Navigation from "./Navigation";
import JobTable from "../JobTable/JobTable";
import UserContext from "./../../../context/UserContext";

const MainContainer = ({ children }) => {
    // get data from context
    const { data } = useContext(UserContext);

    const applicantNav = [
        {
            img: "home",
            text: "Home",
            url: "/",
            active: true
        },
        {
            img: "list",
            text: "My Applications",
            url: "/my"
        },
        {
            img: "heart",
            text: "Profile",
            url: "/profile"
        }
    ];

    const recruiterNav = [
        {
            img: "home",
            text: "Home",
            url: "/",
            active: true
        },
        {
            img: "list",
            text: "Received Applications",
            url: "/my"
        },
        {
            img: "heart",
            text: "Profile",
            url: "/profile"
        }
    ];

    return (
        <div>

            {data.user.category === "applicant" ? (
                <Navigation data={applicantNav} />
            ) : (
                    <Navigation data={recruiterNav} />
                )}

            {/* main content */}
            <S.Content>
                {/* get element children */}
                {children}


                {/* job listings */}
                {/* <JobTable /> */}
            </S.Content>
        </div>
    );
};

export default MainContainer;
