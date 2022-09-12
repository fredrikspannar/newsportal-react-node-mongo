import React, { useReducer, useState } from 'react';

import MessageHook from "../utils/messageHook";

import { 
    TextField, Grid, Paper,
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
                        <SubmitButton color="success" onClick={handleUpdate}>Save</SubmitButton>
                    </Grid>
                </Grid>
            }

             {message !== false && message}
        </>
    );
}

export default Profile;