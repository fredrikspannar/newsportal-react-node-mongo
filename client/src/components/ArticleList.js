import { useReducer, useEffect } from 'react';
import { CircularProgress, Grid, Button } from '@mui/material';
import {ArticleListReducer, ARTICLES_SET, ARTICLES_LOADING, ARTICLES_ERROR } from "../reducers/ArticleListReducer";
import ArticleListItem from "../components/ArticleListItem";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const ArticleList = () => {
    const userCategories = sessionStorage.getItem('userCategories') || false;
    const [ articles, dispatchArticles ] = useReducer(ArticleListReducer, { data: [ ], isLoading: true, error: false });

    useEffect(() => {
        dispatchArticles( { type: ARTICLES_LOADING } );

        let url = '/api/articles';
        if ( userCategories !== false ) url = `/api/articles-by-name/${userCategories.replace(' ','').replace(',','+')}`

        fetch(url, {credentials: "include"})
        .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
            .then((data) => {

                if ( data.ok ) {
                    dispatchArticles( { type: ARTICLES_SET, payload: data.body } );
                
                } else if ( data.body.result === "error" && data.body.message ) {
                    dispatchArticles( { type: ARTICLES_ERROR, payload: data.body.message } );

                } else {
                    dispatchArticles( { type: ARTICLES_ERROR, payload: `${data.status} - ${data.statusText}` } );
                }

                
            })
            .catch((error) => {

                dispatchArticles( { type: ARTICLES_ERROR, payload: error.message } );
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let formattedUserCategories = false;
    if ( userCategories !== false ) {
        formattedUserCategories = [];
        const uCats = userCategories.split(',')
        formattedUserCategories = uCats.map((uc) => capitalizeFirstLetter(uc) );
    }

    return (
        <>
            {formattedUserCategories !== false && <p>Selected categories: {formattedUserCategories.join(', ')} <Button href="/profile" size="small" style={{marginLeft:"10px"}} variant="outlined">Edit</Button></p>}
            <Grid container spacing={2}>
              {articles.isLoading ? <CircularProgress /> :
                (articles.error !== false 
                    ? <p>Failed to load articles: {articles.error}</p>  
                    : articles.data.map((item, index) => <ArticleListItem key={index} item={item} /> )
              )}
            </Grid>
        </>
    );
};

export default ArticleList;