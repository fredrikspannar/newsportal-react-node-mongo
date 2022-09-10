import { Grid } from '@mui/material';
import splashLogo from "./newsportal.jpg";
import Login from "../pages/Login";

const HomeSplash = ({dispatchAuth}) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <img src={splashLogo} alt="Newsportal" style={{ display: "block"}} />
                </Grid>
                <Grid item xs={4}>
                    <Login gridSize={12} dispatchAuth={dispatchAuth} titleSizeH3={true} />
                </Grid>                
            </Grid>
        </>
    )
}

export default HomeSplash;