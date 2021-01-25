import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../../components/layout/MainContainer/MainContainer";
import UserContext from "../../context/UserContext";
import axios from "axios";

import * as M from "@material-ui/core";
import * as S from "./styled";
import * as I from '@material-ui/icons';
import * as L from "@material-ui/lab";

import EducationForm from "./EducationForm"

const Profile = () => {

    // Getting context and stuff
    const { data, setData } = useContext(UserContext);
    const [message, setMessage] = useState({})

    // PERSONAL
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        setName(data.userData.name);
        setEmail(data.userData.email)
    }, [])


    // EDUCATION DETAILS

    // values
    const [mapOfValues, setMapOfValues] = useState({});

    // functions
    // submit the child element
    const onChildSubmit = (childIndex, value) => {
        setMapOfValues({
            ...mapOfValues,
            [childIndex]: value
        })
    }

    // delete the child element
    const onChildDelete = (childIndex) => {

        // child values
        const tempMap = mapOfValues
        tempMap[childIndex] = null
        setMapOfValues(tempMap)

        // child component
        const tempVals = data.edVals;
        tempVals[childIndex] = <></>

        setData({
            ...data,
            edVals: tempVals
        })
    }

    // add more child components
    const edComp = <EducationForm submit={onChildSubmit} deleteElem={onChildDelete} />
    const submit = () => {
        const tempEdVals = data.edVals
        tempEdVals.push(edComp)
        setData({
            ...data,
            edVals: tempEdVals
        })
        console.log(data.edVals)
    }


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



    const submitProfile = async () => {
        let skillArr = [];
        chipData.forEach((chip) => {
            skillArr.push(chip["label"])
        });

        let edArr = []
        Object.keys(mapOfValues).map((i) => {
            edArr.push(mapOfValues[i])
        })

        const applicantId = data.userData._id;
        const userId = data.user.id

        const updateData = {
            name: name,
            email: email,
            education: edArr,
            skills: skillArr,
            applicantId: applicantId,
            userId: userId
        }

        if (email == "" || name == "") {
            setMessage({
                text: "Please enter a name and email",
                type: "error"
            })
        }
        else {
            await axios.post("http://localhost:5000/applicant/update", updateData, {
                headers: {
                    "x-auth-token": data.token,
                }
            })
                .then((res) => {
                    setMessage({
                        text: "Successfully updated",
                        type: "success"
                    })
                    setData({
                        ...data,
                        user: {
                            ...data.user,
                            email: email
                        },
                        userData: {
                            name: name,
                            email: email,
                            education: edArr,
                            skills: skillArr
                        }
                    })

                    // console.log(data)

                })
                .catch((err) => {
                    setMessage({
                        text: err.msg,
                        type: "error"
                    })
                })
        }


    }

    return (
        <MainContainer active="Profile">

            <M.Grid container spacing={3}>
                <M.Grid item md={6}>

                    {/* PERSONAL DETAILS */}
                    <S.Header>Personal</S.Header>
                    <M.Grid container spacing={3}>
                        <M.Grid item md={6}>
                            <S.TextField
                                fullWidth
                                id="input-with-icon-textfield"
                                label="Name"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <M.InputAdornment position="start">
                                            <I.AccountCircle />
                                        </M.InputAdornment>
                                    ),
                                }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </M.Grid>
                        <M.Grid item md={6}>
                            <S.TextField
                                fullWidth
                                id="input-with-icon-textfield"
                                label="Email"
                                defaultValue={data.userData.email}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <M.InputAdornment position="start">
                                            <I.Email />
                                        </M.InputAdornment>
                                    ),
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </M.Grid>
                    </M.Grid>

                    {data.user.category == "applicant" ? (
                        <>
                            <S.Divider light />

                            {/* EDUCATION */}
                            <S.Header>Education</S.Header>
                            <S.Button variant="outlined" color="primary" onClick={submit}>Add Education</S.Button>
                            {data.edVals.map((value, index) =>
                                React.cloneElement(value, { key: index, childIndex: index }))}


                            {/* SKILLS SECTION STARTS HERE */}
                            <S.Header>Skills</S.Header>
                            <S.TextField
                                id="input-with-icon-textfield"
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
                            />
                            <S.Button variant="outlined" color="primary" onClick={addSkill}>Add Skill</S.Button>
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

                        </>
                    ) : (
                            <S.Header>lol</S.Header>
                        )}
                </M.Grid>


            </M.Grid>
            {message.text && <L.Alert severity="success" style={{ marginLeft: 10 }}>{message.text}</L.Alert>}
            <S.SubmitButton onClick={submitProfile}>Submit</S.SubmitButton>
        </MainContainer>
    );
};

export default Profile;
