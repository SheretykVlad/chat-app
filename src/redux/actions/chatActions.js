import { chatConstants } from '../constants/constants';
import firebase from 'firebase';

export const getUsersFromFirebase = () => {
    return async (dispatch) => {
        const uid = JSON.parse(localStorage.getItem('user')).uid
        const db = firebase.firestore();
        db.collection('users')
        .onSnapshot((querySnapshot) => {
            const onlineUsers = []
            querySnapshot.forEach(user => {
                if(user.data().uid !== uid) {
                    onlineUsers.push(user.data())
                }
            })
            dispatch({
                type: chatConstants.GET_USERS_SUCCESS,
                payload: {onlineUsers}
            })
        })           
    }
}

export const getConversationsFromFirebase = (userSender, userReceiver) => {
    return async (dispatch) => {
        const db = firebase.firestore()
        db.collection('messages')
        .where('userSender', 'in', [userSender, userReceiver])
        .orderBy('createdAt', 'asc')
        .onSnapshot((data) => {
            const conversations = []
            data.forEach((message) => {
                if ((message.data().userSender === userSender && message.data().userReceiver === userReceiver) || (message.data().userReceiver === userSender && message.data().userSender === userReceiver)) {
                    conversations.push(message.data())
                }              
            })
            dispatch({
                type: chatConstants.GET_MESSAGES_SUCCESS,
                payload: {conversations}
            })
        })      
    }
}