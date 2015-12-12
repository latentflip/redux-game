import React from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render() {
    return (
      <div>
        <h1>My App</h1>
        <Header />
        <Nav />
        {this.props.children}
      </div>
    );
  }
});
