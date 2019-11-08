import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/auth";

const INITIAL_STATE = {
  loading: false,
  error: null,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload || {}
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload || {}
      };
    default:
      return state;
  }
};
