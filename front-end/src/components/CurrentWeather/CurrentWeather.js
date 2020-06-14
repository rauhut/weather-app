import React from "react";
import { tempConverter, weatherIcon } from "../../util.js";
import "./CurrentWeather.css";

const CurrentWeather = ({ weatherData, isCelsius, forcastData }) => {
  const weatherType = weatherData.weather[0].main;
  const icon = weatherIcon(weatherType);
  const timeZoneOffset = forcastData.timezone_offset;
  const shortenedHourlyForcast = forcastData.hourly
    .slice(0, 24)
    .filter((x, i) => i % 2);
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
                src={require(`../../weather-icons/${icon}.svg`)}
                alt={`${weatherType}`}
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
        <div className="hourly-forcast">
          <details>
            <summary>View Hourly Forcast</summary>
            {shortenedHourlyForcast.map((hour) => {
              let date = new Date((hour.dt + timeZoneOffset + 14400) * 1000);
              let hourNum = date.getHours() % 12 || 12;
              let hourlyIcon = weatherIcon(hour.weather[0].main);
              return (
                <div key={hour.dt.toString()} className="hourly-forcast-row">
                  <div className="hourly-time">
                    <h6>
                      {hourNum}:00 {date.getHours() >= 12 ? "PM" : "AM"}
                    </h6>
                  </div>
                  <div className="hourly-weather-icon">
                    <img
                      src={require(`../../weather-icons/${hourlyIcon}.svg`)}
                      alt={`${hour.weather[0].main}`}
                    ></img>
                  </div>
                  <div className="hourly-temp">
                    <h6>{tempConverter(isCelsius, hour.temp)}°</h6>
                  </div>
                </div>
              );
            })}
          </details>
        </div>
      </center>
    </div>
  );
};

export default CurrentWeather;
