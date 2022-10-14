import { combineReducers } from 'redux';
import isLoadingReducer from './reducers/isLoadingReducer';
import errorReducer from './reducers/errorReducer';
import scheduleReducer from './schedule/scheduleReducer';
import resultReducer from './result/resultReducer';
import seasonReducer from './season/seasonReducer';
import driverReducer from './driver/driverReducer';
import constructorReducer from './constructor/constructorReducer';
import standingReducer from './standing/standingReducer';
import circuitReducer from './circuit/circuitReducer';

const rootReducer = combineReducers({
  drivers: driverReducer,
  constructors: constructorReducer,
  standing: standingReducer,
  schedule: scheduleReducer,
  results: resultReducer,
  seasons: seasonReducer,
  circuits: circuitReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});

export default rootReducer;
