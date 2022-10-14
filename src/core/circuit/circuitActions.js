import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_ALL_CIRCUITS_LIST_REQUEST: null,
  GET_ALL_CIRCUITS_LIST_SUCCESS: null,
  GET_ALL_CIRCUITS_LIST_FAILURE: null,

  GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST: null,
  GET_ALL_CIRCUITS_WITHIN_YEAR_SUCCESS: null,
  GET_ALL_CIRCUITS_WITHIN_YEAR_FAILURE: null,

  GET_SELECTED_CIRCUIT_REQUEST: null,
  GET_SELECTED_CIRCUIT_SUCCESS: null,
  GET_SELECTED_CIRCUIT_FAILURE: null,

  SET_SELECTED_CIRCUIT_REQUEST: null,

  GET_SELECTED_CIRCUIT_DETAILS_REQUEST: null,
  GET_SELECTED_CIRCUIT_DETAILS_SUCCESS: null,
  GET_SELECTED_CIRCUIT_DETAILS_FAILURE: null,

});

export const {
  getAllCircuitsListRequest,
  getAllCircuitsListSuccess,
  getAllCircuitsListFailure,
} = createActions(
  constants.GET_ALL_CIRCUITS_LIST_REQUEST,
  constants.GET_ALL_CIRCUITS_LIST_SUCCESS,
  constants.GET_ALL_CIRCUITS_LIST_FAILURE,
);

export const {

  getAllCircuitsWithinYearRequest,
  getAllCircuitsWithinYearSuccess,
  getAllCircuitsWithinYearFailure,
} = createActions(
  constants.GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST,
  constants.GET_ALL_CIRCUITS_WITHIN_YEAR_SUCCESS,
  constants.GET_ALL_CIRCUITS_WITHIN_YEAR_FAILURE,
);

export const {
  setSelectedCircuitRequest,
} = createActions(
  constants.SET_SELECTED_CIRCUIT_REQUEST,
);

export const {
  getSelectedCircuitRequest,
  getSelectedCircuitSuccess,
  getSelectedCircuitFailure,
} = createActions(
  constants.GET_SELECTED_CIRCUIT_REQUEST,
  constants.GET_SELECTED_CIRCUIT_SUCCESS,
  constants.GET_SELECTED_CIRCUIT_FAILURE,

);

export const {
  getSelectedCircuitDetailsRequest,
  getSelectedCircuitDetailsSuccess,
  getSelectedCircuitDetailsFailure,
} = createActions(
  constants.GET_SELECTED_CIRCUIT_DETAILS_REQUEST,
  constants.GET_SELECTED_CIRCUIT_DETAILS_SUCCESS,
  constants.GET_SELECTED_CIRCUIT_DETAILS_FAILURE,
);
