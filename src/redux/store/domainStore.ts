import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducer/rootReducer";
import rootSaga from "../sagas/rootSaga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();


const store = {
  ...createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  ),
  runSaga : sagaMiddleware.run(rootSaga)
}

export default store;
