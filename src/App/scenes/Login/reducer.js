import { COMPLETE_LOGIN, LOGOUT } from './actions';

export default (state = null, action) => {
  switch (action.type) {
    case COMPLETE_LOGIN:
      return action.user;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
