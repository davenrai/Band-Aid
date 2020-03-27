import React from 'react';
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button'

import './styles.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="home__bg-image center"></div>
                <Link className="home_button center" to={"./../Login"}>
                    <Button variant="contained" className="home_button"> <h1>Enter Band-Aid</h1> </Button>
                </Link>
            </div>
        )
    }
}

export default Home;
