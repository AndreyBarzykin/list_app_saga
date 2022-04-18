// export const SET_LISTS = "SET_LISTS";
// export const ADD_LIST = "ADD_LIST";
// export const DELETE_LIST = "DELETE_LIST";
// export const UPDATE_LIST = "UPDATE_LIST";
// export const SET_CURRENT_LIST = "SET_CURRENT_LIST";
// export const CLEAR_CURRENT_LIST = "CLEAR_CURRENT_LIST";
// export const SET_LOADING = "SET_LOADING";
// export const ADD_CATEGORY = "ADD_CATEGORY";

import { LOGOUT_USER } from "../auth";

//
export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS";
export const USER_DATA_FAILURE = "USER_DATA_FAILURE";

export const ADD_LIST_REQUEST = "ADD_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "ADD_LIST_SUCCESS";
export const ADD_LIST_FAILURE = "ADD_LIST_FAILURE";

export const DELETE_LIST_REQUEST = "DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_FAILURE = "DELETE_LIST_FAILURE";

export const UPDATE_CURRENT_LIST_REQUEST = "UPDATE_CURRENT_LIST_REQUEST";
export const UPDATE_CURRENT_LIST_SUCCESS = "UPDATE_CURRENT_LIST_SUCCESS";
export const UPDATE_CURRENT_LIST_FAILURE = "UPDATE_CURRENT_LIST_FAILURE";

export const SET_CURRENT_LIST = "SET_CURRENT_LIST";
export const CLEAR_CURRENT_LIST = "CLEAR_CURRENT_LIST";

const initialState = {
  lists: [],
  loading: false,
  loadingUpdate: false,
  error: "",
  current: null,
  //   categories: [
  //     { id: 1, name: "Food", color: "#3d4376" },
  //     { id: 2, name: "Technics", color: "#ad38a4" },
  //     { id: 3, name: "Animals", color: "#459528" },
  //     { id: 4, name: "Drinks", color: "#a12b0f" },
  //     { id: 5, name: "Tools", color: "#072a2a" },
  //   ],
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {
    // fetch data
    case USER_DATA_REQUEST:
      return { ...state, loading: true };
    case USER_DATA_SUCCESS:
      return { ...state, lists: action.payload, loading: false };
    case USER_DATA_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT_USER:
      return initialState;

    // add list
    case ADD_LIST_REQUEST:
      return { ...state, loading: true };
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        loading: false,
      };
    case ADD_LIST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // delete list
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
        loading: false,
      };
    case DELETE_LIST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // set current list
    case SET_CURRENT_LIST:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_LIST:
      return {
        ...state,
        current: null,
      };

    // update current list
    case UPDATE_CURRENT_LIST_REQUEST:
      // console.log(action.payload.listItem.map((item) => item.id));
      return {
        ...state,
        // !TODO ids not equal
        // loadingUpdate: action.payload.listItem.map((item) => item.id),
        loadingUpdate: true,
      };
    case UPDATE_CURRENT_LIST_SUCCESS:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
        loadingUpdate: false,
      };
    case UPDATE_CURRENT_LIST_FAILURE:
      return { ...state, error: action.payload, loadingUpdate: "" };

    // //
    // case ADD_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories, action.payload],
    //     loading: false,
    //   };

    default:
      return state;
  }
}
