import React, { useReducer } from 'react';
import { useNavigate } from "react-router-dom";

import { 
    TextField, Grid, Paper, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import * as EmailValidator from 'email-validator';
import { TextFieldValidationReducer, TEXTFIELD_SET, TEXTFIELD_ERROR, TEXTFIELD_DISABLED, TEXTFIELD_RESET } from "../reducers/TextFieldValidationReducer";

import MessageHook from "../utils/messageHook";

import { AUTH_LOGIN } from "../reducers/AuthReducer";

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


const Register = ({dispatchAuth}) => {
    const [ email, dispatchEmail ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ password, dispatchPassword ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ firstname, dispatchFirstname ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });
    const [ lastname, dispatchLastname ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: "" });

    const [ message, setMessage ] = MessageHook();
    const navigate = useNavigate();

    const handleRegister = () => {
        if ( email.data.length === 0 ) {
            dispatchEmail( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        } else if ( password.data.length === 0 ) {
            dispatchPassword( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        } else if ( firstname.data.length === 0 ) {
            dispatchFirstname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        } else if ( lastname.data.length === 0 ) {
            dispatchLastname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        }

        dispatchEmail( { type: TEXTFIELD_DISABLED } );
        dispatchPassword( { type: TEXTFIELD_DISABLED } );
        dispatchFirstname( { type: TEXTFIELD_DISABLED } );
        dispatchLastname( { type: TEXTFIELD_DISABLED } );

        const postData = {
            firstname: firstname.data,
            lastname: lastname.data,
            email: email.data,
            password: password.data
        }

        fetch('/api/register', { 
            method: "post",
            headers: [ ["Content-Type", "application/json"] ],
            credentials: "include",
            body: JSON.stringify(postData) }
        )
        .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
        .then((data) => {

            if ( !data.ok && data.body.result === "error" && data.body.message ) {
                // error from backend
                setMessage({type:"error", content:data.body.message});

                dispatchEmail( { type: TEXTFIELD_RESET } );
                dispatchPassword( { type: TEXTFIELD_RESET } );
                dispatchFirstname( { type: TEXTFIELD_RESET } );
                dispatchLastname( { type: TEXTFIELD_RESET } );   

            } else if ( data.ok && data.status === 201 && data.body.user ) {

                    // login successful
                    let userData = data.body.user;
                    delete userData.__v;
                    delete userData._id;
                    delete userData.createdAt;
                    delete userData.email;
                
                    dispatchAuth( { type: AUTH_LOGIN, payload: userData } );
                    
                
                    // feedback after login
                    sessionStorage.setItem('showRegisterSuccessfulOnHome',true); // when login from widget on Home this message was not displayed when set in Login component
                    sessionStorage.setItem('isAuthenticated',true);
                
                    sessionStorage.setItem('userCategories',userData.categories);
                    
                    // store user name for display purpose
                    delete userData.categories;
                    userData = JSON.stringify(userData); // needs to be encoded before sessionStorage
                    sessionStorage.setItem('userData',userData);

                    navigate('/');
                    
            } else {
                // general error
                throw new Error(`Failed to login! ${data.status} ${data.statusText}`);
            }

        })
        .catch((error) => {
            setMessage({type:"error", content:error.message});

            dispatchEmail( { type: TEXTFIELD_RESET } );
            dispatchPassword( { type: TEXTFIELD_RESET } );
            dispatchFirstname( { type: TEXTFIELD_RESET } );
            dispatchLastname( { type: TEXTFIELD_RESET } );            
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

    const handleFirstnameInputBlur = (e) => {
        if ( e.target.value.toString().length === 0 ) {
            dispatchFirstname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
        } else {
            dispatchFirstname( { type: TEXTFIELD_SET, payload: e.target.value } );
        }
    }

    const handleLastnameInputBlur = (e) => {
        if ( e.target.value.toString().length === 0 ) {
            dispatchLastname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
        } else {
            dispatchLastname( { type: TEXTFIELD_SET, payload: e.target.value } );
        }
    }

    return (
        <>
            {message !== false && message}

            <Grid container spacing={2}  alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Item><h1>Register</h1></Item>
                    <Item><TextField fullWidth id="firstname" label="Firstname" variant="standard" disabled={firstname.disabled !== false} error={firstname.error !== false} helperText={firstname.error !== false ? firstname.error : ''} onBlur={(e) => handleFirstnameInputBlur(e)} /></Item>
                    <Item><TextField fullWidth id="lastname" label="Lastname" variant="standard" disabled={lastname.disabled !== false} error={lastname.error !== false} helperText={lastname.error !== false ? lastname.error : ''} onBlur={(e) => handleLastnameInputBlur(e)} /></Item>
                    <Item><TextField fullWidth id="email" label="E-mail" variant="standard" disabled={email.disabled !== false} error={email.error !== false} helperText={email.error !== false ? email.error : ''} onBlur={(e) => handleEmailInputBlur(e)} /></Item>
                    <Item><TextField fullWidth type="password" id="password" label="Password" variant="standard" disabled={password.disabled !== false} error={password.error !== false} helperText={password.error !== false ? password.error : ''} onBlur={(e) => handlePasswordInputBlur(e)} /></Item>
                    <Item>{email.disabled !== false && password.disabled !== false 
                        ? <CircularProgress size="1.2rem" style={{ top: "26px", position: "relative" }} />
                        : <SubmitButton color="success" onClick={handleRegister}>Continue</SubmitButton>
                    }</Item>
                </Grid>
            </Grid>
        </>
    );
}

export default Register;