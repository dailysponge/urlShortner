import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import UrlDetails from "../../components/UrlDetails/UrlDetails";

const Home = () => {
  const [urlData, setUrlData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      let data = res.data.data;
      setUrlData(data.url);
    });
  }, [updateData]);

  const handleToggle = () => {
    setCollapse(!collapse);
  };

  const handleDeleteUrl = (shortUrlId) => {
    axios
      .delete(`http://localhost:3001/${shortUrlId}`)
      .then((res) => {
        console.log(res.data);
        setUpdateData((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header onToggle={handleToggle} />
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className={`col-sm-${collapse ? "0" : "3"} col-lg-3 border-end`}>
            <SideNavBar setUpdateData={setUpdateData} />
          </div>
          <div className="col-sm-12 col-lg-9">
            {urlData.length === 0 ? (
              <h2 className="mt-5 text-center">
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                No short URL created yet!
              </h2>
            ) : (
              <div className="row">
                {urlData.map(({ originalUrl, shortUrlId, createdAt }, index) => {
                  return (
                    <UrlDetails
                      key={index}
                      originalUrl={originalUrl}
                      shortUrlId={shortUrlId}
                      createdAt={createdAt}
                      handleDeleteUrl={handleDeleteUrl}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;