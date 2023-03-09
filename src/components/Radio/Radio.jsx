import React from "react";

function Radio({ label, sort, onChange }) {
  return (
    <div className="col-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id={sort}
          value={sort}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={sort}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default Radio;
