import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import UserDataService from "../../../services/UserDataService";
import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  ADD_LIST_REQUEST,
  ADD_LIST_FAILURE,
  ADD_LIST_SUCCESS,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
  SET_CURRENT_LIST,
  CLEAR_CURRENT_LIST,
  UPDATE_CURRENT_LIST_REQUEST,
  UPDATE_CURRENT_LIST_SUCCESS,
  UPDATE_CURRENT_LIST_FAILURE,
} from "../../reducers/userData";

// * fetch user data
export const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});
export const userDataSuccess = (payload) => ({
  type: USER_DATA_SUCCESS,
  payload,
});
export const userDataFailure = (payload) => ({
  type: USER_DATA_FAILURE,
  payload,
});

export function* userData() {
  try {
    const { data } = yield UserDataService.fetchUserData();
    yield put(userDataSuccess(data.lists));
  } catch (e) {
    console.log(e);
    yield put(userDataFailure(e));
  }
}

// * add new list
export const addListRequest = (payload) => ({
  type: ADD_LIST_REQUEST,
  payload,
});

export const addListSuccess = (payload) => ({
  type: ADD_LIST_SUCCESS,
  payload,
});

export const addListFailure = (payload) => ({
  type: ADD_LIST_FAILURE,
  payload,
});

export function* addLists({ payload }) {
  try {
    const data = yield UserDataService.addList(payload);
    console.log("add data", data);
    yield put(addListSuccess(data.data.listData));
  } catch (e) {
    console.log(e);
    yield put(addListFailure(e));
  }
}

// * delete list
export const deleteListRequest = (payload) => ({
  type: DELETE_LIST_REQUEST,
  payload,
});

export const deleteListSuccess = (payload) => ({
  type: DELETE_LIST_SUCCESS,
  payload,
});

export const deleteListFailure = (payload) => ({
  type: DELETE_LIST_FAILURE,
  payload,
});

export function* deleteList({ payload }) {
  try {
    yield UserDataService.deleteList(payload);
    yield put(deleteListSuccess(payload));
  } catch (e) {
    console.log(e);
    yield put(deleteListFailure(e));
  }
}

// * set current
export const setCurrentList = (list) => ({
  type: SET_CURRENT_LIST,
  payload: list,
});
export const clearCurrentList = (list) => ({
  type: CLEAR_CURRENT_LIST,
  payload: list,
});

// * update current list
export const updateCurrentListRequest = (payload) => ({
  type: UPDATE_CURRENT_LIST_REQUEST,
  payload,
});

export const updateCurrentListSuccess = (payload) => ({
  type: UPDATE_CURRENT_LIST_SUCCESS,
  payload,
});

export const updateCurrentListFailure = (payload) => ({
  type: UPDATE_CURRENT_LIST_FAILURE,
  payload,
});

export function* updateList({ payload }) {
  try {
    const response = yield UserDataService.updateCurrentList(
      payload.id,
      payload
    );
    // console.log(response);

    yield put(updateCurrentListSuccess(response.data.listData));
  } catch (e) {
    console.log(e);
    yield put(updateCurrentListFailure(e));
  }
}

export function* userDataSagas() {
  yield all([
    takeLatest(USER_DATA_REQUEST, userData),
    takeLatest(ADD_LIST_REQUEST, addLists),
    takeLatest(DELETE_LIST_REQUEST, deleteList),
    takeLatest(UPDATE_CURRENT_LIST_REQUEST, updateList),
  ]);
}
