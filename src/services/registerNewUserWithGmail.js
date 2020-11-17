import firebase from 'firebase';

export default function registerNewUserWithGmail(setUserAuthenticated) {
    var provider = new firebase.auth.GoogleAuthProvider();
    const db = firebase.firestore();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        db.collection('users')
        .doc(result.user.uid)
        .set({
            firstName: result.additionalUserInfo.profile.given_name,
            secondName: result.additionalUserInfo.profile.family_name,
            uid: result.user.uid,
            createdAt: new Date(),
            isOnline: true
        })
        .then(() => {
            const loggedInUser = {
                firstName: user.displayName.split(' ')[0],
                secondName: user.displayName.split(' ')[1],
                uid: user.uid,
                email: user.email,
                isOnline: true
            }
            localStorage.setItem('user', JSON.stringify(loggedInUser))
            setUserAuthenticated(true)
            console.log('User registred in succesfull......')
        })
    })
}