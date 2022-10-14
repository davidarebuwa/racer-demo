/* eslint-disable max-len */
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getAllConstructorsListSuccess,
  getAllConstructorsListFailure,
  getAllConstructorsInRaceYearSuccess,
  getAllConstructorsInRaceYearFailure,
  getAllConstructorsWithinYearSuccess,
  getAllConstructorsWithinYearFailure,
  getSelectedConstructorSuccess,
  getSelectedConstructorFailure,
  getSelectedConstructorDetailsSuccess,
  getSelectedConstructorDetailsFailure,
} from './constructorActions';

const {
  GET_ALL_CONSTRUCTORS_LIST_REQUEST,
  GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST,
  GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST,
  GET_SELECTED_CONSTRUCTOR_REQUEST,
  GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST,
} = require('./constructorActions').constants;

function* getAllConstructorsList() {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: '/constructors.json',
    });
    yield put(getAllConstructorsListSuccess(response.data.MRData.ConstructorTable.Constructors));
  } catch (error) {
    yield put(getAllConstructorsListFailure(error));
  }
}

function* getAllConstructorsWithinYear(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `/constructors.json?limit=100&offset=${action.payload}`,
    });
    yield put(getAllConstructorsWithinYearSuccess(response.data.MRData.ConstructorTable.Constructors));
  } catch (error) {
    yield put(getAllConstructorsWithinYearFailure(error));
  }
}

function* getAllConstructorsInRaceYear(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `${action.payload.year}/constructors.json`,
    });
    yield put(getAllConstructorsInRaceYearSuccess(response.data.MRData.ConstructorTable.Constructors));
  } catch (error) {
    yield put(getAllConstructorsInRaceYearFailure(error));
  }
}

function* getSelectedConstructor(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `/constructors/${action.payload.id}.json`,
    });
    yield put(getSelectedConstructorSuccess(response.data.MRData.ConstructorTable.Constructors));
  } catch (error) {
    yield put(getSelectedConstructorFailure(error));
  }
}

function* getSelectedConstructorDetails(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `/constructors/${action.payload}.json`,
    });
    yield put(getSelectedConstructorDetailsSuccess(response.data.MRData.ConstructorTable.Constructors));
  } catch (error) {
    yield put(getSelectedConstructorDetailsFailure(error));
  }
}

export default function* constructorSaga() {
  yield* [
    takeEvery(GET_ALL_CONSTRUCTORS_LIST_REQUEST, getAllConstructorsList),
    takeEvery(GET_ALL_CONSTRUCTORS_WITHIN_YEAR_REQUEST, getAllConstructorsWithinYear),
    takeEvery(GET_ALL_CONSTRUCTORS_IN_RACE_YEAR_REQUEST, getAllConstructorsInRaceYear),
    takeEvery(GET_SELECTED_CONSTRUCTOR_REQUEST, getSelectedConstructor),
    takeEvery(GET_SELECTED_CONSTRUCTOR_DETAILS_REQUEST, getSelectedConstructorDetails),
  ];
}
