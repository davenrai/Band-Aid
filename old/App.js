import React, { Component } from 'react';
import './App.css';
import './css/admin.css'
import './css/index.css'
import './css/login.css'
import './css/profile.css'
import './css/signup.css'

// import Sidebar from './components/sidebar'
import Signup from './components/signup'
import Index from './components/index'
// import About from './components/about'
// import Timeline from './components/timeline'
import Admin from './components/admin';
import Profile from './components/profile';


class App extends Component {
  render() {
    return (
      <div id="page">
        <div id="container">
         	{/* <Sidebar></Sidebar> */}
				<div id="main">
					{/* <Signup></Signup> */}
          {/* <Index></Index> */}
          {/* <Admin></Admin> */}
          <Profile></Profile>
					{/* <About></About> */}
					{/* <Timeline></Timeline> */}
          	</div>
      	</div>
      </div>
    );
  }
}

export default App;
