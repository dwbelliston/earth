import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./story-link.scss"

class StoryLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storyId: props.story.storyId,
      title: props.story.title,
      subtitle: props.story.subtitle,
      date: new Date(this.props.story.createdDate).toDateString()
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      toStory: true
    })
  }

  render() {
    if (this.state.toStory === true) {
      return <Redirect to={`/stories/${this.state.storyId}`} />;
    }

    return (
      <div className="story-link">
        <h2 className="title" onClick={this.handleClick}>
          {this.state.title}
        </h2>
        <div className="details">
          <p className="details__date">{this.state.date}</p>
          <p className="details__subtitle">{this.state.subtitle}</p>
        </div>
      </div>
    );
  }
}

export default StoryLink;
