import React, { useEffect, useState } from 'react'
import logOut from '../../services/logout'
import { Redirect } from 'react-router-dom'

export default function Chat() {
    const [user, setUser] = useState({})
    const [userLogOut, setUserLogOut] = useState(false)

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        setUser(userInfo)
    }, [])

    if (userLogOut) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <h1>ITS CHAT {user.firstName}</h1>
            <button onClick={() => logOut(setUserLogOut)}>Sign Out</button>
        </div>
    )
}