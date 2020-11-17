import React, { useEffect, useState } from 'react';
import logOut from '../../services/logout';
import { Redirect } from 'react-router-dom';
import { getUsersFromFirebase, getConversationsFromFirebase } from '../../redux/actions/chatActions';
import './index.css';
import logout from '../../img/logout.png';
import userImage from '../../img/user_photo.png';
import ChatIsntSelected from './ChatIsntSelected/ChatIsntSelected';
import ChatIsSelected from './ChatIsSelected/ChatIsSelected';
import { useDispatch, useSelector } from 'react-redux';

export default function Chat() {
    const [user, setUser] = useState({})
    const [userLogOut, setUserLogOut] = useState(false)
    const [searchUserField, setSearcUserField] = useState('')
    const [chatIsSelected, setChatIsSelected] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat)

    useEffect(() => {
        dispatch(getUsersFromFirebase())
        const userInfo = JSON.parse(localStorage.getItem('user'))
        setUser(userInfo)
    }, [])

    if (userLogOut) {
        return <Redirect to='/'/>
    }

    return(
        <div className='chat-container'>
            <div className='users-info'>
                <div className='user-profile'>
                    <div className='user-profile-images'>
                        <img src={userImage} alt='' className='user-photo'/>
                        <img src={logout} alt='' onClick={() => logOut(setUserLogOut, user.uid)} className='logout-photo'/>
                    </div>
                    <div className='user-profile-search'>
                        <input type='text' placeholder='Search user' value={searchUserField} onChange={(event) => setSearcUserField(event.target.value)} className='user-search-field'/>
                    </div>
                </div>
                <div className='online-users'>
                    <h1 className='oline-users-header'>Chats</h1>
                    {chat.users.map(friendUser => {
                        return(
                            <div key={friendUser.uid} className='online-user' onClick={() => {
                                setSelectedUser(friendUser)
                                setChatIsSelected(true)
                                dispatch(getConversationsFromFirebase(user.uid, friendUser.uid))
                            }}>
                                <img src={userImage} alt='' className='user-photo'/>
                                {friendUser.firstName}
                            </div>
                        )
                    })}
                    <button onClick={() => console.log(selectedUser)}></button>
                </div>
            </div>
            <div className='chat'>
                {!chatIsSelected ? <ChatIsntSelected /> : <ChatIsSelected selectedUser={selectedUser} user={user}/>}
                </div>
            </div>
    )
}