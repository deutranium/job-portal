import React from "react";
import * as S from "./styled";
import {Container} from "react-grid-system"
import * as M from '@material-ui/core';
import Navigation from "./Navigation"
import JobTable from "../JobTable/JobTable";

const MainContainer = ({children}) => {
    return (
        <div>
            <Navigation />
            <S.Content>
            {children}
            <JobTable />
            </S.Content>
        </div>
    );
};

export default MainContainer;
