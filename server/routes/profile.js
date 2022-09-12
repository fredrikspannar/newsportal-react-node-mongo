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


    authModel.findOneAndUpdate({ _id: req.user._id }, { firstname:firstname, lastname:lastname, categories:categories})
        .then((userUpdated) => {

            // get first result and convert to JSON
            let user = userUpdated.toJSON();
            delete user.password;

            res.send({'result':'ok', 'user':user});

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });

});

export default Router;