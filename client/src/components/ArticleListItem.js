import { Card, Grid, CardContent, CardMedia, Typography, CardHeader, Avatar, CardActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import getArticleIcon from "../utils/getArticleIcon";

import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

const ArticleListItem = ({item}) => {
    const navigate = useNavigate();

    let headerIcon = getArticleIcon(item.sourceName);
    let headerCategory = "";

    let publishedDate = new Date(item.publishedAt);
    let formattedPublishedAtDate = publishedDate.toLocaleDateString('sv-SE');
    let formattedPublishedAtTime = publishedDate.getHours() + ':' + publishedDate.getMinutes();

    return (
        <Grid item xs={4}>
            <Card variant="outlined">
                <CardHeader 
                    avatar={
                            <Avatar aria-label="recipe">{headerIcon}</Avatar>
                        }
                    title={item.sourceName}
                    subheader={headerCategory}
                />
                <CardMedia
                    component="img"
                    height="140"
                    image={item.urlToImage}
                    alt="green iguana"
                />        
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{item.title}</Typography>                
                    <Typography gutterBottom variant="subtitle2" component="div"><BsCalendarDate /> {formattedPublishedAtDate} <BiTime /> {formattedPublishedAtTime}</Typography>                
                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate(`/article/${item.slug}`) }>Continue reading</Button>
                </CardActions>                
            </Card>
        </Grid>
    );
};

export default ArticleListItem;