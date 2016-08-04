import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reduxThunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { setupReducers, replaceReducers } from '@sketchpixy/rubix/lib/node/redux-router';

import createReducers from './reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

export default (history, client, initialState) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  let middleware = [ reduxThunkMiddleware, sagaMiddleware, client.middleware(), reduxRouterMiddleware ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');

    middleware = [ ...middleware, loggerMiddleware ];

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const reducers = createReducers(client);
  const store = finalCreateStore(reducers, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      replaceReducers(require('./reducers')(client));
    });
  }

  store.runSaga = sagaMiddleware.run;

  return store;
};
