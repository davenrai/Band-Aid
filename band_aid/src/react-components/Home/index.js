import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";
import Header from "../Header";

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div className="home__bg-image center">
          <Header />
          <p>Welcome to Band-Aid! We are an online community hub that aims to connect venues with casual performers. Check us out!</p>
        <div className="buttons center">
        <Link className ="home__button-link" to={"./../login"}>
          <Button className="home__button">Login</Button>
        </Link> 
        <Link className ="home__button-link" to={"./../signup"}>
          <Button className="home__button">Sign-Up</Button>
        </Link> 
        <Link className ="home__button-link" to={"./../admin"}>
          <Button className="home__button">Admin Login</Button>
        </Link> 
        </div>
      </div>
    );
  }
}

export default Home;
