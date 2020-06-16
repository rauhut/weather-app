import React from "react";
import "./SearchField.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
      {!promiseInProgress && <span>Search</span>}
      {promiseInProgress && (
        <Loader type="ThreeDots" color="#335561" height="10" width="40" />
      )}
    </div>
  );
};

const SearchField = ({
  onInputChange,
  onLocationSubmit,
  onEnter,
  locationEntry,
}) => {
  return (
    <div className="search-field" onKeyPress={onEnter}>
      <input
        aria-label="Search Location"
        type="text"
        placeholder="Search for location"
        onChange={onInputChange}
      />
      <button onClick={onLocationSubmit} disabled={locationEntry === ""}>
        <LoadingIndicator />
      </button>
    </div>
  );
};

export default SearchField;
