import app from "./app.js";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const mongoDB_URL = process.env.NODE_MONGODB;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoDB_URL, { useNewUrlParser: true })
    .then(()=>{
        console.log(`Connected to MongoDB`);

        // start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB: ',err);
        process.exit(1);
    });