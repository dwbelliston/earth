import React, { Component } from "react";
import StoriesApi from "../../services/apis/stories.api";
import StoryLink from "../../shared/story-link/story-link";
import "./stories.scss";


class Stories extends Component {
  _mounted = false;

  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.getRecent();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getRecent = async () => {
    const response = await StoriesApi.getRecentStories().catch(err => {
      return [];
    });

    this.onResponse(response);
  };

  onResponse = response => {
    if (this._mounted) {
      this.setState({ stories: response });
    }
  };

  render() {
    return (
      <div className="stories">

        {!this.state.stories.length && (
          <h2>No Recent Stories</h2>
        )}

        {this.state.stories.map((value, index) => {
          return <StoryLink story={value} key={index} />;
        })}
      </div>
    );
  }
}

export default Stories;
