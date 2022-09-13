import articleModel from "../models/articleModel.js";
import categoryModel from "../models/categoryModel.js";

import fetch from 'node-fetch';
import slugify  from "slugify";

export const hasValidFields = (requiredFields, input) => {
    return requiredFields.every( (field) => {

            // only check if it exists and is not empty
            return input[field] !== undefined && input[field].toString().length > 0;
            
        });
};

export const capitalizeFirstLetter = (string)  => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getCategoryArticles = async (url, category) => {

    return await fetch(url)
        .then((response) => response.json())
        .then((result) => {

            if ( result.status !== "ok" ) {

                console.log('getArticles error = ',result);
                return {'result':'error', 'message': result.message,'code':400};

            } else {

                // save each item to db
                result.articles.map((item) => {

                    if ( !item.description ) return;

                    try {
                        let slugName = `${item.source.name}-${item.title}-` + item.publishedAt.toLocaleString('sv-SE');
                        let article = new articleModel();
                        article.sourceName = item.source.name;
                        article.category = category;
                        article.author = item.author || "";
                        article.title = item.title;
                        article.description = item.description;
                        article.url = item.url;
                        article.slug = slugify(slugName, {lower: true, strict: true, trim: true});
                        article.urlToImage = item.urlToImage;
                        article.publishedAt = item.publishedAt;
                        article.content = item.content;

                        article.save((err, articleCreated) => {
                            if (err) {
                                throw new Error(err);
                            }
                        });

                    } catch(error) {
                        console.log('getArticles error = ',error);
                        return {'result':'error', 'message': error.message,'code':500};
                    }

                });
            
                // all ok!
                return true;

            }

        })
        .catch((error) => {

            console.log('getArticles error = ',error);
            return {'result':'error', 'message': error.message,'code':500};

        });

}

export const getArticles = async (url, categories) => {

    try {

        // query for each category
        // use Promise.all to wait for all categories to be fetched
        await Promise.all( categories.map(async (category) => {
            const result = await getCategoryArticles( url.replace('CATEGORY', category), category );

            if ( result !== true ) {
                throw new Error(result);

            } else {
                let cat = new categoryModel();
                cat.name = capitalizeFirstLetter(category);
                await cat.save();
            }

        }) );

    } catch(error)     {

        // failed to fetch from API
        return error;
    }

    return true;
}