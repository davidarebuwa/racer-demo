/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_RACE_SCHEDULE_BY_SEASON_REQUEST,
  GET_RACE_SCHEDULE_BY_SEASON_SUCCESS,
  GET_RACE_SCHEDULE_BY_SEASON_FAILURE,

  GET_MOST_RECENT_RACE_SCHEDULE_REQUEST,
  GET_MOST_RECENT_RACE_SCHEDULE_SUCCESS,
  GET_MOST_RECENT_RACE_SCHEDULE_FAILURE,

  GET_SELECTED_RACE_INFO_REQUEST,
  GET_SELECTED_RACE_INFO_SUCCESS,
  GET_SELECTED_RACE_INFO_FAILURE,

} = require('./scheduleActions').constants;

const InitialState = Record({
  isFetching: null,
  raceSchedule: {},
  recentRaceSchedule: {},
  race: {},
  error: null,
});

const initialState = new InitialState();

export default function scheduleReducer(state = initialState, { type, payload }) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_RACE_SCHEDULE_BY_SEASON_REQUEST:
    case GET_SELECTED_RACE_INFO_REQUEST:
    case GET_MOST_RECENT_RACE_SCHEDULE_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }

    case GET_RACE_SCHEDULE_BY_SEASON_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('raceSchedule', payload)
        .set('error', null);
    }

    case GET_MOST_RECENT_RACE_SCHEDULE_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('recentRaceSchedule', payload)
        .set('error', null);
    }

    case GET_SELECTED_RACE_INFO_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('race', payload)
        .set('error', null);
    }

    case GET_RACE_SCHEDULE_BY_SEASON_FAILURE:
    case GET_SELECTED_RACE_INFO_FAILURE:
    case GET_MOST_RECENT_RACE_SCHEDULE_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
