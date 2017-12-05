import React, { Component } from 'react';
import { connect } from 'react-redux';

import Content from '../components/Content';

class Home extends Component {
  render() {
    return (
      <Content title="Home">
        <h1>Home</h1>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
