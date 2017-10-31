import {
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import phone from 'phone';

import { delay } from 'redux-saga';
import {
  put,
  takeEvery,
  all,
  call,
} from 'redux-saga/effects';

import {
  signUp as cognitoSignUp,
  authenticate as cognitoAuthenticate,
  getAttributes as cognitoGetAttributes,
  validateAuth as cognitoValidateAuth,
  signOut as cognitoSignOut,
} from '../lib/cognitoUserPool';

import {
  SIGN_OUT,
  SIGN_UP,
  SIGNED_UP,
  SIGN_UP_ERROR,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_SUCCESS,
  VALIDATE,
  VALIDATE_DONE,
} from '../modules/user';

function* signUp(action) {
  const data = action.data;
  let attributes = [];

  data.phone_number = phone(data.phone_number)[0];

  for (let key in data) {
    if (key === 'email' || key === 'password') {
      continue;
    }

    attributes.push(new CognitoUserAttribute({ Name: key, Value: data[key]}));
  }

  try {
    const response = yield call(cognitoSignUp, data.email, data.password, attributes, null);
    yield put({
      type: SIGNED_UP,
      user: response.user
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_ERROR,
      error: e,
    });
  }
}

function* authenticate(action) {
  const { email, password } = action;

  yield delay(1000);

  try {
    const user = yield cognitoAuthenticate(email, password);
    yield call(finishAuthentication, user);
  } catch (e) {
    yield put({
      type: AUTHENTICATE_FAILURE,
      error: e,
    });
  }
}

function* validate() {
  try {
    const user = yield cognitoValidateAuth();
    yield call(finishAuthentication, user);
  } catch (e) {
    yield put({
      type: AUTHENTICATE_FAILURE,
      error: e,
    });
  }

  yield put({
    type: VALIDATE_DONE,
  });
}

function* finishAuthentication(user) {
  const attributes = yield cognitoGetAttributes(user);

  yield put({
    type: AUTHENTICATE_SUCCESS,
    user,
    attributes,
  });
}

function* signOut() {
  yield cognitoSignOut();
}


function* watchSignUp() {
  yield takeEvery(SIGN_UP, signUp);
}

function* watchAuthenticate() {
  yield takeEvery(AUTHENTICATE_REQUEST, authenticate);
}

function* watchValidate() {
  yield takeEvery(VALIDATE, validate);
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT, signOut);
}

export default function* cognito() {
  yield all([
    watchSignUp(),
    watchAuthenticate(),
    watchValidate(),
    watchSignOut(),
  ]);
}
