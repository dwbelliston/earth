import React, { Component } from "react";
import "./topics.scss";


class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.createTopics();
  };

  createTopics = () => {
    let topics = [
      'frontend', 'backend', 'aws', 'cloud', 'devops'
    ];

    let topicHtml = []

    topics.forEach((topic, i) => {
      topicHtml.push(
        <div key={i} className="topic">
          <h4>
            {topic}
          </h4>
        </div>
      );
    });

    this.setState({ topics: topicHtml });
  };

  render() {
    return (
      <div className="app-topics-container">
        <div className="app-container">
          <div className="topics">{this.state.topics}</div>
        </div>
      </div>
    );
  }
}

export default Topics;
