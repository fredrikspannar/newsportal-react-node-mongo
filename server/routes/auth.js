import express from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const Router = express.Router();

import { hasValidFields } from "./../utils/common.js";



Router.post("/api/login", (req, res) => {
    const requiredFields = [ "email", "password" ];
    const isValid = hasValidFields(requiredFields, req.body);

    // validate before mongoose to catch simple errors
    if ( !isValid ) {
        return res.status(400).json({ "result": "error", "message": "Check required fields" })
    }

    const { email, password } = req.body;

    // query user by email and hashed password
    authModel.find({ "email": email, "password": md5(password) })
        .then((user) => {
        
            if ( user.length == 0 ) {
                res.status(400).json({ "result": "error", "message": "Check email/password" });
            } else {
                // get first result and convert to JSON
                user = user[0].toJSON();
                delete user.password;
                
                // create login-token
                const token = jwt.sign(user, process.env.SECRET);

                // set http-only cookie
                res.cookie('token', token, {
                    httpOnly: true
                });
            
                res.json({ "result": "success", "user": user });
            }

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });


});

Router.post("/api/register", (req, res) => {
    const requiredFields = [ "firstname", "lastname", "email", "password" ];
    const isValid = hasValidFields(requiredFields, req.body);

    // validate before mongoose to catch simple errors
    if ( !isValid ) {
        return res.status(400).json({ "result": "error", "message": "Check required fields" })
    }

    // get parameters and setup new user
    const { firstname, lastname, email, password } = req.body;

    let user = new authModel();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = md5(password);

    // first check if user exists
    authModel.find({ "email": email})
        .then((userExist) => {
            if ( userExist.length > 0 ) {
                res.status(400).json({ "result" :"error", "message": "User already exists"});
                return true;

            } else {

                // return that user doesn't exist yet
                return false;
            }
        })
        .then((userExists) => {
            if ( !userExists ) {
                // proceed to save user
                user.save()
                    .then((userCreated) => {
                        // all done, clear password and return success
                        userCreated.password = null;
                        res.status(201).send({"result":"success", "user": userCreated});
                    })
                    .catch((error) => {
                        if ( error.name == "ValidationError") {
                            res.status(400).json({ "result" :"error", "message": "Check required fields"});
                        } else {
                            console.log('register user failed with =>',error)
                            res.status(500).json(error);
                        }
                    });                                  
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });

});

export default Router;