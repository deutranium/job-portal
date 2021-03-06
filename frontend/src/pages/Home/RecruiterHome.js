import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext";

import * as M from "@material-ui/core"
import * as S from "./styled"

import axios from "axios"

const RecruiterHome = () => {

    const { data, setData } = useContext(UserContext)

    const [recruiterJobs, setRecruiterJobs] = useState([])
    let loaded = 0

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

                    setRecruiterJobs(res.data.filter((i) => i["recruiterMail"] == data.userData.email))
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getJobs();

        loaded = 1

    }, [])

    const updateJob = async (id) => {
        alert(id)
    }

    const deleteJob = async (id) => {
        await axios.post("http://localhost:5000/job/delete", { id }, {
            headers: {
                "x-auth-token": data.token,
            }
        })
            .then((res) => {
                alert("deleted")

                const temp = data.jobs;
                temp.forEach((elem, idx) => {
                    if (elem["_id"] == id) {
                        temp.splice(idx, 1)
                    }
                });

                setData({
                    ...data,
                    jobs: temp
                })
            })
            .catch((err) => {
                alert("lol")
            })
    }

    return (
        <>
            <h2>Your Jobs</h2>

            {data.jobs ? (
                <>


                    {console.log(recruiterJobs)}


                    <M.TableContainer component={M.Paper}>
                        <M.Table>
                            <M.TableHead>
                                <M.TableRow>
                                    <M.TableCell>Title</M.TableCell>
                                    <M.TableCell>Date of Posting</M.TableCell>
                                    <M.TableCell>Number of Applicants</M.TableCell>
                                    <M.TableCell>Number of Positions</M.TableCell>
                                    <M.TableCell>Updation</M.TableCell>
                                </M.TableRow>
                            </M.TableHead>
                            <M.TableBody>
                                {recruiterJobs.map((row) => (
                                    <M.TableRow key={row._id}>
                                        <M.TableCell component="th" scope="row">
                                            {row.title}
                                        </M.TableCell>
                                        <M.TableCell>{new Date(row.dateOfPosting).getDate() + "/" + (new Date(row.dateOfPosting).getMonth() + 1) + "/" + new Date(row.dateOfPosting).getFullYear()}</M.TableCell>
                                        <M.TableCell>{row.maxApplicants}</M.TableCell>
                                        <M.TableCell>{row.positions}</M.TableCell>
                                        <M.TableCell>
                                            <S.UpdateButton onClick={() => updateJob(row._id)}>Update</S.UpdateButton>
                                            <S.DeleteButton onClick={() => deleteJob(row._id)}>Delete</S.DeleteButton>
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
