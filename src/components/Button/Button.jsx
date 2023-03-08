import React from "react";

function Button(props) {
  return (
    <button type="button" className="btn btn-dark">
      {props.text}
    </button>
  );
}
export default Button;
