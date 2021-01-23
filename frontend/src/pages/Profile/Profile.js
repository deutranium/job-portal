import React, { useContext, useState } from "react";
import MainContainer from "../../components/layout/MainContainer/MainContainer";
import UserContext from "../../context/UserContext";
import * as M from "@material-ui/core";
import * as S from "./styled";
import * as I from '@material-ui/icons';

import EducationForm from "./EducationForm"

const Profile = () => {
    const { data, setData } = useContext(UserContext);

    const [educationFields, setEducationFields] = useState([]);
    const educationValues = [];

    const [mapOfValues, setMapOfValues] = useState({});

    const onChildSubmit = (childIndex, value) => {
        setMapOfValues({
            ...mapOfValues,
            [childIndex]: value
        })
    }

    const a = () => {
        console.log(mapOfValues)
    }

    const abc = <EducationForm submit={onChildSubmit}/>

    const submit = () => {
        setEducationFields([...educationFields, abc]);
    }

    return (
        <MainContainer>

            <M.Grid container spacing={3}>
                <M.Grid item md={6}>

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

                            <S.Header>Education</S.Header>
                            <button onClick={a}>greuybdskjn</button>
                            <M.Button variant="contained" color="primary" onClick={submit}>Add Education</M.Button>
                            {educationFields.map((value, index) => 
                            React.cloneElement(value, {key:index, childIndex: index}))}
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
