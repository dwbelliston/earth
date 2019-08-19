import React, { Component } from 'react';
import './app-footer.scss';

class AppFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let intervalId = setInterval(this.createDots, 5000);
    this.setState({ intervalId: intervalId });
    this.createDots();
  };

  componentWillUnmount = () => {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  };

  createDots = () => {
    let dots = [];

    [...Array(500)].forEach((_, i) => {
      if (Math.floor(Math.random() * Math.floor(50)) === 1) {
        dots.push(<div key={i} className="dot color" />);
      } else {
        dots.push(<div key={i} className="dot" />);
      }
    });

    this.setState({ dots: dots });
  };

  render() {
    return <div className="app-container app-footer">{this.state.dots}</div>;
  }
}

export default AppFooter;
