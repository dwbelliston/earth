import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "../../shared/loader-button/loader-button";
import "./billing-form.scss";

class BillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      storage: "",
      isProcessing: false,
      isCardComplete: false
    };
  }

  validateForm() {
    return (
      this.state.name !== "" &&
      this.state.storage !== "" &&
      this.state.isCardComplete
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    });
  };

  handleSubmitClick = async event => {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ isProcessing: true });

    const { token, error } = await this.props.stripe.createToken({ name });

    this.setState({ isProcessing: false });

    this.props.onSubmit(this.state.storage, { token, error });
  };

  render() {
    const loading = this.state.isProcessing || this.props.loading;

    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <div>
          <label htmlFor="storage">Storage</label>
          <input
            name="storage"
            min="0"
            type="number"
            value={this.state.storage}
            placeholder="Number of notes to store"
            onChange={this.handleFieldChange}
          />
        </div>

        <div>
          <label htmlFor="name">name</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            placeholder="Name on the card"
            onChange={this.handleFieldChange}
          />
        </div>

        <div>
          <label htmlFor="creditCard">Credit Card Info</label>
          <CardElement
            className="card-field"
            onChange={this.handleCardFieldChange}
            style={{
              base: {
                fontSize: "18px",
                fontFamily: '"Open Sans", sans-serif'
              }
            }}
          />
        </div>

        <LoaderButton
          type="submit"
          text="Purchase"
          isLoading={loading}
          loadingText="Purchasing…"
          disabled={!this.validateForm()}
        />
      </form>
    );
  }
}

export default injectStripe(BillingForm);
