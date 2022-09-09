import { Card, Grid, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@mui/material';
import { DiTechcrunch } from "react-icons/di";
import { RiArticleFill }  from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

const ArticleListItem = ({item}) => {
    let headerIcon = null;
    let headerCategory = "";

    switch( item.sourceName.toLowerCase() ) {
        case 'techcrunch': headerIcon = <DiTechcrunch/>
                           break;

        default: headerIcon = <RiArticleFill />
    }

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
            </Card>
        </Grid>
    );
};

export default ArticleListItem;