import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route as UnauthenticatedRoute,
  Switch,
} from 'react-router-dom';

import { validateAuth } from './modules/user';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import { LoginRegister } from './scenes';
import Routes from './Routes';

class App extends Component {
  componentWillMount() {
    this.props.validateAuth();
  }

  render() {
    const { checkedAuth } = this.props;

    if (!checkedAuth) {
      return (
        <div />
      );
    } else {
      return (
        <Router>
          <Switch>
            <UnauthenticatedRoute path="/login" component={LoginRegister} />
            <AuthenticatedRoute path="/" component={Routes} />
          </Switch>
        </Router>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    checkedAuth: state.user.checkedAuth,
  };
}

const mapDispatchToProps = {
  validateAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
