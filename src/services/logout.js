import firebase from 'firebase';

export default function logOut(setUserLogOut, uid) {
    const db = firebase.firestore()
    db.collection('users')
    .doc(uid)
    .update({isOnline: false})
    .then(() => {
        firebase.auth().signOut().then(() => {
            localStorage.clear()
            setUserLogOut(true)
        })
    }) 
}