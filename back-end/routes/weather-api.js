const fetch = require("node-fetch");
require("dotenv").config();

const apiKey = process.env.OPEN_WEATHER_API_KEY;

const getWeather = (req, res) => {
  const { locationEntry } = req.query;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${locationEntry}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).json("error getting forcast");
    });
};

const getForcast = (req, res) => {
  const { lat, lon } = req.query;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).json("error getting forcast");
    });
};

module.exports = {
  getWeather,
  getForcast,
};
