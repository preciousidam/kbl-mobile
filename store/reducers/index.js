import { combineReducers } from 'redux';
import authReducer from './auth';
import appReducer from './app';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
});