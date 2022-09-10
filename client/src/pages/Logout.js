import React, { useEffect, useState } from 'react';
import { CircularProgress} from '@mui/material';
import { useNavigate } from "react-router-dom";
import MessageHook from "../utils/messageHook.js";

const Logout = () => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') || false;
    const [ isLoggingOut, setIsLoggingOut ] = useState(true)
    const [ message, setMessage ] = MessageHook();
    const navigate = useNavigate();

    useEffect(()=> {
            fetch('/api/logout', { 
                method: "post",
                headers: [ ["Content-Type", "application/json"] ],
                credentials: "include"}
            )
            .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
            .then((data) => {
    
                if ( data.ok && data.body.result === "success") {
    
                    sessionStorage.removeItem('isAuthenticated');
                    sessionStorage.removeItem('userData');
    
                    setIsLoggingOut(false);
                    setMessage({"type":"success", "content":"You have successfully logged out!"});
    
                    navigate("/login");
    
                } else if ( data.body.result === "error" && data.body.message ) {
                    // general error
                    throw new Error(data.body.message);
    
                } else {
                    // general error
                    throw new Error(`Failed to logout! ${data.status} ${data.statusText}`);
                }
    
            })
            .catch((error) => {
                setMessage(error.message);
            });             
  
    },[isAuthenticated, setMessage, navigate]);

    if ( isAuthenticated === false || isAuthenticated === "false" ) {
        setMessage({"type":"error", "content":"Why are you trying to logout when you're not logged in!?"});
        navigate("/login");
        return;
    }

    return (
        <>
            {message !== false && message}

            {isLoggingOut
                ? <CircularProgress style={{ top: "26px", position: "relative" }} />
                : <p>You have been logged out.</p>
            }
        </>
    )
}

export default Logout;