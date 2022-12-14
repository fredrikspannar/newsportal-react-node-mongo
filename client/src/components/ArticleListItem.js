import { Card, Grid, CardContent, CardMedia, Typography, CardHeader, Avatar, CardActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import striptags from 'striptags';

import getArticleIcon from "../utils/getArticleIcon";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import formatArticleDateTime from "../utils/formatArticleDateTime";

import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

const ArticleListItem = ({item}) => {
    const navigate = useNavigate();

    let headerIcon = getArticleIcon(item.sourceName);
    let headerCategory = capitalizeFirstLetter(item.category);
    let publishedAt = formatArticleDateTime(item.publishedAt);

    const openInNewWindow = (url) => {
        const win = window.open(url, '_blank');
        if (win != null) {
          win.focus();
        }
      }

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
                    height="100"
                    image={item.urlToImage || "/images/newsportal-logo.jpg"}
                    alt={item.title}
                /> 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{item.title}</Typography>                
                    <Typography gutterBottom variant="subtitle2" component="div"><BsCalendarDate /> {publishedAt.date} <BiTime /> {publishedAt.time}</Typography>                
                    <Typography variant="body2" color="text.secondary">{striptags(item.description)}</Typography>
                </CardContent>
                <CardActions style={{justifyContent: "space-between"}}>
                    <Button size="small" onClick={() => openInNewWindow(`${item.url}`) }>Read full story (source)</Button>
                    <Button size="small" onClick={() => navigate(`/article/${item.slug}`) }>View story</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ArticleListItem;