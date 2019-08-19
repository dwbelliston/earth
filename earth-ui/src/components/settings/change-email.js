import { Auth } from "aws-amplify";
import React, { Component } from "react";
import LoaderButton from "../../shared/loader-button/loader-button";
import "./change-email.scss";

export default class ChangeEmailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      codeSent: false,
      isConfirming: false,
      isSendingCode: false
    };
  }

  validatEmailForm() {
    return this.state.email.length > 0;
  }

  validateConfirmForm() {
    return this.state.code.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleUpdateClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: this.state.email });

      this.setState({ codeSent: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", this.state.code);

      this.props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  renderUpdateForm() {
    return (
      <form onSubmit={this.handleUpdateClick}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <LoaderButton
          type="submit"
          text="Update Email"
          loadingText="Updating…"
          disabled={!this.validatEmailForm()}
          isLoading={this.state.isSendingCode}
        />
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <div>
          <label htmlFor="code">Confirmation Code</label>
          <input
            name="code"
            type="text"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <p>Please check your email for the code.</p>
        </div>
        <LoaderButton
          type="submit"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={this.state.isConfirming}
          disabled={!this.validateConfirmForm()}
        />
      </form>
    );
  }

  render() {
    return (
      <div className="ChangeEmail">
        {!this.state.codeSent
          ? this.renderUpdateForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
