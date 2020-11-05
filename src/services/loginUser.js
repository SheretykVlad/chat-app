import firebase from 'firebase';

export default function loginUser(email, password, setUserAuthenticated) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
        const name = data.user.displayName.split(' ')
        const loggedInUser = {
            firstName: name[0],
            secondName: name[1],
            uid: data.user.uid,
            email: data.user.email
        }
        localStorage.setItem('user', JSON.stringify(loggedInUser))
        console.log('User logged in succesfull......')
        setUserAuthenticated(true)
    })
    .catch((error) => {
        if (error.code === 'auth/user-not-found') {
            alert('There are no such user')
        } else if (error.code === "auth/wrong-password") {
            alert('Oooops! You enter the wrong password')
        } else if (error.code === "auth/invalid-email") {
            alert('Oooops! You enter the wrong email address')
        }
    })
}