import express from "express";

import categoryModel from "../models/categoryModel.js";

import requireAuthorized from "../middleware/requireAuthorized.js";

const Router = express.Router();

Router.get('/api/categories', requireAuthorized, (req,res) => {

    // get all from cache and return data
    categoryModel.find({})
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });

});



export default Router;