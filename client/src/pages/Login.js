import React, { useReducer } from 'react';
import { 
    TextField, Grid, Box, Button
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { TextFieldValidationReducer, TEXTFIELD_SET, TEXTFIELD_ERROR } from "../reducers/TextFieldValidationReducer";

const SubmitButton = styled(Button)`
    margin-top: 12px;
    border: 1px solid green;
    &:active, &:hover { color: white; background-color: green; }
`;

const Login = () => {
    const [ email, dispatchEmail ] = useReducer(TextFieldValidationReducer, { error: false, data: "" });
    const [ password, dispatchPassword ] = useReducer(TextFieldValidationReducer, { error: false, data: "" });

    const handleLogin = () => {



    }

    const handleEmailInputBlur = (e) => {
        if ( e.target.value.toString().length === 0 ) {
            dispatchEmail( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
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
                    <TextField id="email" label="E-mail" variant="standard" error={email.error !== false} helperText={email.error !== false ? email.error : ''} onBlur={(e) => handleEmailInputBlur(e)} />
                </Grid>
                <Grid item>
                    <TextField id="password" label="Password" variant="standard" error={password.error !== false} helperText={password.error !== false ? password.error : ''} onBlur={(e) => handlePasswordInputBlur(e)} />
                </Grid>
                <Grid item>
                    <SubmitButton color="success" onClick={handleLogin}>Continue</SubmitButton>
                </Grid>
            </Grid>
        </Box>
    );

}

export default Login;