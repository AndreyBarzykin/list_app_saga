export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE",
  LOGOUT_USER = "LOGOUT_USER",
  REGISTRATION_USER_REQUEST = "REGISTRATION_USER_REQUEST",
  REGISTRATION_USER_SUCCESS = "REGISTRATION_USER_SUCCESS",
  REGISTRATION_USER_FAILURE = "REGISTRATION_USER_FAILURE",
  CHECK_IS_AUTH_REQUEST = "CHECK_IS_AUTH_REQUEST",
  CHECK_IS_AUTH_SUCCESS = "CHECK_IS_AUTH_SUCCESS";

const initialState = {
  isAuth: !!localStorage.getItem("accessToken") || false,
  error: "",
  isLoading: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, isLoading: true };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        isLoading: false,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        error: action.payload,
        isLoading: false,
      };
    case LOGOUT_USER:
      return { ...initialState, isAuth: false };

    case REGISTRATION_USER_REQUEST:
      return { ...state, isLoading: true };

    case REGISTRATION_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        isLoading: false,
      };

    case REGISTRATION_USER_FAILURE:
      return {
        ...state,
        isAuth: false,
        error: action.payload,
        isLoading: false,
      };
    case CHECK_IS_AUTH_REQUEST:
      return { ...state, isLoading: true };
    case CHECK_IS_AUTH_SUCCESS:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
