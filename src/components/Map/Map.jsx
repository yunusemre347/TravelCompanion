import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";
import {
  GoogleMap,
  useLoadScript,
  OverlayViewF,
  OVERLAY_MOUSE_TARGET,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import mapStyles from "./mapStyles";

import useStyles from "./styles";

const Map = ({
  setChildClicked,
  setBounds,
  bounds,
  places,
  coordinates,
  setCoordinates,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [mapref, setMapRef] = useState(null);
  const [initCoordinates, setInitCoordinates] = useState({});

  //get location of user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        setInitCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  //default bounds for first fetch since we cant get bounds from geolocation. i know it is hacky. i will work on it.
  useEffect(() => {
    if (Object.keys(coordinates).length !== 0) {
      setBounds({
        ne: {
          lat: coordinates.lat + 0.031,
          lng: coordinates.lng + 0.05,
        },
        sw: {
          lat: coordinates.lat - 0.031,
          lng: coordinates.lng - 0.05,
        },
      });
    }
  }, [initCoordinates]);

  //set new bounds as user moves on map
  const handleOnLoad = (map) => {
    setMapRef(map);
  };
  const handleCenterChanged = () => {
    if (mapref && mapref.getBounds()) {
      const newBounds = mapref.getBounds();
      setBounds({
        ne: { lat: newBounds.Ya.hi, lng: newBounds.Ia.hi },
        sw: { lat: newBounds.Ya.lo, lng: newBounds.Ia.lo },
      });
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="classes.mapContainer">
      <GoogleMap
        center={coordinates}
        defaultZoom={14}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        mapContainerClassName="map-container"
        onLoad={handleOnLoad}
        onCenterChanged={handleCenterChanged}
      >
        {places?.map((place, i) => (
          <OverlayViewF
            position={{
              lat: Number(place.latitude),
              lng: Number(place.longitude),
            }}
            mapPaneName={OVERLAY_MOUSE_TARGET}
            key={i}
          >
            <div className={classes.markerContainer}>
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  className={classes.paper}
                  onClick={(e) => {
                    setChildClicked(i);
                  }}
                >
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    alt={place.name}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          </OverlayViewF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
