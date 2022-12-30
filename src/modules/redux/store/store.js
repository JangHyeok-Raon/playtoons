import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
} from "redux";
import reducers from "../ducks";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import authMiddleware from "../middleware/authMiddleware";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

export const sagaMiddleware = createSagaMiddleware();
export var store = undefined;

const isDebuggingInChrome = false;

const logger =
  process.env.ENV === "production"
    ? undefined
    : createLogger({
        predicate: (getState, action) => isDebuggingInChrome,
        collapsed: true,
        duration: true,
      });

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const configureStore = () => {
  store = createStore(
    reducers,
    {},
    composeEnhancers(
      applyMiddleware(thunk, authMiddleware, sagaMiddleware, logger)
    )
  );
  const persistor = persistStore(store);

  return {
    ...store,
    runSaga: sagaMiddleware.run,
    persistor,
  };
};

export default configureStore;
