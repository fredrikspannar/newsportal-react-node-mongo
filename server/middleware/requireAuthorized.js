import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import tokenModel from "../models/tokenModel.js";

const requireAuthorized = async function (req, res, next) {

    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.SECRET);

        // verify user
        const user = await authModel.findOne({ 'email': decoded.email }).exec();

        if ( !user || user === null ) {
            throw new Error('Authentication failed');
        }

        // also verify that token exists
        const tokenDB = await tokenModel.findOne({'token': token}).exec();

        if ( !tokenDB || tokenDB === null ) {
            throw new Error('Token failed');
        }

        // proceed with request
        req.user = user;
        next();

    } catch (error) {

        if ( error.message == "Token failed" ) {
            res.status(401).send({
                "result": "error", "message": "Login again"
            });
        } else {
            res.status(400).send({
                "result": "error", "message": "Authentication failed"
            });
        }
    }
};


export default requireAuthorized;