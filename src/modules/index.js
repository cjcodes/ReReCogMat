import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import conversation from './conversation';

export default combineReducers({
  routing: routerReducer,
  user,
  conversation,
});
