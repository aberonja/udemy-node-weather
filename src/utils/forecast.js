const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=faf2e437f8450a8f59965c91261fd8fe&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }, { current } = {}) => {
    if (error) {
      return callback("Unable to connect to weather service!");
    }

    if (body.error) {
      return callback(body.error.info || "Unable to find location!");
    }

    console.log(current)

    callback(
      undefined,
      `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. UV index is ${current.uv_index} and wind speed is ${current.wind_speed}.`
    );
  });
};

module.exports = forecast;
