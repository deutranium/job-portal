import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../context/UserContext";

import * as M from "@material-ui/core"
import * as L from "@material-ui/lab";

import axios from "axios"

export default function FormDialog(props) {

    const { data, setData } = useContext(UserContext)
    const [open, setOpen] = useState(false);

    const [sop, setSop] = useState("");
    const [btn, setBtn] = useState({
        name: "Apply",
        disabled: false
    })

    const [error, setError] = useState()

    const jobId = props.jobId;
    const applicantId = props.applicantId;
    const recruiterId = props.recruiterId

    const reqData = {
        jobId: jobId,
        applicantId: applicantId,
        recruiterId: recruiterId
    }

    axios.post("http://localhost:5000/applications/find", reqData)
        .then((res) => {
            if (res.status == 200)
                setBtn({
                    name: "Applied",
                    disabled: true
                })
        })
        .catch((err) => {
            console.log(err.message)
        });


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
        <div>
            <M.Button variant="outlined" color="primary" onClick={handleClickOpen} disabled={btn.disabled}>
                {btn.name}
            </M.Button>
            <M.Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            </M.Dialog>
        </div>
    );
}
