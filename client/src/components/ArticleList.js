import { useReducer, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import {ArticleListReducer, ARTICLES_SET, ARTICLES_LOADING, ARTICLES_ERROR } from "../reducers/ArticleListReducer";
import ArticleListItem from "../components/ArticleListItem";

const ArticleList = () => {
    const [ articles, dispatchArticles ] = useReducer(ArticleListReducer, { data: [ ], isLoading: true, error: false });

    useEffect(() => {
        dispatchArticles( { type: ARTICLES_LOADING } );

        fetch('/api/articles')
            .then((response) => response.json())
            .then((result) => {
                dispatchArticles( { type: ARTICLES_SET, payload: result } );
            })
            .catch((error) => {
                dispatchArticles( { type: ARTICLES_ERROR, payload: error.message } );
            });

    },[]);

    return (
        <>
            {articles.isLoading ? <CircularProgress /> :
                (articles.error !== false ? <p>Failed to load articles: {articles.error}</p>  : articles.data.map((item, index) => <ArticleListItem key={index} item={item} />)
            )}
        </>
    );
};

export default ArticleList;