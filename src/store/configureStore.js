import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState = {}) {
  const logger = createLogger({
    predicate(getState, action) {
      return action.type !== 'TIMESTEP';
    }
  });
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    logger
  )(createStore);

  let store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer.default || nextRootReducer);
    });
  }

  return store;
}
