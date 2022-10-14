/* eslint-disable default-param-last */
import { Record } from 'immutable';

const {
  GET_ALL_CONSTRUCTORS_LIST_REQUEST,
  GET_ALL_CONSTRUCTORS_LIST_SUCCESS,
  GET_ALL_CONSTRUCTORS_LIST_FAILURE,

  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST,
  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_SUCCESS,
  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_FAILURE,

  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST,
  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_SUCCESS,
  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_FAILURE,

  GET_SELECTED_CONSTRUCTOR_REQUEST,
  GET_SELECTED_CONSTRUCTOR_SUCCESS,
  GET_SELECTED_CONSTRUCTOR_FAILURE,

  GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST,
  GET_SELECTED_CONSTRUCTOR_DETAILS_SUCCESS,
  GET_SELECTED_CONSTRUCTOR_DETAILS_FAILURE,
} = require('./constructorActions').constants;

const InitialState = Record({
  isFetching: null,
  constructors: {},
  filteredConstructors: {},
  selectedConstructor: {},
  selectedConstructorDetails: {},
  error: null,
});

const initialState = new InitialState();

export default function constructorReducer(
  state = initialState,
  { type, payload },
) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (type) {
    case GET_ALL_CONSTRUCTORS_LIST_REQUEST:
    case GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST:
    case GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST:
    case GET_SELECTED_CONSTRUCTOR_REQUEST:
    case GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST: {
      return state.set('isFetching', true).set('error', null);
    }

    case GET_ALL_CONSTRUCTORS_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('constructors', payload)
        .set('error', null);
    }

    case GET_SELECTED_CONSTRUCTOR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedConstructor', payload)
        .set('error', null);
    }

    case GET_ALL_CONSTRUCTORS_WITHIN_YEAR_SUCCESS:
    case GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('filteredConstructors', payload)
        .set('error', null);
    }

    case GET_SELECTED_CONSTRUCTOR_DETAILS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('selectedConstructorsDetails', payload)
        .set('error', null);
    }

    case GET_ALL_CONSTRUCTORS_LIST_FAILURE:
    case GET_ALL_CONSTRUCTORS_WITHIN_YEAR_FAILURE:
    case GET_SELECTED_CONSTRUCTOR_FAILURE:
    case GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_FAILURE:
    case GET_SELECTED_CONSTRUCTOR_DETAILS_FAILURE: {
      return state.set('isFetching', false).set('error', payload);
    }

    default:
      return state;
  }
}
