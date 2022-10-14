/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST,
  GET_DRIVER_STANDINGS_AFTER_RACE_SUCCESS,
  GET_DRIVER_STANDINGS_AFTER_RACE_FAILURE,

  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST,
  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_SUCCESS,
  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_FAILURE,

  GET_SEASON_END_DRIVER_STANDINGS_REQUEST,
  GET_SEASON_END_DRIVER_STANDINGS_SUCCESS,
  GET_SEASON_END_DRIVER_STANDINGS_FAILURE,

  GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST,
  GET_SEASON_END_CONSTRUCTOR_STANDINGS_SUCCESS,
  GET_SEASON_END_CONSTRUCTOR_STANDINGS_FAILURE,

  GET_CURRENT_DRIVER_STANDINGS_REQUEST,
  GET_CURRENT_DRIVER_STANDINGS_SUCCESS,
  GET_CURRENT_DRIVER_STANDINGS_FAILURE,

  GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST,
  GET_CURRENT_CONSTRUCTOR_STANDINGS_SUCCESS,
  GET_CURRENT_CONSTRUCTOR_STANDINGS_FAILURE,

  GET_SELECTED_DRIVER_STANDING_REQUEST,
  GET_SELECTED_DRIVER_STANDING_SUCCESS,
  GET_SELECTED_DRIVER_STANDING_FAILURE,

  GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST,
  GET_SELECTED_CONSTRUCTOR_STANDING_SUCCESS,
  GET_SELECTED_CONSTRUCTOR_STANDING_FAILURE,
} = require('./standingActions').constants;

const InitialState = Record({
  standing: {},
  driverStandingsAfterRace: [],
  constructorStandingsAfterRace: [],
  seasonEndDriverStandings: [],
  seasonEndConstructorStandings: [],
  currentDriverStandings: [],
  currentConstructorStandings: [],
  selectedDriverStandings: [],
  selectedConstructorStandings: [],
  isFetching: false,
  error: null,
});

const initialState = new InitialState();

export default function standingReducer(state = initialState, { type, payload }) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST:
    case GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST:
    case GET_SEASON_END_DRIVER_STANDINGS_REQUEST:
    case GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST:
    case GET_CURRENT_DRIVER_STANDINGS_REQUEST:
    case GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST:
    case GET_SELECTED_DRIVER_STANDING_REQUEST:
    case GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }

    case GET_DRIVER_STANDINGS_AFTER_RACE_SUCCESS: {
      return state.set('isFetching', false)
        .set('driverStandingsAfterRace', payload)
        .set('error', null);
    }

    case GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_SUCCESS: {
      return state.set('isFetching', false)
        .set('constructorStandingsAfterRace', payload)
        .set('error', null);
    }

    case GET_SEASON_END_DRIVER_STANDINGS_SUCCESS: {
      return state.set('isFetching', false)
        .set('seasonEndDriverStandings', payload)
        .set('error', null);
    }

    case GET_SEASON_END_CONSTRUCTOR_STANDINGS_SUCCESS: {
      return state.set('isFetching', false)
        .set('seasonEndConstructorStandings', payload)
        .set('error', null);
    }

    case GET_CURRENT_DRIVER_STANDINGS_SUCCESS: {
      return state.set('isFetching', false)
        .set('currentDriverStandings', payload)
        .set('error', null);
    }

    case GET_CURRENT_CONSTRUCTOR_STANDINGS_SUCCESS: {
      return state.set('isFetching', false)
        .set('currentConstructorStandings', payload)
        .set('error', null);
    }

    case GET_SELECTED_DRIVER_STANDING_SUCCESS: {
      return state.set('isFetching', false)
        .set('selectedDriverStandings', payload)
        .set('error', null);
    }

    case GET_SELECTED_CONSTRUCTOR_STANDING_SUCCESS: {
      return state.set('isFetching', false)
        .set('selectedConstructorStandings', payload)
        .set('error', null);
    }

    case GET_DRIVER_STANDINGS_AFTER_RACE_FAILURE:
    case GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_FAILURE:
    case GET_SEASON_END_DRIVER_STANDINGS_FAILURE:
    case GET_SEASON_END_CONSTRUCTOR_STANDINGS_FAILURE:
    case GET_CURRENT_DRIVER_STANDINGS_FAILURE:
    case GET_CURRENT_CONSTRUCTOR_STANDINGS_FAILURE:
    case GET_SELECTED_DRIVER_STANDING_FAILURE:
    case GET_SELECTED_CONSTRUCTOR_STANDING_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }
    default:
      return state;
  }
}
