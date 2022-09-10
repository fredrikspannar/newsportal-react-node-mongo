import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Custom hook to retrive and clear session feedback.
 * 
 * Usage:
 *          import MessageHook from "utils/MessageHook.js"
 *          ...
 *          sessionStorage.setItem('message', { 'type': 'error', 'content': 'Authorization failed' })
 * 
 *     OR with success:
 *          sessionStorage.setItem('message', { 'type': 'success', 'content': 'Profile saved' })
 * 
 * 
 *     Use in component:
 *          const [ message, setMessage ] = MessageHook();
 * 
 *     and then in return JSX:
 *          { message !== false && message }
 */
const MessageHook = () => {
    let returnMessage = false;
    const storageMessage = JSON.parse(sessionStorage.getItem('message'));
    const [ message, setMessage ] = useState(storageMessage || false);
    let [ showMessage, setShowMessage ] = useState( message !== false ? true : false);

    const handleSetMessage = (message) => {
        message = JSON.stringify(message);
        sessionStorage.setItem('message', message);
        setMessage(message);
        setShowMessage(true);
    }

    if ( message !== false ) {
        const type = message.type;
        const content = message.content;

        // create return JSX
        returnMessage = <Snackbar open={showMessage} anchorOrigin={{ vertical:"top", horizontal:"right"}} autoHideDuration={7500} onClose={() => setShowMessage(false)}>
                <Alert onClose={() => setShowMessage(false)} severity={type} sx={{ width: '100%' }}>{content}</Alert>
            </Snackbar>;

        // remove from storage
        sessionStorage.removeItem('message');
    }


    return [ returnMessage, handleSetMessage ];
}

export default MessageHook;