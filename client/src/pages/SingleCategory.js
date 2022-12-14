import { useEffect, useReducer } from "react";
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import { ArticleListReducer, ARTICLES_SET, ARTICLES_LOADING, ARTICLES_ERROR } from "../reducers/ArticleListReducer";
import ArticleListItem from "../components/ArticleListItem";


const SingleCategory = () => {
    const { name } = useParams();
    const [ articles, dispatchArticles ] = useReducer(ArticleListReducer, { data: [ ], isLoading: true, error: false });

    useEffect(() => {
        dispatchArticles( { type: ARTICLES_LOADING } );

        fetch(`/api/articles-by-name/${name}`, {credentials: "include"})
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

    return (
        <>
            <h1>Articles in category {name}</h1>
            <Grid container spacing={2}>
              {articles.isLoading ? <CircularProgress /> :
                (articles.error !== false 
                    ? <p>Failed to load articles: {articles.error}</p>  
                    : articles.data.map((item, index) => <ArticleListItem key={index} item={item} /> )
              )}
            </Grid>
        </>
    );
}

export default SingleCategory;