import React, { useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";

import MessageHook from "../utils/messageHook";

import { 
    TextField, Grid, Paper, CircularProgress,
    Checkbox, Button, FormGroup, FormControlLabel,
} from '@mui/material';

import { TextFieldValidationReducer, TEXTFIELD_SET, TEXTFIELD_ERROR } from "../reducers/TextFieldValidationReducer";

import { styled } from '@mui/material/styles';

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


const Profile = () => {
    const navigate = useNavigate();
    const [ message, setMessage ] = MessageHook();
    let userData = sessionStorage.getItem('userData') || false;

    if ( userData !== false ) {
        userData = JSON.parse(userData);
    
    } else {
        setMessage({type:"error", message:"No userdata found! Try logout and login"});
        userData = { firstname:"", lastname: "", categories: [] };
    }

    let userCategories = sessionStorage.getItem('userCategories') || false;

    if ( userCategories !== false ) {
        userCategories = userCategories.split(',');
    } else {
        userCategories = [];
    }

    const [ isProcessing, setIsProcessing ] = useState(false);

    const [ firstname, dispatchFirstname ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: (userData.firstname && userData.firstname !== "" ? userData.firstname : '') });
    const [ lastname, dispatchLastname ] = useReducer(TextFieldValidationReducer, { error: false, disabled: false, data: (userData.lastname && userData.lastname !== "" ? userData.lastname : '') });
    
    const [ categoryGeneralIsChecked, setCategoryGeneralIsChecked ] = useState(userCategories.includes('general') ? true : false);
    const [ categoryBusinessIsChecked, setCategoryBusinessIsChecked ] = useState(userCategories.includes('business') ? true : false);
    const [ categoryTechnologyIsChecked, setCategoryTechnologyIsChecked ] = useState(userCategories.includes('technology') ? true : false);
    const [ categoryEntertainmentIsChecked, setCategoryEntertainmentIsChecked ] = useState(userCategories.includes('entertainment') ? true : false);

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

    const handleUpdate = () => {
        if ( firstname.data.length === 0 ) {
            dispatchFirstname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        } else if ( lastname.data.length === 0 ) {
            dispatchLastname( { type: TEXTFIELD_ERROR, payload: "This field is required!" } );
            return;
        }

        const postData = {
            firstname: firstname.data,
            lastname: lastname.data,
            categories: []
        }

        if (categoryGeneralIsChecked) postData.categories.push('general');
        if (categoryBusinessIsChecked) postData.categories.push('business');
        if (categoryTechnologyIsChecked) postData.categories.push('technology');
        if (categoryEntertainmentIsChecked) postData.categories.push('entertainment');

        setIsProcessing(true);


        fetch('/api/profile', { 
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

            } else if ( data.ok && data.status === 200 && data.body.user ) {

                // update successful
                let userData = data.body.user;
                delete userData.__v;
                delete userData._id;
                delete userData.createdAt;
                delete userData.email;

                sessionStorage.setItem('userCategories',userData.categories);

                // store user name for display purpose
                delete userData.categories;
                userData = JSON.stringify(userData); // needs to be encoded before sessionStorage
                sessionStorage.setItem('userData',userData);


                // feedback
                setIsProcessing(false);
                setMessage({type:"success", content:"Your profile has been updated"});

                navigate('/');
                
            } else {
                // general error
                throw new Error(`Failed to login! ${data.status} ${data.statusText}`);
            }

        })
        .catch((error) => {
            setMessage({type:"error", content:error.message});
            
        });  

    }

    return (
        <>
             <h1>Profile</h1>

            {userData !== false &&
            
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                        <h4>Name:</h4>
                        <Item><TextField fullWidth id="firstname" label="Firstname" variant="standard" defaultValue={firstname.data} disabled={firstname.disabled !== false} error={firstname.error !== false} helperText={firstname.error !== false ? firstname.error : ''} onBlur={(e) => handleFirstnameInputBlur(e)} /></Item>
                        <Item><TextField fullWidth id="lastname" label="Lastname" variant="standard" defaultValue={lastname.data} disabled={lastname.disabled !== false} error={lastname.error !== false} helperText={lastname.error !== false ? lastname.error : ''} onBlur={(e) => handleLastnameInputBlur(e)} /></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Selected categories:</h4>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox id="general" checked={categoryGeneralIsChecked} onChange={() => setCategoryGeneralIsChecked(!categoryGeneralIsChecked) } />}  label="General" style={{ width: "140px"}} />
                            <FormControlLabel control={<Checkbox id="business" checked={categoryBusinessIsChecked} onChange={() => setCategoryBusinessIsChecked(!categoryBusinessIsChecked) } />}  label="Business" />
                        </FormGroup>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox id="technology" checked={categoryTechnologyIsChecked} onChange={() => setCategoryTechnologyIsChecked(!categoryTechnologyIsChecked) } />} label="Technology"  style={{ width: "140px"}} />
                            <FormControlLabel control={<Checkbox id="entertainment" checked={categoryEntertainmentIsChecked} onChange={() => setCategoryEntertainmentIsChecked(!categoryEntertainmentIsChecked) } />} label="Entertainment" />
                        </FormGroup>                        
                    </Grid>
                    <Grid item xs={12}>
                        { isProcessing 
                            ? <CircularProgress size="1.2rem" />
                            : <SubmitButton color="success" onClick={handleUpdate}>Save</SubmitButton>
                        }
                    </Grid>
                </Grid>
            }

             {message !== false && message}
        </>
    );
}

export default Profile;