import React, { Component } from 'react';
import { connect } from 'react-redux';

import Content from '../../components/Content';

class Home extends Component {
  render() {
    return (
      <Content title="Test page">
        <h1>Test</h1>
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
