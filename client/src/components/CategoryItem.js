import { Card, Grid, CardContent, Typography} from '@mui/material';

const CategoryItem = ({category}) => {

    let backgroundImage = "";

    switch(category.name.toLowerCase()) {
        case "general": backgroundImage = "/images/category-general.jpg"; break;
        case "business": backgroundImage = "/images/category-business.jpg"; break;
        case "entertainment": backgroundImage = "/images/category-entertainment.jpg"; break;
        case "technology": backgroundImage = "/images/category-technology.jpg"; break;
        default: backgroundImage = "";
    }

    const categoryName = category.name.toLowerCase();

    return (
        <Grid item xs={6}>
            <a href={`/category/${categoryName}`}>
                <Card variant="outlined">
                    <CardContent style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "120px", backgroundImage: (backgroundImage !== "" && `url(${backgroundImage})`) }}>
                        <Typography gutterBottom variant="h5" style={{backgroundColor:"#fff", opacity: "0.9", padding: "10px"}} component="div">{category.name}</Typography>                
                    </CardContent>
                </Card>
            </a>
        </Grid>
    );

}

export default CategoryItem;