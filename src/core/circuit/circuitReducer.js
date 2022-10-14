/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_ALL_CIRCUITS_LIST_REQUEST,
  GET_ALL_CIRCUITS_LIST_SUCCESS,
  GET_ALL_CIRCUITS_LIST_FAILURE,

  GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST,
  GET_ALL_CIRCUITS_WITHIN_YEAR_SUCCESS,
  GET_ALL_CIRCUITS_WITHIN_YEAR_FAILURE,

  GET_SELECTED_CIRCUIT_REQUEST,
  GET_SELECTED_CIRCUIT_SUCCESS,
  GET_SELECTED_CIRCUIT_FAILURE,

  SET_SELECTED_CIRCUIT_REQUEST,

  GET_SELECTED_CIRCUIT_DETAILS_REQUEST,
  GET_SELECTED_CIRCUIT_DETAILS_SUCCESS,
  GET_SELECTED_CIRCUIT_DETAILS_FAILURE,

} = require('./circuitActions').constants;

const InitialState = Record({
  isFetching: null,
  circuits: {},
  filteredCircuits: {},
  selectedCircuit: {},
  selectedCircuitDetails: {},
  error: null,
});

const initialState = new InitialState();

export default function circuitReducer(
  state = initialState,
  { type, payload },
) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_ALL_CIRCUITS_LIST_REQUEST:
    case GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST:
    case GET_SELECTED_CIRCUIT_REQUEST:
    case GET_SELECTED_CIRCUIT_DETAILS_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }

    case GET_ALL_CIRCUITS_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('circuits', payload)
        .set('error', null);
    }

    case GET_ALL_CIRCUITS_WITHIN_YEAR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('filteredCircuits', payload)
        .set('error', null);
    }

    case SET_SELECTED_CIRCUIT_REQUEST:
    case GET_SELECTED_CIRCUIT_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedCircuit', payload)
        .set('error', null);
    }

    case GET_SELECTED_CIRCUIT_DETAILS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedCircuitDetails', payload)
        .set('error', null);
    }

    case GET_ALL_CIRCUITS_LIST_FAILURE:
    case GET_ALL_CIRCUITS_WITHIN_YEAR_FAILURE:
    case GET_SELECTED_CIRCUIT_FAILURE:
    case GET_SELECTED_CIRCUIT_DETAILS_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
