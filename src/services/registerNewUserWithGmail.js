import firebase from 'firebase';

export default function registerNewUserWithGmail(setUserAuthenticated) {
    var provider = new firebase.auth.GoogleAuthProvider();
    const db = firebase.firestore();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        db.collection('users').add({
            firstName: result.additionalUserInfo.profile.given_name,
            secondName: result.additionalUserInfo.profile.family_name,
            uid: result.user.uid,
            createdAt: new Date()
        })
        .then(() => {
            const loggedInUser = {
                firstName: user.displayName.split(' ')[0],
                secondName: user.displayName.split(' ')[1],
                uid: user.uid,
                email: user.email
            }
            localStorage.setItem('user', JSON.stringify(loggedInUser))
            setUserAuthenticated(true)
            console.log('User registred in succesfull......')
        })
    })
}