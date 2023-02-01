import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Card elevation={6} id="card">
           <div className="card-content">
      <div className="image-wrapper"> 
      <CardMedia
       className="place-list-image" 
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      </div>
 
      <CardContent className={classes.cardcontent}>
        <Typography  className={classes.placeTitle} variant="h5">
          {place.name}
        </Typography>

        <Box className={classes.rating} display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography   variant="subtitle1">
            out of {place.num_reviews ? place.num_reviews : "0"} reviews{" "}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography  className={classes.description} variant="subtitle1">Ranking</Typography>
          <Typography  className={classes.description}  variant="subtitle1">
            {place.ranking ? place.ranking : "No ranking"}{" "}
          </Typography>
        </Box>

        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.diplay_name}
              className={classes.description}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            
            variant="subtitle2"
            color="textSecondary"
           // className={classes.subtitle}
            className={classes.description}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            
            className={classes.description}
            variant="subtitle2"
            color="textSecondary"
           // className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
      </div>
    </Card>
  );
};
export default PlaceDetails;
