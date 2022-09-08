import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const requireAuthorized = async function (req, res, next) {

    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await authModel.findOne({ 'email': decoded.email }).exec();

        if ( !user || user === null ) {
            throw new Error('Authentication failed');
        }

        // proceed with request
        req.user = user;
        next();

    } catch (error) {

        res.status(400).send({
          "result": "error", "message": "Authentication failed"
        });
    }
};


export default requireAuthorized;