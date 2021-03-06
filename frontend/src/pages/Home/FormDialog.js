import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext";

import * as M from "@material-ui/core"
import * as L from "@material-ui/lab";
import * as S from "./styled"

import axios from "axios"

export default function FormDialog(props) {

    const { data, setData } = useContext(UserContext)
    const [open, setOpen] = useState(false);

    const [sop, setSop] = useState("");
    const [btn, setBtn] = useState({
        name: "",
    })

    const [error, setError] = useState()

    const jobId = props.jobId;
    const applicantId = props.applicantId;
    const recruiterId = props.recruiterId;

    let loaded = 0;

    const reqData = {
        jobId: jobId,
        applicantId: applicantId,
        recruiterId: recruiterId
    }

    useEffect(() => {

        console.log("brhejkls")

        const loadPls = async () => {
            await axios.post("http://localhost:5000/applications/find", reqData)
                .then((res) => {
                    if (res.status == 200)
                        setBtn({
                            name: "Applied",
                            disabled: true
                        })
                    // else {
                    //     axios.get("http://localhost:5000/job/all", {
                    //         headers: {
                    //             "x-auth-token": data.token,
                    //         },
                    //     })
                    //         .then((res) => {
                    //             res.data.forEach(elem => {
                    //                 if (elem["_id"] == jobId)
                    //                     if ((elem.applications >= elem.maxApplicants) && (btn.name != "Applied"))
                    //                         setBtn({
                    //                             name: "FULL"
                    //                         })
                    //             });

                    //         })
                    //         .catch((err) => {
                    //             console.log(err.message)
                    //         });
                    // }
                })
                .catch((err) => {
                    setBtn({
                        name: "Apply",
                        disabled: false
                    })
                    console.log(err.message)
                });

        }

        loadPls()
    }, [])





    const handleClickOpen = () => {
        setOpen(true);
    };

    const apply = async () => {

        if (sop.length > 250) {
            setError("Word limit: 250 words")
        }

        else {
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
                    setBtn({
                        name: "Applied",
                        disabled: true
                    })
                })
                .catch((err) => {
                    console.log(err.message);
                });

            setOpen(false);
        }

    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {/* { */}
            {/* // loaded ? ( */}
            <div>

                {
                    btn.name == "Full" ? (
                        <M.Button variant="contained" color="secondary">Full</M.Button>
                    ) : (
                            <>
                                {btn.name == "Applied" ? (
                                    <M.Button variant="contained" onClick={handleClickOpen} disabled={btn.disabled}>Applied</M.Button>
                                ) : (
                                        <M.Button variant="contained" onClick={handleClickOpen} disabled={btn.disabled} color="primary">Apply</M.Button>
                                    )}
                            </>
                        )
                }

                < M.Dialog open={open} onClose={handleClose}>
                    <M.DialogTitle id="form-dialog-title">Statement of Purpose</M.DialogTitle>
                    <M.DialogContent style={{ width: 500 }}>
                        <M.TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Write SOP here"
                            type="email"
                            fullWidth
                            value={sop}
                            multiline
                            rows={4}
                            onChange={(e) => setSop(e.target.value)}
                        />
                    </M.DialogContent>
                    {error && <L.Alert severity="error">{error}</L.Alert>}
                    <M.DialogActions>
                        <M.Button onClick={handleClose} color="primary">
                            Cancel
                        </M.Button>
                        <M.Button onClick={apply} color="primary">
                            Apply
                        </M.Button>
                    </M.DialogActions>
                </M.Dialog >
            </div >

            {/* // ) : ( */}
            {/* <h2>Loading....</h2> */}
            {/* // )} */}
        </>
    );
}
