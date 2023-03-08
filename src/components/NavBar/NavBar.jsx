import React from "react";
import "./NavBar.css";

function Header() {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 ps-3 fs-6" href="#">
        URL Shortener
      </a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap"></div>
      </div>
    </header>
  );
}

export default Header;
