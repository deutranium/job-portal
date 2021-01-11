import React from "react"
import ReactDOM from 'react-dom';
import { FormControl, TextField, Button, InputLabel, Input, InputAdornment } from '@material-ui/core'


const RegisterApplicant = () => {
    return (
        <>
            <FormControl>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-password-input outline-required"
                    label="Password"
                    type="Password"
                    autoComplete="current-password"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </FormControl>
        </>
    );
}

export default RegisterApplicant;
