import React, { Component } from 'react'

export default class Index extends Component {
  render() {
    return (
        <div>
          <link rel="stylesheet" href="index.css" />
          <title>Index</title>
          <div id="header"> 
            <img className="appLogo" src="./images/logo.png" />
          </div>
          <div id="title">
            Welcome to Band-Aid!
          </div>
          <div id="intro">
            Welcome to Band-Aid! We are an online community hub that aims to connect venues with casual performers. Check us out!
          </div>
          {/* <button id="loginButton" onclick="location.href = './login.html'" ;>Log In</button> */}
          <button id="signUpButton" onclick="location.href = './signup.html'">Sign Up</button>
          <button id="adminLogIn" onclick="location.href = './admin.html'">Admin Log In</button>
          <div className="loginclass">
            <img src="./images/musicnote.png" alt="musicnote" id="loginnote" />
          </div>
          <div className="signupclass">
            <img src="./images/musicnote2.png" alt="musicnote2" id="signupnote" />
          </div>
        </div>
      );
  }
}
