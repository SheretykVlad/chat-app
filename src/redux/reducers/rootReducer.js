import { combineReducers } from 'redux';
import chatReducer from '../reducers/userReducer';

export const rootReducer = combineReducers({
    chat: chatReducer
})