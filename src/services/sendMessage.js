import firebase from 'firebase'

export default async function sendMessage(msgObj) {
    const db = firebase.firestore();
    db.collection('messages')
    .add({
        ...msgObj,
        createdAt: Date.now(),
    })
}