const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const publicDir = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Gonzalo Mendoza",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  const error = "You must provide an address";
  if (!address) {
    return res.send({
      error,
    });
  }
  geocode(address, (error, { place, coordinates } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    } else {
      forecast(coordinates, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          res.send({
            forecast: forecastData,
            location: place,
            address,
          });
        }
      });
    }
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search temr",
    });
  }
  res.send({
    products: [],
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
