import React, { Fragment } from "react";
import { tempConverter, weatherIcon } from "../../util";
import "./Forcast.css";

const Forcast = ({ forcastData, isCelsius }) => {
  const dateOptions = { weekday: "short" };
  return (
    <Fragment>
      <h1 className="center">Forcast</h1>
      <div className="forcast center">
        {forcastData.map((day) => {
          let date = new Date(day.dt * 1000);
          let weekday = Intl.DateTimeFormat("en-US", dateOptions).format(date);
          let icon = weatherIcon(day.weather[0].main);
          return (
            <div className="forcast-card">
              <h1>{weekday}</h1>
              <div className="forcast-main">
                <h3>{day.weather[0].main}</h3>
              </div>
              <img
                src={require(`../../weather-icons/${icon}.svg`)}
                alt={`Image for ${day.weather[0].main}`}
              ></img>
              <div className="forcast-temp">
                <h2>{tempConverter(isCelsius, day.temp.day)}°</h2>
              </div>
              <div>
                <h6>
                  Feels Like: {tempConverter(isCelsius, day.feels_like.day)}°
                </h6>
                <h6>Humidity: {day.humidity}%</h6>
                <h6>Min: {tempConverter(isCelsius, day.temp.min)}°</h6>
                <h6>Max: {tempConverter(isCelsius, day.temp.max)}°</h6>
                <h6>Pressure: {day.pressure}hPa</h6>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Forcast;
