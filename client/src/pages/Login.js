import React, { useReducer } from 'react';
import { 
    TextField, Grid, Box, Button
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import * as EmailValidator from 'email-validator';
import { TextFieldValidationReducer, TEXTFIELD_SET, TEXTFIELD_ERROR, TEXTFIELD_DISABLED } from "../reducers/TextFieldValidationReducer";

const SubmitButton = styled(Button)`
    margin-top: 12px;
    border: 1px solid green;
    &:active, &:hover { color: white; background-color: green; }
    &:disabled { border: 0; }
`;

const Login = () => {
    const [ email, dispatchEmail ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ password, dispatchPassword ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });

    const handleLogin = () => {
        dispatchEmail( { type: TEXTFIELD_DISABLED } );
        dispatchPassword( { type: TEXTFIELD_DISABLED } );




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