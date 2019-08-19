import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import StoriesApi from "../../services/apis/stories.api";
import LoaderButton from "../../shared/loader-button/loader-button";
import MarkdownCodeBlock from "../../shared/code-block";


class ViewStoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      isAuthenticated: props.isAuthenticated,
      story: {
        title: "",
        document: ""
      }
    };
  }

  componentDidMount() {
    // this.props.match.params.id;
    const {
      match: { params }
    } = this.props;

    this.getStory(params.storyId);
  }

  getStory = async payload => {
    const response = await StoriesApi.getStory(payload).catch(err => {
      console.log(err);
    });
    this.setState({
      story: response
    });
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      story: {
        ...this.state.story,
        [event.target.name]: event.target.value
      }
    });
  };

  handleUpdate = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveStory({
        title: this.state.story.title,
        document: this.state.story.document
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ isLoading: false });
  };

  handleDelete = async event => {
    event.preventDefault();

    try {
      await this.deleteStory(this.props.match.params.storyId);
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  saveStory = async payload => {
    await StoriesApi.saveStory(
      this.props.match.params.storyId,
      payload
    );
  };

  deleteStory = async id => {
    await StoriesApi.deleteStory(id);
  };

  render() {
    return (
      <div className="app-container">
        {!this.props.isAuthenticated ? (
          // Not Authenticated
          <div className="view-story">
            <h1>{this.state.story.title}</h1>
            <ReactMarkdown
              renderers={{ code: MarkdownCodeBlock }}
              source={this.state.story.document}
            />
          </div>
        ) : (
          // Authenticated
          <div className="add-story-form">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  value={this.state.story.title}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="document">Document</label>
                <textarea
                  className="document-input"
                  name="document"
                  value={this.state.story.document}
                  onChange={this.handleChange}
                />
              </div>

              <div className="tools">
                <LoaderButton
                  isLoading={this.state.isLoading}
                  onClick={this.handleUpdate}
                  text="Save Story"
                  loadingText="Saving..."
                />
                <LoaderButton
                  isLoading={this.state.isDeleting}
                  onClick={this.handleDelete}
                  text="Delete Story"
                  loadingText="Deleting..."
                />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ViewStoryComponent;
