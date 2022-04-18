import { all, put, takeLatest } from "@redux-saga/core/effects";
import AuthService from "../../../services/AuthService";
import {
  CLEAR_ERROR,
  SET_AUTH,
  SET_ERROR,
  SET_LOADING,
  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  CHECK_IS_AUTH_REQUEST,
  CHECK_IS_AUTH_SUCCESS,
} from "../../reducers/auth";
import { userDataRequest } from "../userData";

// * login
export const loginUserRequest = (user) => ({
  type: LOGIN_USER_REQUEST,
  payload: user,
});
export const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});
export const loginUserFailure = (payload) => ({
  type: LOGIN_USER_FAILURE,
  payload,
});

// const setIsAuth = (auth) => ({ type: SET_AUTH, payload: auth });
// const setIsLoading = (payload) => ({ type: SET_LOADING, payload });
// const setError = (payload) => ({ type: SET_ERROR, payload });
// const clearError = () => ({ type: CLEAR_ERROR });

function* login({ payload }) {
  try {
    const { data } = yield AuthService.login(payload.email, payload.password);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    yield put(loginUserSuccess(data));
    yield put(userDataRequest());
  } catch (e) {
    console.log(e);
    yield put(loginUserFailure(e));
  }
}
// * registration
export const registrationUserRequest = (user) => ({
  type: REGISTRATION_USER_REQUEST,
  payload: user,
});
export const registrationUserSuccess = (payload) => ({
  type: REGISTRATION_USER_SUCCESS,
  payload,
});
export const registrationUserFailure = (payload) => ({
  type: REGISTRATION_USER_FAILURE,
  payload,
});

function* registration({ payload }) {
  try {
    const { data } = yield AuthService.registration(
      payload.email,
      payload.password
    );
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    yield put(registrationUserSuccess(data));
    yield put(userDataRequest());
  } catch (e) {
    console.log(e);
    yield put(loginUserFailure(e));
  }
}

export const checkIsAuthRequest = () => ({
  type: CHECK_IS_AUTH_REQUEST,
});
export const checkIsAuthSuccess = () => ({
  type: CHECK_IS_AUTH_SUCCESS,
});

function* checkIsAuth() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = yield AuthService.refresh(refreshToken);
    // console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    yield put(loginUserSuccess(response.data));
    yield put(checkIsAuthSuccess());
    yield put(userDataRequest());
  } catch (e) {
    console.log(e);
  }
}

export const logoutUserRequest = () => ({
  type: LOGOUT_USER,
});
export function* authSagas() {
  yield all([
    takeLatest(LOGIN_USER_REQUEST, login),
    takeLatest(REGISTRATION_USER_REQUEST, registration),
    takeLatest(CHECK_IS_AUTH_REQUEST, checkIsAuth),
  ]);
}
