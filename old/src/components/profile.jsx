import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
        <div>
          <meta charSet="utf-8" />
          <title> My Profile </title>
          <link rel="stylesheet" type="text/css" href="./css/profile.css" />
          <div id="header"> 
            <img className="appLogo" src="./images/logo.png" />
            <a className="headerLink" href="index.html">Log Out</a>
            <a className="headerLink" href="timeline.html">Timeline</a>
          </div>
          <h1> <u>Band Profile</u></h1>
          <img className="profilePic" src="./images/profilepic.png" /> 
          <iframe id="spotify" src="https://open.spotify.com/embed/album/31qVWUdRrlb8thMvts0yYL" allowTransparency="true" allow="encrypted-media" width={300} height={380} frameBorder={0} />
          <div id="profileInfo">
            <b>Name: </b> Tame Impala <br />
            <b>Members:</b> Kevin Parker, Jay Watson, Cam Avery, Dominic Simper, Julien Barbagallo <br />
            <b>Genre:</b> Psychedelic rock, Psychedelic pop, Neo-psychedelia <br />
            <b>Location:</b> Perth, Australia  
          </div>
        </div>
      );
  }
}
