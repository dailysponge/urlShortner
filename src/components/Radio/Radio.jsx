import React from "react";

function Radio({ label, name, onChange }) {
  return (
    <div className="col-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id={name}
          value={name}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default Radio;
