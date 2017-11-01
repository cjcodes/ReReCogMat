import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route as UnauthenticatedRoute } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <UnauthenticatedRoute {...rest} render={props => (
      rest.user === null ? (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      ) : (
        <Component {...props} />
      )
    )} />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
