import { useState } from 'react';
import ArticleList from "../components/ArticleList";
import { Snackbar, Alert } from '@mui/material';

const Home = ({message = false}) => {
    const [ showMessage, setShowMessage ] = useState(message);

    return (
        <>
            <h1>Home</h1>
            <ArticleList />

            {showMessage !== false &&
                <Snackbar open={showMessage !== false} anchorOrigin={{ vertical:"top", horizontal:"right"}} autoHideDuration={7500} onClose={() => setShowMessage(false)}>
                    <Alert onClose={() => setShowMessage(false)} severity={showMessage.type} sx={{ width: '100%' }}>{showMessage.message}</Alert>
                </Snackbar>
            }
        </>
    );

}

export default Home;