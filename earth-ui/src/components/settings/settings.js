import { API } from "aws-amplify";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import config from "../../config";
import LoaderButton from "../../shared/loader-button/loader-button";
import BillingForm from "./billing-form";
import "./settings.scss";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  billUser(details) {
    return API.post("stories", "/billing", {
      body: details
    });
  }

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="Settings">
        <StripeProvider apiKey={config.STRIPE_KEY}>
          <Elements>
            <BillingForm
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>

        <div>
          <NavLink exact to="/settings/email" activeClassName="is-active">
            <LoaderButton text="Change Email" />
          </NavLink>
          <NavLink exact to="/settings/password" activeClassName="is-active">
            <LoaderButton text="Change Password" />
          </NavLink>
        </div>
      </div>
    );
  }
}
