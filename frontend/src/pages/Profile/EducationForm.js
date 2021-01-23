import React, { useContext, useState } from "react";
import * as P from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as S from "./styled";
import * as M from "@material-ui/core";
import * as I from '@material-ui/icons';

const EducationForm = (props) => {

    const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [endDate, setEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [name, setName] = React.useState();

    const submitForm = (e) => {
        e.preventDefault();
        const value = {
            name: name,
            startDate: startDate,
            endDate: endDate
        }
        props.submit(props.childIndex, value)
    }

    const deleteElem = (e) => {
        // e.preventDefault();

        props.deleteElem(props.childIndex)
    }

    return (
        <P.MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form onSubmit={submitForm}>
                <S.EducationWrapper>
                    <div>
                        <S.TextField
                            id="input-with-icon-textfield"
                            label="Institution Name"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <M.InputAdornment position="start">
                                        <I.School />
                                    </M.InputAdornment>
                                ),
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <M.Grid container>

                        <M.Grid item md={6}>
                            <S.KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Start Date"
                                value={startDate}
                                onChange={(val) => setStartDate(val)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </M.Grid>
                        <M.Grid item md={6}>
                            <S.KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="End Date"
                                value={endDate}
                                onChange={(val) => setEndDate(val)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </M.Grid>
                    </M.Grid>
                </S.EducationWrapper>
                <S.Button variant="contained" color="primary" type="submit">Submit</S.Button>
                <S.Button variant="contained" color="secondary" onClick={() => props.deleteElem(props.childIndex,)}>Delete</S.Button>
            </form>
            <S.Divider light />
        </P.MuiPickersUtilsProvider >
    )
}

export default EducationForm;
