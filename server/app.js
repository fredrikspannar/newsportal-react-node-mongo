import express from "express";
import helmet from "helmet";


import authRoute from "./routes/auth.js";


const app = express();


app.use(helmet());
app.use(express.json());

app.use(authRoute);


// default to 404 not found
app.use((req, res) => {
    res.status(404).send();
});



export default app;