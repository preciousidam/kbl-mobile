import { combineReducers } from 'redux';
import authReducer from './auth';
import appReducer from './app';
import notificationReducer from './notification';
import policyReducer from './policy';
import kycReducer from './kyc';
import claimReducer from './claims';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    claims: claimReducer,
    notifications: notificationReducer,
    policies: policyReducer,
    kyc: kycReducer,
});