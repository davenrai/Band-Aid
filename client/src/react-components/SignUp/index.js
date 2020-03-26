import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom"

// Importing actions/required methods
import { updateLoginForm, register } from "../../actions/user";

import "./styles.css";
import { TextField } from "@material-ui/core";

/* Component for the SignUp Form */
class SignUp extends React.Component {

    // student form state
    state = {
        username: "",
        password: ""
    }

    render() {
        const { app } = this.props;

        return (
            <div>
                
                <h1>Signup Page</h1>
                <br /> 
                <br />

                <form>
                        <span id="input">
                            <TextField onChange={e => updateLoginForm(this, e.target)} name="username" label="Username" id="username" variant="filled" required type="username"></TextField>
                            <TextField onChange={e => updateLoginForm(this, e.target)} name="password" label="Password" id="password" type="password" variant="filled" required></TextField>
                        </span>

                    </form>
                    <br />
                    <br />
                    <Link>
                        <Button onClick={() => register(this, app)} color="primary" variant="contained">Sign Up!</Button>
                    </Link>

            
            
            
            </div>
        );
    }
}

export default SignUp;
