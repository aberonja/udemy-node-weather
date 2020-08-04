const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmV4YWNhIiwiYSI6ImNrYzBhNXVmZzA2bDMyemxrM3pnMTNwY3oifQ.yttekO1fp-haoBpeiA58ag&limit=1`;

  request({ url, json: true }, (error, { body }, { features } = {}) => {
    if (error) {
      return callback("Unable to connect to weather service!");
    }

    if (body.message) {
      return callback(body.message || "Unable to find location!");
    }

    if (!features.length) {
      return callback(
        "Unable to find location, try again with different search params!"
      );
    }

    const lat = features[0].center[1];
    const long = features[0].center[0];

    callback(undefined, { lat, long, place: features[0].place_name });
  });
};

module.exports = geocode;
