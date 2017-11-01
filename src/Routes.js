import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Nav from './components/Nav';

import { Home, FlowBuilder } from './scenes';

class Routes extends Component {
  render() {
    const { userAtts } = this.props;

    return (
      <Nav account={userAtts.given_name + ' ' + userAtts.family_name}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={FlowBuilder} />
        </Switch>
      </Nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAtts: state.user.attributes,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
