import React, { useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
    TextField, Grid,
    Box, Button, Alert 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import * as EmailValidator from 'email-validator';
import { TextFieldValidationReducer, TEXTFIELD_SET, TEXTFIELD_ERROR, TEXTFIELD_DISABLED, TEXTFIELD_RESET } from "../reducers/TextFieldValidationReducer";

const SubmitButton = styled(Button)`
    margin-top: 12px;
    border: 1px solid green;
    &:active, &:hover { color: white; background-color: green; }
    &:disabled { border: 0; }
`;

const Login = ( { handleLogIn } ) => {
    const [ email, dispatchEmail ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ password, dispatchPassword ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ alertError, setAlertError ] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        dispatchEmail( { type: TEXTFIELD_DISABLED } );
        dispatchPassword( { type: TEXTFIELD_DISABLED } );

        const postData = {
            email: email.data,
            password: password.data
        }

        fetch('/api/login', { 
                method: "post",
                headers: [ ["Content-Type", "application/json"] ],
                credentials: "include",
                body: JSON.stringify(postData) }
            )
            .then((response) => {
                if ( response.ok ) {
                    return response.json();
                } else {
                    throw new Error(response.status + ' ' + response.statusText);
                }
            })
            .then((data) => {

                if ( data.result === "error" && data.message ) {
                    setAlertError(data.message);

                    dispatchEmail( { type: TEXTFIELD_RESET } );
                    dispatchPassword( { type: TEXTFIELD_RESET } );

                    setTimeout(() => setAlertError(false), 5000);
                } else {

                    // login successful
                    handleLogIn(data.user);
                    navigate('/');
                }

            })
            .catch((error) => {
                setAlertError(error.message);

                dispatchEmail( { type: TEXTFIELD_RESET } );
                dispatchPassword( { type: TEXTFIELD_RESET } );

                setTimeout(() => setAlertError(false), 5000);
            });     

    }

    const handleEmailInputBlur = (e) => {
        if ( e.target.value.toString().length === 0 ) {
            dispatchEmail( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );

        } else if ( EmailValidator.validate(e.target.value) === false ) {
            dispatchEmail( { type: TEXTFIELD_ERROR, payload: "Enter a valid e-mail!" } );

        } else {
            dispatchEmail( { type: TEXTFIELD_SET, payload: e.target.value } );
        }
    }

    const handlePasswordInputBlur = (e) => {
        if ( e.target.value.toString().length === 0 ) {
            dispatchPassword( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
        } else {
            dispatchPassword( { type: TEXTFIELD_SET, payload: e.target.value } );
        }
    }

    return (
        <Box>
            <h1>Login</h1>
            {alertError !== false && <><Alert severity="error">{alertError}</Alert><br /></> }
            <Grid container spacing={2}>
                <Grid item>
                    <TextField id="email" label="E-mail" variant="standard" disabled={email.disabled !== false} error={email.error !== false} helperText={email.error !== false ? email.error : ''} onBlur={(e) => handleEmailInputBlur(e)} />
                </Grid>
                <Grid item>
                    <TextField id="password" label="Password" variant="standard" disabled={password.disabled !== false} error={password.error !== false} helperText={password.error !== false ? password.error : ''} onBlur={(e) => handlePasswordInputBlur(e)} />
                </Grid>
                <Grid item>
                    {email.disabled !== false && password.disabled !== false 
                        ? <CircularProgress size="1.2rem" style={{ top: "26px", position: "relative" }} />
                        : <SubmitButton color="success" onClick={handleLogin}>Continue</SubmitButton>
                    }
                </Grid>
            </Grid>
        </Box>
    );

}

export default Login;