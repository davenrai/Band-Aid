import React from 'react';
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import './styles.css'
import logo from './static/logo_transparent.png'

class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="logoContainer">
                    <img alt={"logo"} src={logo}></img>
                </div>

                <div className="form">
                    <h1>Welcome to Band-Aid.</h1>
                    <p>Toronto's First Venue-to-Musician Marketplace</p>
                    <br />
                    <span id="input">
                        <TextField label="Username" id="userField" variant="filled"></TextField>
                        <TextField label="Password" id="passwordField" variant="filled"></TextField>
                    </span>
                    <br />
                    <br />
                    <Button variant="contained">Login</Button>
                </div>


            </div>
        )
    }
}

export default Login;
