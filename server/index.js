import express from "express";
import * as dotenv from "dotenv";
dotenv.config();


import authRoute from "./routes/auth.js";


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(authRoute);


// default to 404 not found
app.use((req, res) => {
    res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
