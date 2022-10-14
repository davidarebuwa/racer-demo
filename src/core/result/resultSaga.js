/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getRaceResultSuccess,
  getRaceResultFailure,
  getMostRecentRaceResultSuccess,
  getMostRecentRaceResultFailure,
} from './resultActions';

const { GET_RACE_RESULT_REQUEST, GET_MOST_RECENT_RACE_RESULT_REQUEST } = require('./resultActions').constants;

function* getRaceResult(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.appendURL}/results.json`,
    });
    yield put(
      getRaceResultSuccess(
        response.data.MRData.RaceTable,
      ),
    );
  } catch (error) {
    yield put(getRaceResultFailure(error));
  }
}

function* getMostRecentRaceResult() {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: '/current/last/results.json',
    });
    yield put(
      getMostRecentRaceResultSuccess(
        response.data.MRData.RaceTable,
      ),
    );
  } catch (error) {
    yield put(getMostRecentRaceResultFailure(error));
  }
}

export default function* resultSaga() {
  yield*
  [
    takeEvery(GET_RACE_RESULT_REQUEST, getRaceResult),
    takeEvery(GET_MOST_RECENT_RACE_RESULT_REQUEST, getMostRecentRaceResult),
  ];
}
