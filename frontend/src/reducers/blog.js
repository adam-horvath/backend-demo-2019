import {
  ADD_BLOG_ENTRY_REQUEST,
  ADD_BLOG_ENTRY_SUCCESS,
  ADD_BLOG_ENTRY_FAILED,
  GET_BLOG_ENTRIES_REQUEST,
  GET_BLOG_ENTRIES_SUCCESS,
  GET_BLOG_ENTRIES_FAILED,
} from "../actions/blog";

const INITIAL_STATE = {
  loading: false,
  error: null,
  entries: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BLOG_ENTRY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_BLOG_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_BLOG_ENTRY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload || {}
      };
    case GET_BLOG_ENTRIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_BLOG_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };
    case GET_BLOG_ENTRIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload || {}
      };
    default:
      return state;
  }
};
