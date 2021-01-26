import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../../components/layout/MainContainer/MainContainer";
import UserContext from "../../context/UserContext";
import axios from "axios";


import * as P from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import * as M from "@material-ui/core";
import * as S from "./styled";
import * as I from '@material-ui/icons';
import * as L from "@material-ui/lab";

const AddJob = () => {

    const today = new Date()

    const { data, setData } = useContext(UserContext);

    const [title, setTitle] = useState();
    const [duration, setDuration] = useState(-1);
    const [positions, setPositions] = useState(1);
    const [maxApplicants, setMaxApplicants] = useState(1);
    const [deadline, setDeadline] = useState(today);
    const [type, setType] = useState("full");
    const [salary, setSalary] = useState();

    const [message, setMessage] = useState("")

    // SKILLS
    const [skill, setSkill] = useState();
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Python' },
        { key: 1, label: 'React' }
    ])
    const handleChipDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const addSkill = () => {
        const tempChips = chipData
        const idx = chipData[chipData.length - 1].key + 1
        tempChips.push({ key: idx, label: skill });

        setSkill("")
    }


    const submit = async () => {

        console.log(data)

        let skillArr = [];
        chipData.forEach((chip) => {
            skillArr.push(chip["label"])
        });


        const newJob = {
            title: title,
            recruiterName: data.userData.name,
            recruiterMail: data.userData.email,
            recruiterId: data.userData["_id"],
            maxApplicants: maxApplicants,
            positions: positions,
            dateOfPosting: today,
            deadline: deadline,
            skills: skillArr,
            type: type,
            duration: duration,
            salary: salary,
            rating: [-1]
        }

        console.log(newJob)

        await axios.post("http://localhost:5000/job/add", newJob, {
            headers: {
                "x-auth-token": data.token,
            },
        })
            .then((res) => {
                setMessage({
                    text: "Job Successfully added",
                    type: "success"
                })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    return (
        <MainContainer active="Add Job">

            <S.Header>Add Job</S.Header>

            <M.Grid container>
                <M.Grid item md={6}>

                    <S.TextField
                        required
                        label="Job Title"
                        InputProps={{
                            startAdornment: (
                                <M.InputAdornment position="start">
                                    <I.Work />
                                </M.InputAdornment>
                            ),
                        }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <M.Grid container justify="space-between">
                        <M.Grid item md={5}>
                            <S.TextField
                                label="Max positions available"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                // defaultValue={positions}
                                value={positions}
                                onChange={(val) => setPositions(val.target.value)}
                            />
                        </M.Grid>
                        <M.Grid item md={5}>
                            <S.TextField
                                label="Max number of applicants"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                // defaultValue={0}
                                value={maxApplicants}
                                onChange={(val) => setMaxApplicants(val.target.value)}
                            />
                        </M.Grid>
                        <M.Grid item md={5}>
                            <P.MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <S.KeyboardDatePicker
                                    required
                                    label="Deadline"
                                    value={deadline}
                                    onChange={(val) => setDeadline(val)}
                                />
                            </P.MuiPickersUtilsProvider>
                        </M.Grid>
                        <M.Grid item md={5}>

                            <M.FormControl variant="outlined" fullWidth required style={{ marginTop: 10, marginBottom: 10 }}>
                                <M.InputLabel>Duration (in months)</M.InputLabel>
                                <M.Select
                                    value={duration}
                                    label="Duration (in months)"
                                    onChange={(val) => setDuration(val.target.value)}
                                    defaultValue={-1}
                                >
                                    <M.MenuItem value={-1}>
                                        <em>Indefinite</em>
                                    </M.MenuItem>
                                    <M.MenuItem value={1}>One</M.MenuItem>
                                    <M.MenuItem value={2}>Two</M.MenuItem>
                                    <M.MenuItem value={3}>Three</M.MenuItem>
                                    <M.MenuItem value={4}>Four</M.MenuItem>
                                    <M.MenuItem value={5}>Five</M.MenuItem>
                                    <M.MenuItem value={6}>Six</M.MenuItem>
                                </M.Select>
                            </M.FormControl>
                        </M.Grid>
                        <M.Grid item md={5}>
                            <M.FormControl fullWidth variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} required>
                                <M.InputLabel>Amount</M.InputLabel>
                                <M.OutlinedInput
                                    startAdornment={<M.InputAdornment position="start">$</M.InputAdornment>}
                                    labelWidth={60}
                                    value={salary}
                                    onChange={(val) => setSalary(val.target.value)}
                                />
                            </M.FormControl>
                        </M.Grid>
                        <M.Grid item md={5}>
                            <M.FormControl variant="outlined" fullWidth required style={{ marginTop: 10, marginBottom: 10 }}>
                                <M.InputLabel>Type of Job</M.InputLabel>
                                <M.Select
                                    value={type}
                                    onChange={(val) => setType(val.target.value)}
                                    label="Duration (in months)"
                                    defaultValue=""
                                >
                                    <M.MenuItem value="full">
                                        Full Time
                                    </M.MenuItem>
                                    <M.MenuItem value="part">Part Time</M.MenuItem>
                                    <M.MenuItem value="wfh">Work From Home</M.MenuItem>
                                </M.Select>
                            </M.FormControl>
                        </M.Grid>
                    </M.Grid>


                    <S.TextField
                        label="Skill"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <M.InputAdornment position="start">
                                    <I.HowToReg />
                                </M.InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSkill(e.target.value)}
                        value={skill}
                    /><br />
                    <S.Button variant="outlined" color="primary" onClick={addSkill}>Add Skill</S.Button>
                    <br />
                    <S.Paper>
                        {chipData.map((data) => {

                            return (
                                <li key={data.key}>
                                    <S.Chip
                                        label={data.label}
                                        onDelete={handleChipDelete(data)}
                                    />
                                </li>
                            );
                        })}
                    </S.Paper>

                    <S.SubmitButton onClick={submit}>Submit</S.SubmitButton>
                    {message.text && <L.Alert severity={message.type}>{message.text}</L.Alert>}

                </M.Grid>
            </M.Grid>

        </MainContainer>

    )
}

export default AddJob;