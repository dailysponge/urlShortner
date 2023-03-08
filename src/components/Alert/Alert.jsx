import React, { useEffect } from "react";
import "./Alert.css";

function Alert(props) {
  useEffect(() => {
    if (props.onDismiss) {
      const timer = setTimeout(() => {
        props.onDismiss();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [props.onDismiss]);

  return (
    <div
      className={`alert alert-${props.status} d-flex align-items-center position-fixed top-0 mt-3 start-50 translate-middle-x`}
      role="alert"
    >
      <div>{props.message}</div>
    </div>
  );
}

export default Alert;
