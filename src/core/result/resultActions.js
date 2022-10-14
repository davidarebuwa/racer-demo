import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_RACE_RESULT_REQUEST: null,
  GET_RACE_RESULT_SUCCESS: null,
  GET_RACE_RESULT_FAILURE: null,

  GET_MOST_RECENT_RACE_RESULT_REQUEST: null,
  GET_MOST_RECENT_RACE_RESULT_SUCCESS: null,
  GET_MOST_RECENT_RACE_RESULT_FAILURE: null,

});

export const {
  getRaceResultRequest,
  getRaceResultSuccess,
  getRaceResultFailure,
} = createActions(
  constants.GET_RACE_RESULT_REQUEST,
  constants.GET_RACE_RESULT_SUCCESS,
  constants.GET_RACE_RESULT_FAILURE,
);

export const {
  getMostRecentRaceResultRequest,
  getMostRecentRaceResultSuccess,
  getMostRecentRaceResultFailure,
} = createActions(
  constants.GET_MOST_RECENT_RACE_RESULT_REQUEST,
  constants.GET_MOST_RECENT_RACE_RESULT_SUCCESS,
  constants.GET_MOST_RECENT_RACE_RESULT_FAILURE,
);
