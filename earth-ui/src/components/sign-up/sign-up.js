import { Auth } from "aws-amplify";
import React, { Component } from "react";
import LoaderButton from "../../shared/loader-button/loader-button";
import "./sign-up.scss";


class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "dustinbelliston@gmail.com",
      password: "Password1!",
      confirmPassword: "Password1!",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <div>
          <label htmlFor="confirmationCode">Confirmation Code</label>
          <input
            name="confirmationCode"
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <p>Please check your email for the code.</p>
        </div>

        <LoaderButton
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="text"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </div>

        <LoaderButton
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing in…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="app-container">
        <div className="signup-form">
          <div className="Signup">
            {this.state.newUser === null
              ? this.renderForm()
              : this.renderConfirmationForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpComponent;
