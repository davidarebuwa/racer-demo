/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getAllDriversListSuccess,
  getAllDriversListFailure,
  getAllDriversInRaceYearSuccess,
  getAllDriversInRaceYearFailure,
  getSelectedDriverSuccess,
  getSelectedDriverFailure,
  getSelectedDriverDetailsSuccess,
  getSelectedDriverDetailsFailure,
} from './driverActions';

const {
  GET_ALL_DRIVERS_LIST_REQUEST,
  GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST,
  GET_SELECTED_DRIVER_REQUEST,
  GET_SELECTED_DRIVER_DETAILS_REQUEST,
} = require('./driverActions').constants;

function* getAllDriversList() {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: '/drivers.json',
    });
    yield put(
      getAllDriversListSuccess(
        response.data.MRData.DriverTable.Drivers,
      ),
    );
  } catch (error) {
    yield put(getAllDriversListFailure(error));
  }
}

function* getAllDriversInRaceYear(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.year}/drivers.json?`,
    });
    yield put(
      getAllDriversInRaceYearSuccess(
        response.data.MRData.DriverTable.Drivers,
      ),
    );
  } catch (error) {
    yield put(getAllDriversInRaceYearFailure(error));
  }
}

function* getSelectedDriver(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `/drivers/${action.payload.id}.json`,
    });
    yield put(
      getSelectedDriverSuccess(
        response.data.MRData.DriverTable.Drivers,
      ),
    );
  } catch (error) {
    yield put(getSelectedDriverFailure(error));
  }
}

function* getSelectedDriverDetails(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `/drivers/${action.payload}.json`,
    });
    yield put(
      getSelectedDriverDetailsSuccess(
        response.data.MRData.DriverTable.Drivers,
      ),
    );
  } catch (error) {
    yield put(getSelectedDriverDetailsFailure(error));
  }
}

export default function* driverSaga() {
  yield* [
    takeEvery(GET_ALL_DRIVERS_LIST_REQUEST, getAllDriversList),
    takeEvery(
      GET_ALL_DRIVERS_IN_RACE_YEAR_REQUEST,
      getAllDriversInRaceYear,
    ),
    takeEvery(GET_SELECTED_DRIVER_REQUEST, getSelectedDriver),
    takeEvery(
      GET_SELECTED_DRIVER_DETAILS_REQUEST,
      getSelectedDriverDetails,
    ),
  ];
}
