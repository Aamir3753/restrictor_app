import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Authentication from './Reducers/authenticate';
const store = createStore(
  combineReducers({Authentication}),
  applyMiddleware(thunk),
);

export default store;
