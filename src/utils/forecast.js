const request = require("postman-request");

const forecast = (coordinates, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f88ae55f9ab3c97ff3944a6ceafb1a68&query=${coordinates[1]},${coordinates[0]}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to API", undefined);
    } else if (body.error) {
      callback("Unable to find the locaation", undefined);
    } else {
      const { current } = body;
      callback(
        undefined,
        `${current.weather_descriptions[0]}. La temperatura actual es ${current.temperature}, con preciítación de ${current.precip}`
      );
    }
  });
};

module.exports = forecast;
