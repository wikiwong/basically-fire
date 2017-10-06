import { UPDATE_STATUS } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};
