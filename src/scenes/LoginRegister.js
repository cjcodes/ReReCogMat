import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import autoBind from 'react-autobind';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';

import { authenticate, signUp } from '../modules/user';
import SinglePageForm from '../components/SinglePageForm';
import LoginComponent from '../components/Login';
import RegisterComponent from '../components/Register';

const styles = {
  form: {
    padding: '2em',
  },
};

class LoginRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
    };

    autoBind(this);
  }

  changeTab = (event, value) => {
    this.setState({
      tabIndex: value
    });
  };

  renderForms() {
    const { classes, authenticate, error, signUp } = this.props;
    const { tabIndex } = this.state;

    return (
      <SinglePageForm>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.changeTab} fullWidth>
            <Tab label="Log In" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 &&
          <LoginComponent error={error} onSubmit={authenticate} className={classes.form} />
        }
        {tabIndex === 1 &&
          <RegisterComponent error={error} onSubmit={signUp} className={classes.form} />
        }
      </SinglePageForm>
    );
  }

  redirect() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      <Redirect to={from} />
    );
  }

  render() {
    const { user } = this.props;

    if (user.user === null) {
      return this.renderForms();
    } else {
      return this.redirect();
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.user.error,
  };
};

const mapDispatchToProps = {
  authenticate,
  signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginRegister));
