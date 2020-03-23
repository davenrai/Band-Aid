import React from "react";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Login from "./react-components/Login";
import Dashboard from "./react-components/Dashboard";

import { readCookie } from "./actions/user";

import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
    }

    // global state passed down includes the current logged in user.
    state = {
        currentUser: null
    }

    render() {
        const { currentUser } = this.state;

        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path={["/", "/login", "/dashboard"] /* any of these URLs are accepted. */ }
                        render={({ history }) => (
                            <div className="app">
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <Login history={history} app={this} /> : <Dashboard history={history} app={this} />}
                                }
                            </div>
                            
                        )}
                    />

                    { /* 404 if URL isn't expected. */}
                    <Route render={() => <div>404 Not found</div>} />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
