import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import config from '../config.js';

export const pool = new CognitoUserPool({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID,
});

export const signUp = (username, password, userAttributes, validationData) => {
  return new Promise((resolve, reject) => {
    pool.signUp(username, password, userAttributes, validationData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const confirm = (user, code) => {
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const authenticate = (email, password) => {
  let user = pool.getCurrentUser();
  if (user === null) {
    user = new CognitoUser({ Username: email, Pool: pool });
  }

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(user),
      onFailure: err => reject(err),
    });
  });
};

export const getToken = () => {
  return new Promise((resolve, reject) => {
    pool.getCurrentUser().getSession((err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve(session.getIdToken().getJwtToken());
      }
    });
  });
};

export const getAttributes = (user) => {
  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, result) => {
      if (err) {
        reject(err);
      } else {
        let attributes = {};
        result.forEach((attribute) => {
          attributes[attribute.Name] = attribute.Value;
        });
        resolve(attributes);
      }
    });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    pool.getCurrentUser().signOut();
    resolve();
  });
};

export const validateAuth = () => {
  return new Promise((resolve, reject) => {
    const user = pool.getCurrentUser();
    user.getSession((err, session) => {
      if (err) {
        signOut();
        reject();
      } else {
        resolve(user);
      }
    })
  })
}
