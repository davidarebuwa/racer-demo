/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_RACE_RESULT_REQUEST,
  GET_RACE_RESULT_SUCCESS,
  GET_RACE_RESULT_FAILURE,

  GET_MOST_RECENT_RACE_RESULT_REQUEST,
  GET_MOST_RECENT_RACE_RESULT_SUCCESS,
  GET_MOST_RECENT_RACE_RESULT_FAILURE,
} = require('./resultActions').constants;

const InitialState = Record({
  isFetching: null,
  raceResults: {},
  mostRecentRaceResults: {},
  error: null,
});

const initialState = new InitialState();

export default function resultReducer(
  state = initialState,
  { type, payload },
) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_RACE_RESULT_REQUEST:
    case GET_MOST_RECENT_RACE_RESULT_REQUEST:
    {
      return state.set('isFetching', true).set('error', null);
    }
    case GET_RACE_RESULT_SUCCESS:
    {
      return state.set('isFetching', false)
        .set('raceResults', payload)
        .set('error', null);
    }

    case GET_MOST_RECENT_RACE_RESULT_SUCCESS:
    {
      return state.set('isFetching', false)
        .set('raceResults', payload)
        .set('error', null);
    }
    case GET_RACE_RESULT_FAILURE:
    case GET_MOST_RECENT_RACE_RESULT_FAILURE:
    {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
