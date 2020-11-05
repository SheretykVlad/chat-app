import firebase from 'firebase';

export default function logOut(setUserLogOut) {
    firebase.auth().signOut().then(() => {
        localStorage.clear()
        setUserLogOut(true)
    })
}