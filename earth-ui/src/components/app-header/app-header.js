import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Intro from "../intro/intro";
import "./app-header.scss";

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: props.isAuthenticated,
      userHasAuthenticated: props.userHasAuthenticated,
      userLogout: props.userLogout
    };
  }

  handleLogout = event => {
    this.state.userLogout();
  };

  render() {
    return (
      !this.state.isAuthenticating && (
        <header className="app-header-container">
          <div className="app-container app-header">
            <div className="square">
              <NavLink exact to="/" activeClassName="is-active">
                <h1>square earth</h1>
              </NavLink>
            </div>
            <div>
              <Intro />
            </div>
          </div>
        </header>
      )
    );
  }
}

export default AppHeader;
