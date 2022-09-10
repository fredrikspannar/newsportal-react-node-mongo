import { Card, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@mui/material';

import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

import getArticleIcon from "../utils/getArticleIcon";

const SingleArticleItem = ({article}) => {

    let headerCategory = "";
    let headerIcon = getArticleIcon(article.sourceName);

    let publishedDate = new Date(article.publishedAt);
    let formattedPublishedAtDate = publishedDate.toLocaleDateString('sv-SE');
    let formattedPublishedAtTime = publishedDate.getHours() + ':' + publishedDate.getMinutes();

    return (
        <>
            <br/><br/>
            <Card variant="outlined">
                <CardHeader 
                    avatar={
                            <Avatar aria-label="recipe">{headerIcon}</Avatar>
                        }
                    title={article.sourceName}
                    subheader={headerCategory}
                />
                <CardMedia
                    component="img"
                    height="400"
                    image={article.urlToImage}
                    alt="green iguana"
                />        
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{article.title}</Typography>                
                    <Typography gutterBottom variant="subtitle2" component="div"><BsCalendarDate /> {formattedPublishedAtDate} <BiTime /> {formattedPublishedAtTime}</Typography>                
                    <Typography variant="body2" color="text.secondary">
                        {article.description}
                        &nbsp; <a href={article.url} target="blank" title="Continue reading on source">Continue reading on source</a>
                    </Typography>
                </CardContent>                               
            </Card>
        </>
    );

}

export default SingleArticleItem;