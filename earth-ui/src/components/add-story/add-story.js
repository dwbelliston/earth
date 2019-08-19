import { Auth } from "aws-amplify";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import LoaderButton from "../../shared/loader-button/loader-button";
import StoriesApi from "../../services/apis/stories.api";
import "./add-story.scss";



class AddStoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStory: {
        title: "",
        document: "",
        userId: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.newStory.title && this.state.newStory.document;
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      newStory: {
        ...this.state.newStory,
        [name]: target.value
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const user = await Auth.currentUserInfo();

    this.setState({
      isLoading: true,
      newStory: {
        ...this.state.newStory,
        userId: user.username
      }
    });

    this.setState({ isLoading: true });

    try {
      await this.postStory(
        this.state.newStory
      );
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  postStory = async payload => {
    await StoriesApi.postStory(payload);
  };

  render() {
    return (
      <div className="app-container">
        <div className="add-story-form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="document">Document</label>
              <textarea
                className="document-input"
                name="document"
                value={this.state.document}
                onChange={this.handleChange}
              />
            </div>

            <LoaderButton
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Add"
              loadingText="Adding…"
            />
          </form>
        </div>

        <div className="add-story-preview">
          <h2>Preview</h2>
          <ReactMarkdown source={this.state.newStory.document} />
        </div>
      </div>
    );
  }
}

export default AddStoryComponent;
