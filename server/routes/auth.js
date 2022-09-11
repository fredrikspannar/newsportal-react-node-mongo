import express from "express";
import md5 from "md5";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import tokenModel from "../models/tokenModel.js";

const Router = express.Router();

import { hasValidFields } from "./../utils/common.js";
import requireAuthorized from "../middleware/requireAuthorized.js";


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

                // save token to mongo
                let tokenDB = new tokenModel();
                tokenDB.token = token;
                tokenDB.userId = user._id;

                tokenDB.save()
                    .then((tokenDBCreated) => {
                        // all done, login complete
                        
                        // set http-only cookie
                        res.cookie('token', token, {
                            httpOnly: true
                        });
                    
                        res.json({ "result": "success", "user": user });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(error);
                    });

            }

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });


});

Router.post("/api/logout", requireAuthorized, (req, res) => {

    // delete token from mongo
    tokenModel.deleteOne({ token: req.cookies.token, userId: req.user._id })
        .then((result) => {

            if ( result && result.deletedCount > 0 ) {
                // clear httponly-cookie
                res.clearCookie('token');
                res.status(200).json( { "result": "success" } );

            } else {
                res.status(500).json({ "result": "error", "message": "Failed to logout" });
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
    user.categories = ["entertainment", "technology"];

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
                        let user = userCreated.toJSON();
                        delete user.password;

                        // create session direct
                        const token = jwt.sign(user, process.env.SECRET);

                        // save token to mongo
                        let tokenDB = new tokenModel();
                        tokenDB.token = token;
                        tokenDB.userId = user._id;
        
                        tokenDB.save()
                            .then((tokenDBCreated) => {
                                // all done, login complete
                                
                                // set http-only cookie
                                res.cookie('token', token, {
                                    httpOnly: true
                                });
                            
                                // all done
                                res.status(201).send({"result":"success", "user": user});

                            })
                            .catch((error) => {
                                console.log(error);
                                res.status(500).json(error);
                            });

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