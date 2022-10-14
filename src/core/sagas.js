import { all } from 'redux-saga/effects';
import resultSaga from './result/resultSaga';
import driverSaga from './driver/driverSaga';
import constructorSaga from './constructor/constructorSaga';
import standingSaga from './standing/standingSaga';
import scheduleSaga from './schedule/scheduleSaga';
import seasonSaga from './season/seasonSaga';
import circuitSaga from './circuit/circuitSaga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    driverSaga(),
    constructorSaga(),
    standingSaga(),
    scheduleSaga(),
    resultSaga(),
    seasonSaga(),
    circuitSaga(),
  ]);
}
