import { combineReducers } from 'redux';
import players from './players.reducer';
import format from './format.reducer';

export default combineReducers({
  players,
  format
});
