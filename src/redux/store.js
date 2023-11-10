import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../redux/reducer';

const store = legacy_createStore(authReducer, applyMiddleware(thunk));

export default store;
