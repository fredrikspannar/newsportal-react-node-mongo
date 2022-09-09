import React, { useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
    TextField, Grid, Paper,
    Box, Button, Alert, Snackbar
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

const Item = styled(Paper)`
    display: block;
    margin-top: 6px;
    border: 0;
    box-shadow: none;
`;

const Login = ( { handleLogIn } ) => {
    const [ email, dispatchEmail ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ password, dispatchPassword ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ alertError, setAlertError ] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if ( email.data.length === 0 ) {
            dispatchEmail( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        } else if ( password.data.length === 0 ) {
            dispatchPassword( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        }

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
            .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
            .then((data) => {

                if ( !data.ok && data.body.result === "error" && data.body.message ) {
                    // error from backend
                    setAlertError(data.body.message);

                    dispatchEmail( { type: TEXTFIELD_RESET } );
                    dispatchPassword( { type: TEXTFIELD_RESET } );

                    setTimeout(() => setAlertError(false), 5000);

                } else if ( data.ok && data.body.user ) {

                    // login successful
                    handleLogIn(data.body.user);
                    navigate('/');

                } else {
                    // general error
                    throw new Error(`Failed to login! ${data.status} ${data.statusText}`);
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
            {alertError !== false && 
                <Snackbar open={alertError !== false} anchorOrigin={{ vertical:"top", horizontal:"right"}} autoHideDuration={7500} onClose={() => setAlertError(false)}>
                    <Alert onClose={() => setAlertError(false)} severity="error" sx={{ width: '100%' }}>{alertError}</Alert>
                </Snackbar>
            }
            <Grid container spacing={2}  alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Item><h1>Login</h1></Item>
                    <Item><TextField id="email" label="E-mail" variant="standard" disabled={email.disabled !== false} error={email.error !== false} helperText={email.error !== false ? email.error : ''} onBlur={(e) => handleEmailInputBlur(e)} /></Item>
                    <Item><TextField id="password" label="Password" variant="standard" disabled={password.disabled !== false} error={password.error !== false} helperText={password.error !== false ? password.error : ''} onBlur={(e) => handlePasswordInputBlur(e)} /></Item>
                    <Item>{email.disabled !== false && password.disabled !== false 
                        ? <CircularProgress size="1.2rem" style={{ top: "26px", position: "relative" }} />
                        : <SubmitButton color="success" onClick={handleLogin}>Continue</SubmitButton>
                    }</Item>
                </Grid>
            </Grid>
        </Box>
    );

}

export default Login;