import React from "react";
import logo from "./static/logo.png"

import "./styles.css";

/* Component for the Home page */
class Header extends React.Component {
  render() {

    return (
      <div className="header">
        <h1>Band-Aid</h1>
        <img src={logo}></img>
      </div>
    );
  }
}

export default Header;