import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ onToggleClick }) => {
  return (
    <div className="unit-toggle">
      <h3>C°</h3>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onClick={onToggleClick}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      <h3>F°</h3>
    </div>
  );
};

export default UnitToggle;
