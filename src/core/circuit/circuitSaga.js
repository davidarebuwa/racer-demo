import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../api';

import {
  getAllCircuitsListSuccess,
  getAllCircuitsListFailure,
  getAllCircuitsWithinYearSuccess,
  getAllCircuitsWithinYearFailure,
  getSelectedCircuitSuccess,
  getSelectedCircuitFailure,
  getSelectedCircuitDetailsSuccess,
  getSelectedCircuitDetailsFailure,
} from './circuitActions';

const {
  GET_ALL_CIRCUITS_LIST_REQUEST,
  GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST,
  GET_SELECTED_CIRCUIT_REQUEST,
  GET_SELECTED_CIRCUIT_DETAILS_REQUEST,
} = require('./circuitActions').constants;

function* getAllCircuitsList() {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: 'circuits.json',
    });
    yield put(getAllCircuitsListSuccess(response.data));
  } catch (error) {
    yield put(getAllCircuitsListFailure(error));
  }
}

function* getAllCircuitsWithinYear(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `circuits.json?limit=100&offset=${action.payload}`,
    });
    yield put(getAllCircuitsWithinYearSuccess(response.data));
  } catch (error) {
    yield put(getAllCircuitsWithinYearFailure(error));
  }
}

function* getSelectedCircuit(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `circuits/${action.payload.id}.json`,
    });
    yield put(getSelectedCircuitSuccess(response.data.MRData.CircuitTable.Circuits[0]));
  } catch (error) {
    yield put(getSelectedCircuitFailure(error));
  }
}

function* getSelectedCircuitDetails(action) {
  try {
    const response = yield call(fetchApi, {
      method: 'GET',
      url: `circuits/${action.payload}.json`,
    });
    yield put(getSelectedCircuitDetailsSuccess(response.data));
  } catch (error) {
    yield put(getSelectedCircuitDetailsFailure(error));
  }
}

export default function* circuitSaga() {
  yield* [
    takeEvery(GET_ALL_CIRCUITS_LIST_REQUEST, getAllCircuitsList),
    takeEvery(GET_ALL_CIRCUITS_WITHIN_YEAR_REQUEST, getAllCircuitsWithinYear),
    takeEvery(GET_SELECTED_CIRCUIT_REQUEST, getSelectedCircuit),
    takeEvery(GET_SELECTED_CIRCUIT_DETAILS_REQUEST, getSelectedCircuitDetails),
  ];
}
