/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_SEASON_REQUEST,
  GET_SEASON_SUCCESS,
  GET_SEASON_FAILURE,
} = require('./seasonActions').constants;

const InitialState = Record({
  isFetching: null,
  seasonsList: {},
  error: null,
});

const initialState = new InitialState();

export default function seasonReducer(state = initialState, { type, payload }) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_SEASON_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }
    case GET_SEASON_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('seasonsList', payload)
        .set('error', null);
    }
    case GET_SEASON_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
