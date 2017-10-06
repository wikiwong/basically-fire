import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './scenes/Login/reducer';
import register from './scenes/Register/reducer';

const rootReducer = combineReducers({
  form,
  user,
  register
});

export default rootReducer;
