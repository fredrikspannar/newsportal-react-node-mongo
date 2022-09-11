import express from "express";

import articleModel from "../models/articleModel.js";
import categoryModel from "../models/categoryModel.js";

import requireAuthorized from "../middleware/requireAuthorized.js";

import { getArticles, capitalizeFirstLetter } from "../utils/common.js";

const Router = express.Router();

Router.get('/api/article/:slug', requireAuthorized, (req,res) => {
    const { slug } = req.params;

    articleModel.findOne({ slug: slug})
        .then((result) => {

                if ( result === null ) {
                    res.status(404).send({});
                } else {
                    res.send(result);
                }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });

});


Router.get('/api/articles', requireAuthorized, async(req,res) => {

    const numArticles = await articleModel.countDocuments({}).exec();

    if ( numArticles == 0 ) {
        // cache from NewsAPI
        
        const url = process.env.NEWSAPI_URL || false;
        
        if ( url ) {
            const categories = ['technology', 'entertainment', 'business', 'general'];

            try {

                // query for each category
                // use Promise.all to wait for all categories to be fetched
                await Promise.all( categories.map(async (category) => {
                    const result = await getArticles( url.replace('CATEGORY', category), category );

                    if ( result !== true ) {
                        throw new Error(result);

                    } else {
                        let cat = new categoryModel();
                        cat.name = capitalizeFirstLetter(category);
                        await cat.save();
                    }

                }) );

                // get all articles and then return data
                articleModel.find({})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(error);
                    });

            } catch(error)     {

                // failed to fetch from API
                res.status(error.code).json({'result':error.result, 'message': error.message});
                return;
            }

        } else {
            res.status(500).json({"result":"error", "message":"enviroment NEWSAPI_URL is not set, failed to get articles"});
        } 

    } else {

        // get all from cache and return data
        articleModel.find({})
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });

    }
   

});


Router.get('/api/articles-by-name/:name', requireAuthorized, (req,res) => {
    const { name } = req.params;

    // name can be comma-separated list ( sent with + as replacement for , )
    let query = { category : name.toLowerCase().replace('+', ',').split(',') };

    // get all from cache and return data
    articleModel.find( query )
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });

});
export default Router;