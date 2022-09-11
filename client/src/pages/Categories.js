import { CircularProgress, Grid } from '@mui/material';
import { useReducer, useEffect } from 'react';

import {CategoriesReducer, CATEGORIES_SET, CATEGORIES_LOADING, CATEGORIES_ERROR } from "../reducers/CategoriesReducer";
import CategoryItem from "../components/CategoryItem"

const Categories = () => {
    const [ categories, dispatchArticles ] = useReducer(CategoriesReducer, { data: [ ], isLoading: true, error: false });




    return (
        <>
            <Grid container spacing={2}>

                {categories.isLoading ? <CircularProgress /> :
                    (categories.error !== false 
                        ? <p>Failed to load categories: {categories.error}</p>  
                        : categories.data.map((item, index) => <CategoryItem key={index} item={item} /> )
                )}

            </Grid>
        </>
    );
};

export default Categories;