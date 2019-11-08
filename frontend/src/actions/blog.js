import * as BlogService from "../services/blog";

export const ADD_BLOG_ENTRY_REQUEST = "ADD_BLOG_ENTRY_REQUEST";
export const ADD_BLOG_ENTRY_SUCCESS = "ADD_BLOG_ENTRY_SUCCESS";
export const ADD_BLOG_ENTRY_FAILED = "ADD_BLOG_ENTRY_FAILED";

export const GET_BLOG_ENTRIES_REQUEST = "GET_BLOG_ENTRIES_REQUEST";
export const GET_BLOG_ENTRIES_SUCCESS = "GET_BLOG_ENTRIES_SUCCESS";
export const GET_BLOG_ENTRIES_FAILED = "GET_BLOG_ENTRIES_FAILED";

export const addBlogEntry = data => {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_BLOG_ENTRY_REQUEST,
      });

      await BlogService.addBlogEntry(data);

      dispatch({
        type: ADD_BLOG_ENTRY_SUCCESS,
      });

    } catch (error) {
      dispatch({
        type: ADD_BLOG_ENTRY_FAILED,
        payload: error
      });

      throw error;
    }
  };
};

export const getBlogEntries = () => {
  return async dispatch => {
    try {
      dispatch({
        type: GET_BLOG_ENTRIES_REQUEST,
      });

      const { entries } = await BlogService.getBlogEntries();

      dispatch({
        type: GET_BLOG_ENTRIES_SUCCESS,
        payload: entries,
      });

    } catch (error) {
      dispatch({
        type: GET_BLOG_ENTRIES_FAILED,
        payload: error
      });

      throw error;
    }
  };
};