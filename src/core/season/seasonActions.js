import { createActions } from 'redux-actions';
import keyMirror from 'key-mirror';

export const constants = keyMirror({
  GET_SEASON_REQUEST: null,
  GET_SEASON_SUCCESS: null,
  GET_SEASON_FAILURE: null,

});

export const { getSeasonRequest, getSeasonSuccess, getSeasonFailure } = createActions(
  constants.GET_SEASON_REQUEST,
  constants.GET_SEASON_SUCCESS,
  constants.GET_SEASON_FAILURE,
);
