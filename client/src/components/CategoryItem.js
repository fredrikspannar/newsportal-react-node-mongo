import { Card, Grid, CardContent, Typography, CardActions, Button } from '@mui/material';

const CategoryItem = ({category}) => {




    return (
        <Grid item xs={6}>
            <Card variant="outlined">
                <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{category.name}</Typography>                
                    </CardContent>
                    {/*<CardActions style={{justifyContent: "space-between"}}>
                        <Button size="small" onClick={() => openInNewWindow(`${item.url}`) }>Read full story (source)</Button>
                        <Button size="small" onClick={() => navigate(`/article/${item.slug}`) }>View story</Button>
                    </CardActions>*/}
            </Card>
        </Grid>
    );

}

export default CategoryItem;