import React, { useContext, useState } from "react";
import MainContainer from "../../components/layout/MainContainer/MainContainer";
import UserContext from "../../context/UserContext";
import * as M from "@material-ui/core";
import * as S from "./styled";
import * as I from '@material-ui/icons';

import EducationForm from "./EducationForm"

const Profile = () => {

    // Getting context and stuff
    const { data, setData } = useContext(UserContext);


    // EDUCATION DETAILS

    // values
    // const [data.edVals, setEducationFields] = useState([]);
    const [mapOfValues, setMapOfValues] = useState({});
    // const [values, setValues] = useState([]);
    
    // functions
    // submit the child element
    const onChildSubmit = (childIndex, value) => {
        const temp = mapOfValues;
        temp[childIndex] = value
        setMapOfValues(temp)
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
        console.log(childIndex)
        console.log(data.edVals)
        console.log(mapOfValues)
        // const tempField = data.edVals.splice(childIndex, 1)
        // console.log(tempField)
        // console.log(childIndex)
        // setEducationFields(tempField)
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

    const a = () => {
        console.log(mapOfValues)
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

        setSkill()
    }

    return (
        <MainContainer>

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
                                defaultValue={data.userData.name}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <M.InputAdornment position="start">
                                            <I.AccountCircle />
                                        </M.InputAdornment>
                                    ),
                                }}
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
                            />
                        </M.Grid>
                    </M.Grid>

                    {data.user.category == "applicant" ? (
                        <>
                            <S.Divider light />

                            {/* EDUCATION */}
                            <S.Header>Education</S.Header>
                            <button onClick={a}>Print to console</button><br />
                            <S.Button variant="contained" color="primary" onClick={submit}>Add Education</S.Button>
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
                            />
                            <S.Button variant="contained" color="primary" onClick={addSkill}>Add Skill</S.Button>
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
        </MainContainer>
    );
};

export default Profile;
