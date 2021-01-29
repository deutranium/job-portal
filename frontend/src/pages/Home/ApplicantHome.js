import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext";
import axios from "axios"

import * as M from "@material-ui/core"
import * as S from "./styled"

import FormDialog from "./FormDialog"


const RecruiterHome = () => {

    const { data, setData } = useContext(UserContext)

    useEffect(() => {
        const getJobs = () => {
            axios
                .get("http://localhost:5000/job/all", {
                    headers: {
                        "x-auth-token": data.token,
                    },
                })
                .then((res) => {
                    setData({
                        ...data,
                        jobs: res.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getJobs();

    }, [])

    return (
        <>
            <h2>All Jobs</h2>

            <S.Filter>
                Filters
            </S.Filter>

            {data.jobs ? (
                <>
                    <M.TableContainer component={M.Paper}>
                        <M.Table>
                            <M.TableHead>
                                <M.TableRow>
                                    <M.TableCell>Title</M.TableCell>
                                    <M.TableCell>Recruiter Name</M.TableCell>
                                    <M.TableCell>Salary</M.TableCell>
                                    <M.TableCell>Duration</M.TableCell>
                                    <M.TableCell>Deadline</M.TableCell>
                                    <M.TableCell>Apply</M.TableCell>
                                </M.TableRow>
                            </M.TableHead>
                            <M.TableBody>
                                {data.jobs.map((row) => (
                                    <M.TableRow key={row._id}>
                                        <M.TableCell component="th" scope="row">
                                            {row.title}
                                        </M.TableCell>
                                        <M.TableCell>{row.recruiterName}</M.TableCell>
                                        <M.TableCell>${row.salary}</M.TableCell>
                                        <M.TableCell>{row.duration} months</M.TableCell>
                                        <M.TableCell>{new Date(row.deadline).getDate() + "/" + (new Date(row.deadline).getMonth() + 1) + "/" + new Date(row.deadline).getFullYear()}</M.TableCell>
                                        <M.TableCell>
                                            {/* <S.ApplyButton onClick={() => applyJob(row._id, row.recruiterId)}>Apply</S.ApplyButton> */}
                                            <FormDialog jobId={row._id} applicantId={data.userData._id} recruiterId={row.recruiterId} />
                                        </M.TableCell>
                                    </M.TableRow>
                                ))}
                            </M.TableBody>
                        </M.Table>
                    </M.TableContainer>




                </>



            ) : (
                    <h2>Loading</h2>
                )}
        </>
    )
}

export default RecruiterHome;
