import MessageHook from "../utils/messageHook";

import { 
    TextField, Grid, Paper,
    Box, Button
} from '@mui/material';

const Profile = () => {
    const [ message, setMessage ] = MessageHook();



    return (
        <>
             <h1>Profile</h1>




             {message !== false && message}
        </>
    );
}

export default Profile;