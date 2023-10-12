import { legacy_createStore, combineReducers } from 'redux';
import followingReducer from './reducer';

const rootReducer = combineReducers({
  following: followingReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
