const express = require("express");
const weather = require("./routes/weather-api");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working!");
});

app.get("/weather", (req, res) => {
  weather.getWeather(req, res);
});

app.get("/forcast", (req, res) => {
  weather.getForcast(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.port}`);
});
