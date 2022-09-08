import express from "express";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

// setup app and middleware
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// setup routes
import authRoute from "./routes/auth.js";
import articleRoute from "./routes/articles.js";

app.use(authRoute);
app.use(articleRoute);


// default route to 404 not found if no other matches
app.use((req, res) => {
    res.status(404).send();
});


export default app;