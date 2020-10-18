const request = require("postman-request");

// Geocoding
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZ29uemFsbzkzeHgiLCJhIjoiY2tnNHN2ZHBrMG5zMDJzcDlramd6MHp5aSJ9.XmB9fVEitYpZ_vazp0euWg&limit=1&language=es";
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to API", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      const { features } = body;
      const feature = features[0];
      callback(undefined, {
        coordinates: feature.center,
        place: feature.place_name,
      });
    }
  });
};

module.exports = geocode;
