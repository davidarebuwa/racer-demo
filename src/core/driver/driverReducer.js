/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_ALL_DRIVERS_LIST_REQUEST,
  GET_ALL_DRIVERS_LIST_SUCCESS,
  GET_ALL_DRIVERS_LIST_FAILURE,

  GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST,
  GET_ALL_DRIVERS_IN_RACE_YEAR_SUCCESS,
  GET_ALL_DRIVERS_IN_RACE_YEAR_FAILURE,

  GET_SELECTED_DRIVER_REQUEST,
  GET_SELECTED_DRIVER_SUCCESS,
  GET_SELECTED_DRIVER_FAILURE,

  SET_SELECTED_DRIVER_REQUEST,

  GET_SELECTED_DRIVER_DETAILS_REQUEST,
  GET_SELECTED_DRIVER_DETAILS_SUCCESS,
  GET_SELECTED_DRIVER_DETAILS_FAILURE,
} = require('./driverActions').constants;

const InitialState = Record({
  isFetching: null,
  drivers: {},
  filteredDrivers: {},
  selectedDriver: {},
  selectedDriverDetails: {},
  error: null,
});

const initialState = new InitialState();

export default function driverReducer(
  state = initialState,
  { type, payload },
) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_ALL_DRIVERS_LIST_REQUEST:
    case GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST:
    case GET_SELECTED_DRIVER_REQUEST:
    case GET_SELECTED_DRIVER_DETAILS_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }

    case GET_ALL_DRIVERS_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('drivers', payload)
        .set('error', null);
    }

    case GET_ALL_DRIVERS_IN_RACE_YEAR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('filteredDrivers', payload)
        .set('error', null);
    }

    case SET_SELECTED_DRIVER_REQUEST:
    case GET_SELECTED_DRIVER_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedDriver', payload)
        .set('error', null);
    }

    case GET_SELECTED_DRIVER_DETAILS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedDriverDetails', payload)
        .set('error', null);
    }

    case GET_ALL_DRIVERS_LIST_FAILURE:
    case GET_ALL_DRIVERS_IN_RACE_YEAR_FAILURE:
    case GET_SELECTED_DRIVER_FAILURE:
    case GET_SELECTED_DRIVER_DETAILS_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
