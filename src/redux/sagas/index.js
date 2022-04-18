import { all, call } from "redux-saga/effects";

import { authSagas } from "./auth";
import { userDataSagas } from "./userData";

export default function* rootSaga() {
  yield all([call(authSagas), call(userDataSagas)]);
}
