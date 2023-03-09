import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import QrCode from "../QrCode/QrCode";

function UrlDetails(props) {
  const [elapsedTime, setElapsedTime] = useState("");
  const shortUrl = `http://localhost:3001/${props.shortUrlId}`;

  let timeDifference = Math.floor((new Date() - new Date(props.createdAt)) / (1000 * 60 * 60 * 24));

  const handleDeleteUrl = () => {
    props.handleDeleteUrl(props.shortUrlId);
  };

  const handleClick = () => {
    axios.patch(`http://localhost:3001/${props.shortUrlId}`).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    switch (timeDifference) {
      case 0:
      case 1:
        setElapsedTime("One day ago");
        break;
      default:
        setElapsedTime(`${timeDifference} days ago`);
    }
  }, [timeDifference]);

  return (
    <div className="mt-2 container ">
      <div className="row">
        <div className="col-lg-10 col-md-12 shadow p-3 mb-5 bg-body-tertiary rounded position-relative  border-top">
          <span className="position-absolute top-0 end-0 mt-2 me-2">
            <button className="btn btn-sm btn-danger " onClick={handleDeleteUrl}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </span>
          <div className="row">
            <div className="col-sm-8 col-12">
              <div className="row">
                <h3 style={{ wordBreak: "break-all" }}>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                  >
                    http://localhost:3001/{props.shortUrlId}
                  </a>
                </h3>
                <p className="fw-light">{props.originalUrl}</p>
              </div>
              <div className="row">
                <p className="fw-light mb-0">Created {elapsedTime}</p>
              </div>
            </div>
            <div className="col-sm-4 col-12 text-end pe-5">
              <QrCode shortUrl={shortUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlDetails;
