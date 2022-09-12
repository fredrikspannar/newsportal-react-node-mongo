import express from "express";

import requireAuthorized from "../middleware/requireAuthorized.js";
import { hasValidFields } from "./../utils/common.js";

import authModel from "../models/authModel.js";

const Router = express.Router();

Router.post('/api/profile', requireAuthorized, (req, res) =>{
    const requiredFields = [ "firstname", "lastname"];
    const isValid = hasValidFields(requiredFields, req.body);

    // validate before mongoose to catch simple errors
    if ( !isValid ) {
        return res.status(400).json({ "result": "error", "message": "Check required fields" })
    }

    // get parameters
    const { firstname, lastname, categories } = req.body;

console.log(req.user);

    

    res.send({});

});

export default Router;