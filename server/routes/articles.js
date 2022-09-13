import express from "express";

import articleModel from "../models/articleModel.js";
import categoryModel from "../models/categoryModel.js";

import requireAuthorized from "../middleware/requireAuthorized.js";

import { getArticles, capitalizeFirstLetter } from "../utils/common.js";

const Router = express.Router();

// this should be set in .env or seeded in the database
const categories = ['technology', 'entertainment', 'business', 'general'];

/**
 * @openapi
 * /api/articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Get single article by slug
 *     parameters:
 *       - name: slug
 *         in: query
 *         required: true
 *         type: string
 *         description: slug of article
 *     responses:
 *       200:
 *         description: Returns article
 *       500:
 *         description: Internal server error with query
 */
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

/**
 * @openapi
 * /api/articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Get all articles. Default (hardcoded categories) are technology, entertainment, business, general
 *     responses:
 *       200:
 *         description: Returns articles
 *       204:
 *         description: Failed to fetch articles from newsapi.org
 *       500:
 *         description: Internal server error with query
 */
Router.get('/api/articles', requireAuthorized, async(req,res) => {

    const numArticles = await articleModel.countDocuments({}).exec();

    if ( numArticles == 0 ) {
        // cache from NewsAPI
        
        const url = process.env.NEWSAPI_URL || false;
        
        if ( url ) {
            const cacheResult = await getArticles(url, categories);

            if ( cacheResult !== true ) {
                // failed to fetch from the api
                res.status(204).json({"result":"error", "message": cacheResult.message ? cacheResult.message : 'Failed to fetch articles from newsapi.org'});

            } else {
                // get all from cache and return data
                articleModel.find({}).sort({ publishedAt : "desc"})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(error);
                    });
            }

        } else {
            res.status(500).json({"result":"error", "message":"enviroment NEWSAPI_URL is not set, failed to get articles"});
        } 

    } else {

        // get all from cache and return data
        articleModel.find({}).sort({ publishedAt : "desc"})
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });

    }
   
});

/**
 * @openapi
 * /api/articles-by-name:
 *   get:
 *     tags:
 *       - Articles
 *     description: Get articles by category name
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         type: string
 *         description: name of category
 *     responses:
 *       200:
 *         description: Returns articles
 *       204:
 *         description: Failed to fetch articles from newsapi.org
 *       500:
 *         description: Internal server error with query
 */
Router.get('/api/articles-by-name/:name', requireAuthorized, async (req,res) => {
    const { name } = req.params;

    // name can be comma-separated list ( sent with + as replacement for , )
    let query = { category : name.toLowerCase().replace('+', ',').split(',') };

    const numArticles = await articleModel.countDocuments({}).exec();

    if ( numArticles == 0 ) {
        // cache from NewsAPI
        
        const url = process.env.NEWSAPI_URL || false;
        
        if ( url ) {
            const cacheResult = await getArticles(url, categories);

            if ( cacheResult !== true ) {
                // failed to fetch from the api
                res.status(204).json({"result":"error", "message": cacheResult.message ? cacheResult.message : 'Failed to fetch articles from newsapi.org'});

            } else {
                // get from cache by category and return data
                articleModel.find( query ).sort({ publishedAt : "desc"})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json(error);
                    });
            }

        } else {
            res.status(500).json({"result":"error", "message":"enviroment NEWSAPI_URL is not set, failed to get articles"});
        } 

    } else {

        // get from cache by category and return data
        articleModel.find( query ).sort({ publishedAt : "desc"})
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    }
});

export default Router;