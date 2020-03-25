import React from 'react';
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

import './styles.css'
import logo from './static/logo_transparent.png'

class Login extends React.Component {
    constructor() {
        // Where we initialize values
        super();
        this.state = {
                username: "", 
                password: ""
        }
    }
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
                    <form>
                        <span id="input">
                            <TextField label="Username" id="userField" variant="filled" required name="username" type="username"></TextField> 
                            <TextField label="Password" id="passwordField" variant="filled" required></TextField>
                        </span>
                    </form>
                    <br />
                    <br />
                    <Button type="submit" variant="contained">Login</Button>
                    <br />
                    <br />
                    <br></br>
                    <p>Not Registered? Sign up now!</p>
                    <Link>
                        <Button color="secondary" variant="contained">Sign Up!</Button>
                    </Link>
                </div>


            </div>
        )
    }
}

export default Login;
