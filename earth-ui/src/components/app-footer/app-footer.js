import React, { Component } from 'react';
import './app-footer.scss';

class AppFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    // let intervalId = setInterval(this.createDots, 2000);
    // this.setState({ intervalId: intervalId });
    this.createDots();
  };

  componentWillUnmount = () => {
    // use intervalId from the state to clear the interval
    // clearInterval(this.state.intervalId);
  };

  createDots = () => {
    let dots = [];

    [...Array(100)].forEach((_, i) => {
      if (Math.floor(Math.random() * Math.floor(10)) === 2) {
        dots.push(<div key={i} className="dot color"><div></div></div>);
      } else {
        dots.push(<div key={i} className="dot" />);
      }
    });

    this.setState({ dots: dots });
  };

  render() {
    return <div className="app-container app-footer">
      {/* <div className="space">Space with content</div> */}
      {/* <div className="dots">
        {this.state.dots}
      </div> */}
    </div>;
  }
}

export default AppFooter;
