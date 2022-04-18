import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import authReducer from "./reducers/auth";
import userDataReducer from "./reducers/userData";
import modalReducer from "./reducers/modals";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  authReducer,
  userDataReducer,
  modalReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
