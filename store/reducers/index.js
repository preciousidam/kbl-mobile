import { combineReducers } from 'redux';
import authReducer from './auth';
import appReducer from './app';
import notificationReducer from './notification';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    notifications: notificationReducer,
});