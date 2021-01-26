import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext";

import * as M from "@material-ui/core"
import * as S from "./styled"

import axios from "axios"



function FormDialog(props) {

    const { data, setData } = useContext(UserContext)
    const [open, setOpen] = useState(false);

    const [sop, setSop] = useState("");
    const [name, setName] = useState("Apply")

    const jobId = props.jobId;
    const applicantId = props.applicantId;

    axios.get("http://localhost:5000/applications/find", {jobId, applicantId}, {
        headers: {
            "x-auth-token": data.token,
        },
    })
        .then((res) => {
            setName("Applied")
        })
        .catch((err) => {
            console.log(err.message);
        });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const apply = async () => {

        const meta = {
            jobId,
            applicantId,
            sop
        }

        await axios.post("http://localhost:5000/applications/apply", meta, {
            headers: {
                "x-auth-token": data.token,
            },
        })
            .then((res) => {
                alert("applied");
                setName("Applied")
            })
            .catch((err) => {
                console.log(err.message);
            });

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <M.Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {name}
            </M.Button>
            <M.Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <M.DialogTitle id="form-dialog-title">Statement of Purpose</M.DialogTitle>
                <M.DialogContent style={{ width: 500 }}>
                    <M.DialogContentText>
                        {props.jobId}<br />
                        {props.recruiterId}<br />
                        {props.applicantId}
                    </M.DialogContentText>
                    <M.TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Write SOP here"
                        type="email"
                        fullWidth
                        value={sop}
                        onChange={(e) => setSop(e.target.value)}
                    />
                </M.DialogContent>
                <M.DialogActions>
                    <M.Button onClick={handleClose} color="primary">
                        Cancel
            </M.Button>
                    <M.Button onClick={apply} color="primary">
                        Subscribe
            </M.Button>
                </M.DialogActions>
            </M.Dialog>
        </div>
    );
}



const RecruiterHome = () => {

    const { data, setData } = useContext(UserContext)

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
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getJobs();

        loaded = 1

    }, [])

    const applyJob = async (jobId, recruiterId, SOP) => {

        const applicantId = data.userData["_id"];


    }

    return (
        <>
            <h2>Your Jobs</h2>

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
