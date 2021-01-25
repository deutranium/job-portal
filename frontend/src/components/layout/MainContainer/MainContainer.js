import React, { useContext } from "react";
import * as S from "./styled";
import Navigation from "./Navigation";
import JobTable from "../JobTable/JobTable";
import UserContext from "./../../../context/UserContext";

const MainContainer = (props) => {
    // get data from context
    const { data } = useContext(UserContext);

    const applicantNav = [
        {
            img: "home",
            text: "Home",
            url: "/",
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
        },
        {
            img: "add-files",
            text: "Add Job",
            url: "/add-job"
        }
    ];

    let nav = [];

    if (data.user.category === "applicant")
        nav = applicantNav;
    else
        nav = recruiterNav;


    const activeTab = (props.active ? props.active : "Home")
    
    nav.forEach(elem => {
        if(elem["text"] == activeTab){
            elem["active"] = true;
        }
    });

    return (
        <div>
            {data.userData ? (
                <>
                    <Navigation data={nav} />

                    {/* main content */}
                    <S.Content>
                        {/* get element children */}
                        {props.children}


                        {/* job listings */}
                        {/* <JobTable /> */}
                    </S.Content>
                </>
            ) : (
                    <h4>Loading...</h4>
                )}

        </div>
    );
};

export default MainContainer;
