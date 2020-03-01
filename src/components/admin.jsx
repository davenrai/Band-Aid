import React, { Component } from 'react'

export default class Admin extends Component {
  render() {
        return (
          <div>
            <meta charSet="utf-8" />
            <title>Timeline</title>
            <link rel="stylesheet" type="text/css" href="project.css" />
            <div id="header">
              <img className="appLogo" src="./images/logo.png" />
              <span id="title">Admin View</span>
              <a className="headerLink" href="index.html">Log Out</a>
              <a className="headerLink" href="my_profile.html">My Profile</a>
            </div>
            <div id="timeline">
              <div id="newRequest">
                <strong>Delete a User</strong>
                <form id="requestForm">
                  <input id="venueName" type="text" placeholder="Username" />
                  <textarea id="reqDesc" rows={2} cols={80} defaultValue={"Reason for Deletion."} /><br />
                  <input type="submit" defaultValue="Delete User" />
                </form>
              </div>
            </div>
          </div>
        );
  }
}
