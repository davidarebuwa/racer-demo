/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getDriverStandingAfterRaceSuccess,
  getDriverStandingAfterRaceFailure,
  getConstructorStandingAfterRaceSuccess,
  getConstructorStandingAfterRaceFailure,
  getSeasonEndDriverStandingSuccess,
  getSeasonEndDriverStandingFailure,
  getSeasonEndConstructorStandingSuccess,
  getSeasonEndConstructorStandingFailure,
  getCurrentDriverStandingsSuccess,
  getCurrentDriverStandingsFailure,
  getCurrentConstructorStandingsSuccess,
  getCurrentConstructorStandingsFailure,
  getSelectedDriverStandingSuccess,
  getSelectedDriverStandingFailure,
  getSelectedConstructorStandingSuccess,
  getSelectedConstructorStandingFailure,
} from './standingActions';

const {
  GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST,
  GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST,
  GET_SEASON_END_DRIVER_STANDINGS_REQUEST,
  GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST,
  GET_CURRENT_DRIVER_STANDINGS_REQUEST,
  GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST,
  GET_SELECTED_DRIVER_STANDING_REQUEST,
  GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST,
} = require('./standingActions').constants;

function* getDriversStandingAfterRace(action) {
  try {
    const driversStandingAfterRace = yield call(fetchApi, {
      method: 'GET',
      url: `drivers/${action.payload.driverId}/driverStandings.json`,
    });
    yield put(getDriverStandingAfterRaceSuccess(driversStandingAfterRace));
  } catch (e) {
    yield put(getDriverStandingAfterRaceFailure(e.message));
  }
}

function* getConstructorsStandingAfterRace(action) {
  try {
    const constructorsStandingAfterRace = yield call(fetchApi, {
      method: 'GET',
      url: `constructors/${action.payload.constructorId}/constructorStandings.json`,
    });
    yield put(getConstructorStandingAfterRaceSuccess(constructorsStandingAfterRace));
  } catch (e) {
    yield put(getConstructorStandingAfterRaceFailure(e.message));
  }
}

function* getSeasonEndDriverStanding(action) {
  try {
    const seasonEndDriverStanding = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.year}/driverStandings.json`,
    });
    yield put(getSeasonEndDriverStandingSuccess(seasonEndDriverStanding));
  } catch (e) {
    yield put(getSeasonEndDriverStandingFailure(e.message));
  }
}

function* getSeasonEndConstructorStanding(action) {
  try {
    const seasonEndConstructorStanding = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.year}/constructorStandings.json`,
    });
    yield put(getSeasonEndConstructorStandingSuccess(seasonEndConstructorStanding));
  } catch (e) {
    yield put(getSeasonEndConstructorStandingFailure(e.message));
  }
}

function* getCurrentDriverStanding() {
  try {
    const currentDriverStanding = yield call(fetchApi, {
      method: 'GET',
      url: 'current/driverStandings.json',
    });
    yield put(getCurrentDriverStandingsSuccess(currentDriverStanding));
  } catch (e) {
    yield put(getCurrentDriverStandingsFailure(e.message));
  }
}

function* getCurrentConstructorStanding() {
  try {
    const currentConstructorStanding = yield call(fetchApi, {
      method: 'GET',
      url: 'current/constructorStandings.json',
    });
    yield put(getCurrentConstructorStandingsSuccess(currentConstructorStanding));
  } catch (e) {
    yield put(getCurrentConstructorStandingsFailure(e.message));
  }
}

function* getSelectedDriverStanding(action) {
  try {
    const selectedDriverStanding = yield call(fetchApi, {
      method: 'GET',
      url: `drivers/${action.payload.driverId}/driverStandings.json`,
    });
    yield put(getSelectedDriverStandingSuccess(selectedDriverStanding));
  } catch (e) {
    yield put(getSelectedDriverStandingFailure(e.message));
  }
}

function* getSelectedConstructorStanding(action) {
  try {
    const selectedConstructorStanding = yield call(fetchApi, {
      method: 'GET',
      url: `constructors/${action.payload.constructorId}/constructorStandings.json`,
    });
    yield put(getSelectedConstructorStandingSuccess(selectedConstructorStanding));
  } catch (e) {
    yield put(getSelectedConstructorStandingFailure(e.message));
  }
}

export default function* standingSaga() {
  yield*
  [
    takeEvery(
      GET_DRIVER_STANDINGS_AFTER_RACE_REQUEST,
      getDriversStandingAfterRace,
    ),
    takeEvery(
      GET_CONSTRUCTOR_STANDINGS_AFTER_RACE_REQUEST,
      getConstructorsStandingAfterRace,
    ),
    takeEvery(
      GET_SEASON_END_DRIVER_STANDINGS_REQUEST,
      getSeasonEndDriverStanding,
    ),
    takeEvery(
      GET_SEASON_END_CONSTRUCTOR_STANDINGS_REQUEST,
      getSeasonEndConstructorStanding,
    ),
    takeEvery(GET_CURRENT_DRIVER_STANDINGS_REQUEST, getCurrentDriverStanding),
    takeEvery(
      GET_CURRENT_CONSTRUCTOR_STANDINGS_REQUEST,
      getCurrentConstructorStanding,
    ),
    takeEvery(
      GET_SELECTED_DRIVER_STANDING_REQUEST,
      getSelectedDriverStanding,
    ),
    takeEvery(
      GET_SELECTED_CONSTRUCTOR_STANDING_REQUEST,
      getSelectedConstructorStanding,
    ),
  ];
}
