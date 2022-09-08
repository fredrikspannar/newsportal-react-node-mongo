import express from "express";
import fetch from 'node-fetch';

import articleModel from "../models/articleModel.js";

import requireAuthorized from "../middleware/requireAuthorized.js";

const Router = express.Router();

Router.get('/api/articles', requireAuthorized, async(req,res) => {

    const numArticles = await articleModel.countDocuments({}).exec();

    if ( numArticles == 0 ) {
        // cache from NewsAPI
        
        const url = process.env.NEWSAPI_URL || false;
        if ( url ) {

            fetch(url)
                .then((response) => response.json())
                .then((result) => {

                    // save each item to db
                    result.articles.map((item) => {

                        try {
                            let article = new articleModel();
                            article.sourceName = item.source.name;
                            article.author = item.author;
                            article.title = item.title;
                            article.description = item.description;
                            article.url = item.url;
                            article.urlToImage = item.urlToImage;
                            article.publishedAt = item.publishedAt;
                            article.content = item.content;

                            article.save((err, articleCreated) => {
                                if (err) {
                                    throw new Error(err);
                                }
                            });

                        } catch(error) {
                            console.log(error);
                            res.status(500).json(error);
                        }

                    });

                    // cached until next time
                    res.json(result.articles);

                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json(error);
                });


        } else {
            res.status(500).json({"result":"error", "message":"enviroment NEWSAPI_URL is not set, failed to get articles"});
        }

    } else {
   
        // get all 
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



export default Router;