import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import Alert from "../Alert/Alert";

import "./PopUp.css";

function PopUp(props) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateUrl = () => {
    setAlert({ status: "info", message: "Checking if your url is valid..." });
    setIsLoading(true);
    axios
      .post("http://localhost:3001", { originalUrl })
      .then((res) => {
        props.setUpdateData((prevState) => !prevState);
        setIsLoading(false);
        setOriginalUrl("");
        handleClose();
        setAlert({ status: "success", message: "Url created successfully!" });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setAlert({
          status: "danger",
          message: `Url failed to create because ${err.response.data}`,
        });
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreateUrl();
    }
  };

  const handleAlertDismiss = () => {
    setAlert(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button variant="dark" onClick={handleShow}>
          Create New Url
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create your short Url!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            id="original-url-input"
            placeholder="Original Url e.g. www.google.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isLoading && (
            <div className="d-flex justify-content-center mt-2">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={handleCreateUrl}
            disabled={!originalUrl}
          >
            Create Url
          </Button>
        </Modal.Footer>
      </Modal>
      {alert && (
        <Alert
          status={alert.status}
          message={alert.message}
          onDismiss={handleAlertDismiss}
        />
      )}
    </div>
  );
}

export default PopUp;
