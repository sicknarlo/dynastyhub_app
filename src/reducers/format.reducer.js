import initialState from '../store/initialState';
import {
  SET_SUPER,
} from '../actions/format.actions';

export default (state = initialState.format, action) => {
  switch (action.type) {
    case SET_SUPER:
      return {
        ...state,
        superflex: action.format
      };
    default:
      return state;
  }
};
