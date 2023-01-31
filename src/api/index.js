import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

  try {
    //Get request  by type and coordination.
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    //if request fails...
    console.log(error);
  }
  console.log("fetch");
};
