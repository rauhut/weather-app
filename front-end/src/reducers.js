import {
  CHANGE_SEARCH_FIELD,
  TOGGLE_TEMP_UNIT,
  REQUEST_WEATHER_PENDING,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILED,
  REQUEST_FORCAST_PENDING,
  REQUEST_FORCAST_SUCCESS,
  REQUEST_FORCAST_FAILED,
  LOCATION_IS_VALID,
  LOCATION_IS_INVALID,
} from "./constants";

const initialStateSearch = {
  locationEntry: "",
};

export const searchInput = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { locationEntry: action.payload });
    default:
      return state;
  }
};

const initialStateTempUnit = {
  isCelsius: true,
};

export const toggleTempUnit = (state = initialStateTempUnit, action = {}) => {
  switch (action.type) {
    case TOGGLE_TEMP_UNIT:
      return Object.assign({}, state, { isCelsius: !state.isCelsius });
    default:
      return state;
  }
};

const initialStateWeatherData = {
  isValidLocation: true,
  weatherData: {},
  forcast: [],
  isPending: false,
  error: "",
};

export const getWeatherData = (
  state = initialStateWeatherData,
  action = {}
) => {
  switch (action.type) {
    case LOCATION_IS_INVALID:
      return Object.assign({}, state, { isValidLocation: false });
    case LOCATION_IS_VALID:
      return Object.assign({}, state, { isValidLocation: true });
    case REQUEST_WEATHER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_WEATHER_SUCCESS:
      return Object.assign({}, state, {
        weatherData: action.payload,
        isPending: false,
      });
    case REQUEST_WEATHER_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    case REQUEST_FORCAST_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_FORCAST_SUCCESS:
      return Object.assign({}, state, {
        forcast: action.payload,
        isPending: false,
      });
    case REQUEST_FORCAST_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
