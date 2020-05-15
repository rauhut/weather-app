import React from "react";
import { tempConverter, weatherIcon } from "../../util";
import "./CurrentWeather.css";

const CurrentWeather = ({ weatherData, isCelsius }) => {
  const weatherType = weatherData.weather[0].main;
  return (
    <div>
      <center>
        <h1>
          Weather for {weatherData.name}, {weatherData.sys.country}
        </h1>
        <div className="card">
          <div className="weather-main">
            <div className="weather-type">
              <h3>{weatherType}</h3>
              <img
                src={require(`../../weather-icons/${weatherIcon(
                  weatherType
                )}.svg`)}
                alt={`Image for ${weatherType}`}
              ></img>
              <h4>{weatherData.weather[0].description}</h4>
            </div>
            <div className="current-temp">
              <h2>{tempConverter(isCelsius, weatherData.main.temp)}°</h2>
            </div>
          </div>
          <div className="weather-details">
            <h6>Humidity: {weatherData.main.humidity}%</h6>
            <h6>
              Feels Like:{" "}
              {tempConverter(isCelsius, weatherData.main.feels_like)}°
            </h6>
            <h6>Pressure: {weatherData.main.pressure}hPa</h6>
            <h6>Max: {tempConverter(isCelsius, weatherData.main.temp_max)}°</h6>
            <h6>Min: {tempConverter(isCelsius, weatherData.main.temp_min)}°</h6>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CurrentWeather;
