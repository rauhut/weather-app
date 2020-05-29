import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import SearchField from "./components/SearchField/SearchField";
import UnitToggle from "./components/UnitToggle/UnitToggle";
import Forcast from "./components/Forcast/Forcast";
import "./App.css";
import { setSearchField, setIsCelsius, submitLocation } from "./actions";

const mapStateToProps = (state) => {
  return {
    locationEntry: state.searchInput.locationEntry,
    isCelsius: state.toggleTempUnit.isCelsius,
    weatherData: state.getWeatherData.weatherData,
    forcast: state.getWeatherData.forcast,
    isValidlocation: state.getWeatherData.isValidLocation,
    isPending: state.getWeatherData.isPending,
    error: state.getWeatherData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(setSearchField(event.target.value)),
    onToggleClick: () => dispatch(setIsCelsius()),
    onRequestWeather: (locationEntry) =>
      dispatch(submitLocation(locationEntry)),
  };
};

class App extends Component {
  onLocationSubmit = () => {
    this.props.onRequestWeather(this.props.locationEntry);
  };

  onEnter = (e) => {
    if (e.which === 13 && this.props.locationEntry !== "") {
      this.onLocationSubmit();
    }
  };

  render() {
    console.log(this.props);
    const {
      locationEntry,
      onInputChange,
      isCelsius,
      onToggleClick,
      weatherData,
      forcast,
      isValidlocation,
    } = this.props;
    return (
      <div className="background">
        {Object.keys(weatherData).length === 0 && isValidlocation ? (
          <div className="empty-state">
            <h1>Enter a location to see the weather forcast</h1>
            <SearchField
              onInputChange={onInputChange}
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
                  onInputChange={onInputChange}
                  onLocationSubmit={this.onLocationSubmit}
                  onEnter={this.onEnter}
                  locationEntry={locationEntry}
                />
              </div>
              <UnitToggle onToggleClick={onToggleClick} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
