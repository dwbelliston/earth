import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./story-link.scss";

class StoryLink extends Component {
  constructor(props) {
    super(props);

    let date = new Date(this.props.story.createdDate);

    date =
      date.getMonth() + 1 + " " + date.getDate() + " " + date.getFullYear();

    this.state = {
      storyId: props.story.storyId,
      title: props.story.title,
      subtitle: props.story.subtitle,
      image: props.story.image,
      time: this.showTime(props.story.time),
      date: date
    };

    this.handleClick = this.handleClick.bind(this);
  }

  showTime(time) {
    let timeHtml = [];

    [...Array(time)].forEach((_, i) => {
      timeHtml.push(<span key={i}>⏳</span>);
    });

    return timeHtml;
  }

  handleClick() {
    this.setState({
      toStory: true
    });
  }

  render() {
    if (this.state.toStory === true) {
      return <Redirect to={`/stories/${this.state.storyId}`} />;
    }

    return (
      <article className="story-link">
        <div className="story-text">
          <h2 className="title" onClick={this.handleClick}>
            {this.state.title}
          </h2>
          <div className="details">
            <p className="details__misc">
              <div>{this.state.date}</div>
              <div className="time-estimate">{this.state.time}</div>
            </p>
            <p className="details__subtitle">{this.state.subtitle}</p>
          </div>
        </div>
        <div className="story-image">
          <img src={this.state.image} alt="" />
        </div>
      </article>
    );
  }
}

export default StoryLink;
