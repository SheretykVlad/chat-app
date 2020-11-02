import React, { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import userPhoto from './img/user_photo.png';

export default function App() {
  const [sign, setSign] = useState(false)
  const [infoAboutUser, setInfoAboutUser] = useState({})

  useEffect(() => {
    window.gapi.load('auth2', function() {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      }).then(() => console.log('ok'), () => console.log('bad'))
    })
  })

  function signIn() {
    const GoogleAuth = window.gapi.auth2.getAuthInstance()
    GoogleAuth.signIn({
      scope: 'profile email'
    }).then(user => fetchDataAboutUserFromGmail(user), () => console.log('Auth BAD'))
    .then(() => signIsDone())
  }

  function fetchDataAboutUserFromGmail(user) {
    setInfoAboutUser(() => {
      return {
        userName: user.tt.Ad,
        userPassword: undefined,
        userPhoto: user.tt.dK,
      }
    })
  }

  function fetchDataFromAuthComponent(userName, userPassword) {
    setSign(true)
    setInfoAboutUser(() => {
      return {
        userName: userName,
        userPassword: userPassword,
        userPhoto: userPhoto,
      }
    })
  }

  function signIsDone() {
    if(Object.keys(infoAboutUser).length === 0) {
      setSign(true)
    }
  }

  return(
    <div>
      {!sign ? <SignIn makeAuthByGoogle={signIn} onLogin={fetchDataFromAuthComponent}/> : null}
    </div>
  )
}