import React, { Component, Fragment } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import SearchField from "./components/SearchField/SearchField";
import UnitToggle from "./components/UnitToggle/UnitToggle";
import Forcast from "./components/Forcast/Forcast";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationEntry: "",
      weatherData: {},
      forcast: [],
      isCelsius: true,
      isValidlocation: true,
    };
  }

  onToggleClick = () => {
    this.setState((currentState) => ({
      isCelsius: !currentState.isCelsius,
    }));
  };

  onInputChange = (event) => {
    this.setState({ locationEntry: event.target.value });
  };

  onEnter = (e) => {
    if (e.which === 13) {
      this.onLocationSubmit();
    }
  };

  onLocationSubmit = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.locationEntry}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    ).then((res) => {
      if (res.ok) {
        this.setState({ isValidlocation: true });
        return res
          .json()
          .then((data) => {
            this.setState({ weatherData: data });
            return fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
            );
          })
          .then((res) => res.json())
          .then((data) => {
            this.setState({ forcast: data.daily });
          });
      } else {
        this.setState({ isValidlocation: false });
      }
    });
  };

  render() {
    const {
      locationEntry,
      weatherData,
      isCelsius,
      forcast,
      isValidlocation,
    } = this.state;
    return (
      <div className="background">
        {Object.keys(this.state.weatherData).length === 0 &&
        this.state.isValidlocation ? (
          <div className="empty-state">
            <h1>Enter a location to see the weather forcast</h1>
            <SearchField
              onInputChange={this.onInputChange}
              onLocationSubmit={this.onLocationSubmit}
              onEnter={this.onEnter}
              locationEntry={locationEntry}
            />
          </div>
        ) : (
          <Fragment>
            <div className="nav-bar">
              <div className="search-bar">
                <SearchField
                  onInputChange={this.onInputChange}
                  onLocationSubmit={this.onLocationSubmit}
                  onEnter={this.onEnter}
                  locationEntry={locationEntry}
                />
              </div>
              <UnitToggle onToggleClick={this.onToggleClick} />
            </div>
            {isValidlocation ? (
              <div className="weather-container">
                <CurrentWeather
                  weatherData={weatherData}
                  isCelsius={isCelsius}
                />
                <Forcast forcastData={forcast} isCelsius={isCelsius} />
              </div>
            ) : (
              <div className="empty-state">
                <h1>Unable to find that location</h1>
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
