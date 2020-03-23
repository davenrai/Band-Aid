import React, { Component } from 'react'

export default class Signup extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="login.css" />
        <title>Sign-Up</title>
        <div id="header"> 
          <img className="appLogo" src="./images/logo.png" />
        </div>
        <div id="title">
          Sign Up
        </div>
        <input id="username" type="text" placeholder="Username" />
        <input id="password" type="text" placeholder="Password" />
        <input id="typeOfUser" type="text" placeholder="Restaurant or Performer?" />
        <input id="Age" type="text" placeholder="Age" />
        <input id="email" type="text" placeholder="Email" />
        <button id="signup" onclick="location.href = './make_profile.html'">Sign Up</button>
      </div>
    );
  }
}
