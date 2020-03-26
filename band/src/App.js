import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import Login from './react-components/Login';

import { readCookie } from "./actions/user";
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
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (<Home />)} />
            <Route exact path='/login' render={() => (<Login />)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
