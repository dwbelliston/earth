import React, { Component } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "../../shared/loader-button/loader-button";
import "./change-password.scss";

export default class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      oldPassword: "",
      isChanging: false,
      confirmPassword: ""
    };
  }

  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeClick = async event => {
    event.preventDefault();

    this.setState({ isChanging: true });

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        this.state.oldPassword,
        this.state.password
      );

      this.props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      this.setState({ isChanging: false });
    }
  };

  render() {
    return (
      <div className="ChangePassword">
        <form onSubmit={this.handleChangeClick}>
          <div>
            <label htmlFor="oldPassword">Current Password</label>
            <input
              name="oldPassword"
              type="text"
              value={this.state.oldPassword}
              onChange={this.handleChange}
            />
          </div>
          <hr />
          <div>
            <label htmlFor="password">New Password</label>
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
            type="submit"
            text="Change Password"
            loadingText="Changing…"
            disabled={!this.validateForm()}
            isLoading={this.state.isChanging}
          />
        </form>
      </div>
    );
  }
}
