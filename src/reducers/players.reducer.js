import initialState from '../store/initialState';
import {
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS,
} from '../actions/players.actions';

export default (state = initialState.players, action) => {
  switch (action.type) {
    case REQUEST_PLAYERS:
      return {
        ...state,
        items: [],
        isFetching: true
      };
    case RECEIVE_PLAYERS:
      return {
        ...state,
        isFetching: false,
        items: action.players
      };
    default:
      return state;
  }
};
