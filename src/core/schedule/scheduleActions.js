import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_RACE_SCHEDULE_BY_SEASON_REQUEST: null,
  GET_RACE_SCHEDULE_BY_SEASON_SUCCESS: null,
  GET_RACE_SCHEDULE_BY_SEASON_FAILURE: null,

  GET_MOST_RECENT_RACE_SCHEDULE_REQUEST: null,
  GET_MOST_RECENT_RACE_SCHEDULE_SUCCESS: null,
  GET_MOST_RECENT_RACE_SCHEDULE_FAILURE: null,

  GET_SELECTED_RACE_INFO_REQUEST: null,
  GET_SELECTED_RACE_INFO_SUCCESS: null,
  GET_SELECTED_RACE_INFO_FAILURE: null,
});

export const {
  getRaceScheduleBySeasonRequest,
  getRaceScheduleBySeasonSuccess,
  getRaceScheduleBySeasonFailure,
} = createActions(
  constants.GET_RACE_SCHEDULE_BY_SEASON_REQUEST,
  constants.GET_RACE_SCHEDULE_BY_SEASON_SUCCESS,
  constants.GET_RACE_SCHEDULE_BY_SEASON_FAILURE,
);

export const {
  getMostRecentRaceScheduleRequest,
  getMostRecentRaceScheduleSuccess,
  getMostRecentRaceScheduleFailure,
} = createActions(
  constants.GET_MOST_RECENT_RACE_SCHEDULE_REQUEST,
  constants.GET_MOST_RECENT_RACE_SCHEDULE_SUCCESS,
  constants.GET_MOST_RECENT_RACE_SCHEDULE_FAILURE,
);

export const {
  getSelectedRaceInfoRequest,
  getSelectedRaceInfoSuccess,
  getSelectedRaceInfoFailure,
} = createActions(
  constants.GET_SELECTED_RACE_INFO_REQUEST,
  constants.GET_SELECTED_RACE_INFO_SUCCESS,
  constants.GET_SELECTED_RACE_INFO_FAILURE,
);
