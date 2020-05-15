import React from "react";
import "./SearchField.css";

const SearchField = ({ onInputChange, onLocationSubmit, onEnter }) => {
  return (
    <div className="search-field" onKeyPress={onEnter}>
      <input
        type="text"
        placeholder="Search for location"
        onChange={onInputChange}
      />
      <button onClick={onLocationSubmit}>Search</button>
    </div>
  );
};

export default SearchField;
