import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import UrlDetails from "../../components/UrlDetails/UrlDetails";
import Radio from "../../components/Radio/Radio";
import Alert from "../../components/Alert/Alert";

const Home = () => {
  const [urlData, setUrlData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [sortType, setSortType] = useState("created");
  const [alertVisible, setAlertVisible] = useState(false);
  const [urlClicked, setUrlClicked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/?sortType=${sortType}`).then((res) => {
      let data = res.data.data;
      setUrlData(data.url);
    });
  }, [updateData, sortType, urlClicked]);

  const handleDeleteUrl = (shortUrlId) => {
    axios
      .delete(`http://localhost:3001/${shortUrlId}`)
      .then((res) => {
        setUpdateData((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortType(value);
    setAlertVisible(true);
  };

  const handleUrlClicked = () => {
    setUrlClicked((prevState) => !prevState);
  };

  return (
    <div>
      <Header />
      {alertVisible && (
        <Alert
          status={"success"}
          message={"Sorted by " + sortType}
          onDismiss={() => setAlertVisible(false)}
        />
      )}
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-sm-12 col-lg-3 border-end">
            <SideNavBar setUpdateData={setUpdateData} />
          </div>
          <div className="col-sm-12 col-lg-9">
            {urlData.length === 0 ? (
              <h2 className="mt-5 text-center">
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                No short URL created yet!
              </h2>
            ) : (
              <React.Fragment>
                <div className="row pt-2">
                  <Radio
                    label={"Created Date"}
                    sort={"created"}
                    onChange={handleSort}
                  />
                  <Radio
                    label={"Most Popular"}
                    sort={"popular"}
                    onChange={handleSort}
                  />
                </div>
                <div className="row">
                  {urlData.map(
                    (
                      { originalUrl, shortUrlId, createdAt, numberOfClicks },
                      index
                    ) => {
                      return (
                        <UrlDetails
                          key={index}
                          originalUrl={originalUrl}
                          shortUrlId={shortUrlId}
                          createdAt={createdAt}
                          numberOfClicks={numberOfClicks}
                          handleDeleteUrl={handleDeleteUrl}
                          handleUrlClicked={handleUrlClicked}
                        />
                      );
                    }
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
