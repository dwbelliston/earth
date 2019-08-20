import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink exact to="/" activeClassName="is-active">
              <h1>square earth</h1>
            </NavLink>
            <div className="app-header__items">
              <i className="fas fa-search" />
            </div>
          </div>
        </header>
      )
    );
  }
}

export default AppHeader;
