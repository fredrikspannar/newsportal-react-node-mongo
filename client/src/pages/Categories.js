import { CircularProgress, Grid, Paper } from '@mui/material';
import { useReducer, useEffect } from 'react';

import {CategoriesReducer, CATEGORIES_SET, CATEGORIES_LOADING, CATEGORIES_ERROR } from "../reducers/CategoriesReducer";
import CategoryItem from "../components/CategoryItem"

import { styled } from '@mui/material/styles';

const StyledH1 = styled(Paper)`
    display: block;
    box-shadow: none;
    border: 0;
`;

const Categories = () => {
    const [ categories, dispatchArticles ] = useReducer(CategoriesReducer, { data: [ ], isLoading: true, error: false });

    useEffect(() => {
        dispatchArticles( { type: CATEGORIES_LOADING } );

        fetch('/api/categories', {credentials: "include"})
            .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data})) ) // package status and json body into return result
            .then((data) => {

                if ( data.ok ) {
                    dispatchArticles( { type: CATEGORIES_SET, payload: data.body } );
                
                } else if ( data.body.result === "error" && data.body.message ) {
                    dispatchArticles( { type: CATEGORIES_ERROR, payload: data.body.message } );

                } else {
                    dispatchArticles( { type: CATEGORIES_ERROR, payload: `${data.status} - ${data.statusText}` } );
                }
                
            })
            .catch((error) => {

                dispatchArticles( { type: CATEGORIES_ERROR, payload: error.message } );
            });

    },[]);

    return (
        <>
            <StyledH1><h1>Categories</h1></StyledH1>
            <Grid container spacing={2}>
                
                {categories.isLoading ? <CircularProgress /> :
                    (categories.error !== false 
                        ? <p>Failed to load categories: {categories.error}</p>  
                        : categories.data.map((item, index) => <CategoryItem key={index} category={item} /> )
                )}

            </Grid>
        </>
    );
};

export default Categories;