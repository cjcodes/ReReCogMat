import {
  all,
} from 'redux-saga/effects';

import cognito from './cognito';

export default function* rootSaga() {
  yield all([
    cognito(),
  ]);
}
