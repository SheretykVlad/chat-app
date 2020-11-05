import firebase from 'firebase';

export default function registerNewUser(user, setProcessEnd) {
    const db = firebase.firestore();
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(registredUser => {
        const currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
            displayName: `${user.firstName} ${user.secondName}`
        })
        .then(() => {
            db.collection('users').add({
                firstName: user.firstName,
                secondName: user.secondName,
                uid: registredUser.user.uid,
                createdAt: new Date()
            })
            .then(() => {
                const loggedInUser = {
                    firstName: user.firstName,
                    secondName: user.secondName,
                    uid: registredUser.user.uid,
                    email: user.email,
                }
                setProcessEnd(true)
                localStorage.setItem('user', JSON.stringify(loggedInUser))
                console.log('User registred in succesfull......')
            })
        })
    })
    .catch((error) => {
        if (error.code === "auth/invalid-email") {
            alert('Oooops! You enter the wrong email address')
        } else if (error.code === "auth/weak-password") {
            alert('Your password is too weak. Please change it!')
        }
    })
}