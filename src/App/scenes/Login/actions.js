import axios from 'axios';
import { SubmissionError } from 'redux-form';

const ROOT_URL = 'http://localhost:8080'

const START_LOGIN = 'START_LOGIN';
const COMPLETE_LOGIN = 'COMPLETE_LOGIN';
const LOGOUT = 'LOGOUT';

const startLogin = ({ username, password }) => {
  return (dispatch, getState) => {
    dispatch({ type: START_LOGIN });
    return axios
      .post(`${ROOT_URL}/auth/login`, { username, password }, {
        validateStatus: (stats) => status < 500
      })
      .then(({ data, status }) => {
        if (status < 300 && data) {
          dispatch(completeLogin(data));
        } else {
          throw new SubmissionError(data)
        }
      });
  }
};

const completeLogin = (user) => ({ type: COMPLETE_LOGIN, user });

const logOut = () => ({ type: LOGOUT });

export {
  COMPLETE_LOGIN,
  LOGOUT,
  START_LOGIN,
  completeLogin,
  logOut,
  startLogin
};
