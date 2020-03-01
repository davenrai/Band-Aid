import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import "./styles.css";
import Header from "../Header";

/* Component for the Home page */
class Login extends React.Component {
  render() {
    return (
      <div className="home__bg-image center">
          <Header />
          <h1>Login</h1>
          <form className="forms center" autoComplete="off">
                <TextField id="username" label="Username" variant="filled" />
                <TextField id="password" label="Password" variant="filled" />
            </form>
          <div className="buttons center">
        <Link className ="submit__button-link" to={"./../timeline"}>
          <Button className="home__button">submit</Button>
        </Link> 
        </div>
      </div>
    );
  }
}

export default Login;