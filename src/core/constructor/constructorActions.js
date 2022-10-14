import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_ALL_CONSTRUCTORS_LIST_REQUEST: null,
  GET_ALL_CONSTRUCTORS_LIST_SUCCESS: null,
  GET_ALL_CONSTRUCTORS_LIST_FAILURE: null,

  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST: null,
  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_SUCCESS: null,
  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_FAILURE: null,

  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST: null,
  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_SUCCESS: null,
  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_FAILURE: null,

  SET_SELECTED_CONSTRUCTOR_REQUEST: null,

  GET_SELECTED_CONSTRUCTOR_REQUEST: null,
  GET_SELECTED_CONSTRUCTOR_SUCCESS: null,
  GET_SELECTED_CONSTRUCTOR_FAILURE: null,

  GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST: null,
  GET_SELECTED_CONSTRUCTOR_DETAILS_SUCCESS: null,
  GET_SELECTED_CONSTRUCTOR_DETAILS_FAILURE: null,
});

export const {
  getAllConstructorsListRequest,
  getAllConstructorsListSuccess,
  getAllConstructorsListFailure,
} = createActions(
  constants.GET_ALL_CONSTRUCTORS_LIST_REQUEST,
  constants.GET_ALL_CONSTRUCTORS_LIST_SUCCESS,
  constants.GET_ALL_CONSTRUCTORS_LIST_FAILURE,
);

export const {
  getAllConstructorsWithinYearRequest,
  getAllConstructorsWithinYearSuccess,
  getAllConstructorsWithinYearFailure,
} = createActions(
  constants.GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST,
  constants.GET_ALL_CONSTRUCTORS_WITHIN_YEAR_SUCCESS,
  constants.GET_ALL_CONSTRUCTORS_WITHIN_YEAR_FAILURE,
);

export const {
  getAllConstructorsInRaceYearRequest,
  getAllConstructorsInRaceYearSuccess,
  getAllConstructorsInRaceYearFailure,
} = createActions(
  constants.GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST,
  constants.GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_SUCCESS,
  constants.GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_FAILURE,
);

export const {
  setSelectedConstructorRequest,
} = createActions(
  constants.SET_SELECTED_CONSTRUCTOR_REQUEST,
);

export const {
  getSelectedConstructorRequest,
  getSelectedConstructorSuccess,
  getSelectedConstructorFailure,
} = createActions(
  constants.GET_SELECTED_CONSTRUCTOR_REQUEST,
  constants.GET_SELECTED_CONSTRUCTOR_SUCCESS,
  constants.GET_SELECTED_CONSTRUCTOR_FAILURE,
);

export const {
  getSelectedConstructorDetailsRequest,
  getSelectedConstructorDetailsSuccess,
  getSelectedConstructorDetailsFailure,
} = createActions(
  constants.GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST,
  constants.GET_SELECTED_CONSTRUCTOR_DETAILS_SUCCESS,
  constants.GET_SELECTED_CONSTRUCTOR_DETAILS_FAILURE,
);
