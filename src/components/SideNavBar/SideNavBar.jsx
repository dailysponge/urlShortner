import React from "react";
import "./SideNavBar.css";
import PopUp from "../PopUp/PopUp";

function SideNavBar(props) {
  return (
    <nav className="nav flex-column pt-2 sidebar " id="sideNavBar">
      <PopUp setUpdateData={props.setUpdateData} />
      <a className="nav-link active text-center" aria-current="page" href="#">
        Home
      </a>
    </nav>
  );
}
export default SideNavBar;
