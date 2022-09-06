import express from "express";
const Router = express.Router();

import { hasValidFields } from "./../utils/common.js";

Router.post("/login", (req, res) => {

    res.send({"message": "test"})

});

Router.post("/register", (req, res) => {
    const requiredFields = [ "firstname", "lastname", "email", "password" ];
    const isValid = hasValidFields(requiredFields, req.body);

    if ( !isValid ) {
        return res.status(400).json({ "result": "error", "message": "Check required fields" })
    }




    res.send({"message": "test"})

});

export default Router;