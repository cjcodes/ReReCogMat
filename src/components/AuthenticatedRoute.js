import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route as UnauthenticatedRoute } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <UnauthenticatedRoute {...rest} render={props => (
      rest.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )} />
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
