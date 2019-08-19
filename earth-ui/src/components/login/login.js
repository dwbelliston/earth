import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoaderButton from "../../shared/loader-button/loader-button";
import "./login.scss";



class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "dustinbelliston@gmail.com",
      password: "Password1!"
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="app-container">
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <Link to="/login/reset">Forgot password?</Link>

            <LoaderButton
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in…"
            />
          </form>
          
        </div>

      </div>
    );
  }
}

export default LoginComponent;

