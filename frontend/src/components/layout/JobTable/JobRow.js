import React from "react";
import * as S from "./styled";
import {Col, Container, Row} from "react-grid-system"
import * as M from '@material-ui/core';

const JobRow = () => {
    return (
        <M.StylesProvider injectFirst>
            <S.JobRow>
                <Col md={2.5}>
                    <S.JobTitle>AI Developer Intern</S.JobTitle>
                    <br />
                    <S.PostedOn><b>Posted on: </b>January 15, 2020</S.PostedOn>
                    <br />
                </Col>
                {/* <Col>January 15, 2020</Col> */}
                <Col md={1.8}>February 10, 2020</Col>
                <Col md={1.2}>Internship</Col>
                <Col md={2}>
                    <S.Recruiter><b>Tesla</b></S.Recruiter>
                    <br />
                    <S.RecruiterMail>tesla.motors@mail.io</S.RecruiterMail>
                </Col>
                <Col md={1}>2</Col>
                <Col md={1.5}>$150</Col>
                <Col md={1}>5/5</Col>
                <Col md={1}><S.JobButton className="apply">Apply</S.JobButton></Col>
            </S.JobRow>
        </M.StylesProvider>
    );
};

export default JobRow;
