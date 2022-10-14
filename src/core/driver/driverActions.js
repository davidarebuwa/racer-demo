import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_ALL_DRIVERS_LIST_REQUEST: null,
  GET_ALL_DRIVERS_LIST_SUCCESS: null,
  GET_ALL_DRIVERS_LIST_FAILURE: null,

  GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST: null,
  GET_ALL_DRIVERS_IN_RACE_YEAR_SUCCESS: null,
  GET_ALL_DRIVERS_IN_RACE_YEAR_FAILURE: null,

  SET_SELECTED_DRIVER_REQUEST: null,

  GET_SELECTED_DRIVER_REQUEST: null,
  GET_SELECTED_DRIVER_SUCCESS: null,
  GET_SELECTED_DRIVER_FAILURE: null,

  GET_SELECTED_DRIVER_DETAILS_REQUEST: null,
  GET_SELECTED_DRIVER_DETAILS_SUCCESS: null,
  GET_SELECTED_DRIVER_DETAILS_FAILURE: null,
});

export const {
  getAllDriversListRequest,
  getAllDriversListSuccess,
  getAllDriversListFailure,
} = createActions(
  constants.GET_ALL_DRIVERS_LIST_REQUEST,
  constants.GET_ALL_DRIVERS_LIST_SUCCESS,
  constants.GET_ALL_DRIVERS_LIST_FAILURE,
);

export const {
  getAllDriversInRaceYearRequest,
  getAllDriversInRaceYearSuccess,
  getAllDriversInRaceYearFailure,
} = createActions(
  constants.GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST,
  constants.GET_ALL_DRIVERS_IN_RACE_YEAR_SUCCESS,
  constants.GET_ALL_DRIVERS_IN_RACE_YEAR_FAILURE,
);

export const { setSelectedDriverRequest } = createActions(
  constants.SET_SELECTED_DRIVER_REQUEST,
);

export const {
  getSelectedDriverRequest,
  getSelectedDriverSuccess,
  getSelectedDriverFailure,
} = createActions(
  constants.GET_SELECTED_DRIVER_REQUEST,
  constants.GET_SELECTED_DRIVER_SUCCESS,
  constants.GET_SELECTED_DRIVER_FAILURE,
);

export const {
  getSelectedDriverDetailsRequest,
  getSelectedDriverDetailsSuccess,
  getSelectedDriverDetailsFailure,
} = createActions(
  constants.GET_SELECTED_DRIVER_DETAILS_REQUEST,
  constants.GET_SELECTED_DRIVER_DETAILS_SUCCESS,
  constants.GET_SELECTED_DRIVER_DETAILS_FAILURE,
);
