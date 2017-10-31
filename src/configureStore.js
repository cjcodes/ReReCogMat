import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules';
import rootSaga from './sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  sagaMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
