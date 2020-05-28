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

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

export const setIsCelsius = () => ({
  type: TOGGLE_TEMP_UNIT,
});

export const submitLocation = (locationEntry) => (dispatch) => {
  dispatch({ type: REQUEST_WEATHER_PENDING });
  fetch(`http://localhost:3000/weather?locationEntry=${locationEntry}`, {
    method: "get",
    header: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        dispatch({ type: LOCATION_IS_VALID });
        return res.json().then((data) => {
          if (data.cod === "404") {
            dispatch({ type: LOCATION_IS_INVALID });
          } else {
            dispatch({ type: REQUEST_WEATHER_SUCCESS, payload: data });
            dispatch({ type: REQUEST_FORCAST_PENDING });
            return fetch(
              `http://localhost:3000/forcast?lat=${data.coord.lat}&lon=${data.coord.lon}`,
              {
                method: "get",
                header: { "Content-Type": "application/json" },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                dispatch({
                  type: REQUEST_FORCAST_SUCCESS,
                  payload: data.daily,
                });
              })
              .catch((error) =>
                dispatch({ type: REQUEST_FORCAST_FAILED, payload: error })
              );
          }
        });
      } else {
        dispatch({ type: LOCATION_IS_INVALID });
      }
    })
    .catch((error) =>
      dispatch({ type: REQUEST_WEATHER_FAILED, payload: error })
    );
};
