import axios from 'axios';
import { Status } from './enums';

const UPDATE_STATUS = 'UPDATE_STATUS';
const ROOT_URL = 'http://localhost:8080'

const updateStatus = (status) => ({ type: UPDATE_STATUS, status });

const register = (formFields) => {
  return (dispatch, getState) => {
    return axios
      .post(`${ROOT_URL}/auth/registerWithoutVerification`, { ...formFields }, {
        validateStatus: (stats) => status < 500
      })
      .then(({ data, status }) => {
        if (status < 300 && data) {
          dispatch(updateStatus(Status.Verifying));
        } else {
          throw new SubmissionError(data)
        }
      });
  }
};

export {
  UPDATE_STATUS,
  register
};
