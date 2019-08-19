import React, { Component } from "react";
import Stories from "../stories/stories";
import Intro from "../intro/intro";
import "./main.scss";

class MainComponent extends Component {
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <div className="app-container">
        <Stories />
      </div>
    );
  }
}

export default MainComponent;
