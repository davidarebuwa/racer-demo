/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getRaceScheduleBySeasonSuccess,
  getRaceScheduleBySeasonFailure,
  getMostRecentRaceScheduleSuccess,
  getMostRecentRaceScheduleFailure,
  getSelectedRaceInfoSuccess,
  getSelectedRaceInfoFailure,
} from './scheduleActions';

const {
  GET_RACE_SCHEDULE_BY_SEASON_REQUEST,
  GET_MOST_RECENT_RACE_SCHEDULE_REQUEST,
  GET_SELECTED_RACE_INFO_REQUEST,

} = require('./scheduleActions').constants;

function* getRaceScheduleBySeason(action) {
  try {
    const { year } = action.payload.year;
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${year}/.json?`,
    });
    yield put(
      getRaceScheduleBySeasonSuccess(
        response.data.MRData.RaceTable,
      ),
    );
  } catch (error) {
    yield put(getRaceScheduleBySeasonFailure(error));
  }
}

function* getMostRecentRaceSchedule() {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: '/current.json',
    });
    yield put(
      getMostRecentRaceScheduleSuccess(
        response.data.MRData.RaceTable,
      ),
    );
  } catch (error) {
    yield put(getMostRecentRaceScheduleFailure(error));
  }
}

function* getSelectedRaceInfo(action) {
  try {
    const { year, round } = action.payload.year;
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${year}/${round}.json`,
    });
    yield put(
      getSelectedRaceInfoSuccess(
        response.data.MRData.RaceTable,
      ),
    );
  } catch (error) {
    yield put(getSelectedRaceInfoFailure(error));
  }
}

export default function* scheduleSaga() {
  yield* [
    takeEvery(GET_RACE_SCHEDULE_BY_SEASON_REQUEST, getRaceScheduleBySeason),
    takeEvery(GET_MOST_RECENT_RACE_SCHEDULE_REQUEST, getMostRecentRaceSchedule),
    takeEvery(GET_SELECTED_RACE_INFO_REQUEST, getSelectedRaceInfo),
  ];
}
