import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppFooter from "./components/app-footer/app-footer";
import AppHeader from "./components/app-header/app-header";
import Topics from "./components/topics/topics";
import Routes from "./Routes";
import "./styles/index.scss";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {

    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        console.log("Failed to load user");
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  userLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="app">
        <AppHeader {...childProps} userLogout={this.userLogout} />
        <Topics></Topics>
        <div className="main">
          <Routes childProps={childProps} />
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(App);

