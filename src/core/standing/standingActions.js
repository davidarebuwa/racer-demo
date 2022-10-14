import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST: null,
  GET_DRIVER_STANDINGS_AFTER_RACE_SUCCESS: null,
  GET_DRIVER_STANDINGS_AFTER_RACE_FAILURE: null,

  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST: null,
  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_SUCCESS: null,
  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_FAILURE: null,

  GET_SEASON_END_DRIVER_STANDINGS_REQUEST: null,
  GET_SEASON_END_DRIVER_STANDINGS_SUCCESS: null,
  GET_SEASON_END_DRIVER_STANDINGS_FAILURE: null,

  GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST: null,
  GET_SEASON_END_CONSTRUCTOR_STANDINGS_SUCCESS: null,
  GET_SEASON_END_CONSTRUCTOR_STANDINGS_FAILURE: null,

  GET_CURRENT_DRIVER_STANDINGS_REQUEST: null,
  GET_CURRENT_DRIVER_STANDINGS_SUCCESS: null,
  GET_CURRENT_DRIVER_STANDINGS_FAILURE: null,

  GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST: null,
  GET_CURRENT_CONSTRUCTOR_STANDINGS_SUCCESS: null,
  GET_CURRENT_CONSTRUCTOR_STANDINGS_FAILURE: null,

  GET_SELECTED_DRIVER_STANDING_REQUEST: null,
  GET_SELECTED_DRIVER_STANDING_SUCCESS: null,
  GET_SELECTED_DRIVER_STANDING_FAILURE: null,

  GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST: null,
  GET_SELECTED_CONSTRUCTOR_STANDING_SUCCESS: null,
  GET_SELECTED_CONSTRUCTOR_STANDING_FAILURE: null,
});

export const {
  getDriverStandingAfterRaceRequest,
  getDriverStandingAfterRaceSuccess,
  getDriverStandingAfterRaceFailure,

} = createActions(
  constants.GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST,
  constants.GET_DRIVER_STANDINGS_AFTER_RACE_SUCCESS,
  constants.GET_DRIVER_STANDINGS_AFTER_RACE_FAILURE,
);

export const {
  getConstructorStandingAfterRaceRequest,
  getConstructorStandingAfterRaceSuccess,
  getConstructorStandingAfterRaceFailure,
} = createActions(
  constants.GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST,
  constants.GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_SUCCESS,
  constants.GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_FAILURE,
);

export const {
  getSeasonEndDriverStandingRequest,
  getSeasonEndDriverStandingSuccess,
  getSeasonEndDriverStandingFailure,
} = createActions(
  constants.GET_SEASON_END_DRIVER_STANDINGS_REQUEST,
  constants.GET_SEASON_END_DRIVER_STANDINGS_SUCCESS,
  constants.GET_SEASON_END_DRIVER_STANDINGS_FAILURE,
);

export const {
  getSeasonEndConstructorStandingRequest,
  getSeasonEndConstructorStandingSuccess,
  getSeasonEndConstructorStandingFailure,
} = createActions(
  constants.GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST,
  constants.GET_SEASON_END_CONSTRUCTOR_STANDINGS_SUCCESS,
  constants.GET_SEASON_END_CONSTRUCTOR_STANDINGS_FAILURE,
);

export const {
  getCurrentDriverStandingsRequest,
  getCurrentDriverStandingsSuccess,
  getCurrentDriverStandingsFailure,
} = createActions(
  constants.GET_CURRENT_DRIVER_STANDINGS_REQUEST,
  constants.GET_CURRENT_DRIVER_STANDINGS_SUCCESS,
  constants.GET_CURRENT_DRIVER_STANDINGS_FAILURE,
);

export const {
  getCurrentConstructorStandingsRequest,
  getCurrentConstructorStandingsSuccess,
  getCurrentConstructorStandingsFailure,
} = createActions(
  constants.GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST,
  constants.GET_CURRENT_CONSTRUCTOR_STANDINGS_SUCCESS,
  constants.GET_CURRENT_CONSTRUCTOR_STANDINGS_FAILURE,
);

export const {
  getSelectedDriverStandingRequest,
  getSelectedDriverStandingSuccess,
  getSelectedDriverStandingFailure,
} = createActions(
  constants.GET_SELECTED_DRIVER_STANDING_REQUEST,
  constants.GET_SELECTED_DRIVER_STANDING_SUCCESS,
  constants.GET_SELECTED_DRIVER_STANDING_FAILURE,
);

export const {
  getSelectedConstructorStandingRequest,
  getSelectedConstructorStandingSuccess,
  getSelectedConstructorStandingFailure,
} = createActions(
  constants.GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST,
  constants.GET_SELECTED_CONSTRUCTOR_STANDING_SUCCESS,
  constants.GET_SELECTED_CONSTRUCTOR_STANDING_FAILURE,
);
