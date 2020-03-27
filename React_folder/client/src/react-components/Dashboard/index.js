import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom"


//import "./styles.css";
import { TextField } from "@material-ui/core";

/* Component for the SignUp Form */
class Dashboard extends React.Component {

    // student form state
    state = {
        username: "",
        password: ""
    }
    render() {
        const { app } = this.props;

        return (
            <div>
                <h1>Dashboard</h1>
            
            </div>
        );
    }
}

export default Dashboard;
