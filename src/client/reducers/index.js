import { combineReducers } from 'redux';
import FetchReducer from './FetchReducer';

export default combineReducers({
  fetch: FetchReducer,
});
