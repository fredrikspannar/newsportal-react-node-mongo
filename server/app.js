import express from "express";
import helmet from "helmet";

// setup app and middleware
const app = express();

app.use(helmet());
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