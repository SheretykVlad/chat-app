import { chatConstants } from '../constants/constants';

const initialState = {
    users: [],
    conversations: []
}

export default (state = initialState, action) => {
    if (action.type === chatConstants.GET_USERS_SUCCESS) {
        return state = {
            ...state,
            users: action.payload.onlineUsers
        }
    } else if (action.type === chatConstants.GET_MESSAGES_SUCCESS) {
        return state = {
            ...state,
            conversations: action.payload.conversations
        }
    } else {
        return state
    }
}