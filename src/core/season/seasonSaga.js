/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getSeasonSuccess,
  getSeasonFailure,
} from './seasonActions';

const { GET_SEASON_REQUEST } = require('./seasonActions').constants;

function* getSeason(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.appendURL}/seasons.json`,
    });
    yield put(getSeasonSuccess(response.data.MRData.SeasonTable));
  } catch (error) {
    yield put(getSeasonFailure(error));
  }
}

export default function* seasonSaga() {
  yield* [
    takeEvery(GET_SEASON_REQUEST, getSeason),
  ];
}
