import * as AuthService from "../services/auth";
import { API_TOKEN } from "../constants/Contants";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const login = credentials => {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN_REQUEST
      });

      const { token } = await AuthService.login(credentials);

      localStorage.setItem(API_TOKEN, token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });

      return token;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error
      });

      throw error;
    }
  };
};
