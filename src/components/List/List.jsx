import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useMediaQuery
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import { useState, useEffect, createRef } from "react";
import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();
  const [elementRefs, setElementRefs] = useState([]);

  const isDesktop = useMediaQuery("(min-width:950px)")

  //map through the response to create a grid for left side.
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elementRefs[i] || createRef());
    setElementRefs(refs);
  }, [places]);

  return (
    <div className={classes.container} id="list-container">

      <Typography className={classes.title} variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
 
      {isLoading ? (
        <div className={classes.loading}>
          {" "}
          <CircularProgress size="5rem" />{" "}
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list} id="list-element">
            {places?.map((place, i) => (
              <Grid ref={elementRefs[i]} className={classes.grid} item key={i}  xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) == i}
                  refProp={elementRefs[i]}
                  i={i}
                  childClicked={childClicked}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
export default List;
