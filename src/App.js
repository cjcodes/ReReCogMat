import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route as UnauthenticatedRoute,
  Switch,
} from 'react-router-dom';

import {
  Button,
} from 'material-ui';

import { validateAuth, signOut } from './modules/user';

import { Home, LoginRegister } from './scenes';
import Route from './components/Route';

class App extends Component {
  componentWillMount() {
    this.props.validateAuth();
  }

  render() {
    const { checkedAuth, signOut, user } = this.props;

    if (!checkedAuth) {
      return (
        <div />
      );
    } else {
      return (
        <Router>
          <div>
            {user !== null &&
              <Button onClick={signOut}>Log Out</Button>
            }
            <Switch>
              <Route exact path="/" component={Home} />
              <UnauthenticatedRoute path="/login" component={LoginRegister} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    checkedAuth: state.user.checkedAuth,
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  validateAuth,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
