import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

// Importing actions/required methods
import { updateUserForm, addUser } from "../../actions/user";

import "./styles.css";

/* Component for the SignUp Form */
class SignUp extends React.Component {

    constructor() {
        super()


    }

        // user form state
        state = {
            name: "",
            password: ""
        }

    render() {
        const { app } = this.props;

        const { username, password } = this.state;

        return (



            <React.Fragment>
                        //************test */
            <div>
                <h3>
                    new testing
                </h3>
            </div>

                <Grid className="student-form" container spacing={4}>
                    {/* Inputs to add student */}
                    <Input
                        username="username"
                        value={username}
                        onChange={e => updateUserForm(this, e.target)}
                        label="username"
                    />

                    <Input
                        password="password"
                        value={password}
                        onChange={e => updateUserForm(this, e.target)}
                        label="password"
                    />

                    <Grid
                        className="student-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={12}
                        s={12}
                        xs={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addUser(this, app)}
                            className="student-form__submit-button"
                        >
                            Add USER
                        </Button>
                    </Grid>
                </Grid>

                <p className={`student-form__message--${app.state.message.type}`}>
                    {app.state.message.body}
                </p>
            </React.Fragment>
        );
    }
}

export default SignUp;
