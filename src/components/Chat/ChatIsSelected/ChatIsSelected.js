import React, { useState } from 'react';
import userImage from '../../../img/user_photo.png';
import sendMessageImage from '../../../img/send-message.png';
import sendMessage from '../../../services/sendMessage';
import { useSelector } from 'react-redux';

export default function ChatIsSelected({selectedUser, user}) {
    const [messageText, setMessageText] = useState('')
    const conversation = useSelector(state => state.chat)

    return(
        <div className='chat-true'>
            <div className='chat-true-header'>
                <img src={userImage} alt='' className='chat-header-user-image'/>
                <p className='chat-header-user-name'>{selectedUser.firstName} {selectedUser.secondName}</p>
            </div>
            <div className='chat-true-message'>
                {conversation.conversations.map(con => {
                    return (
                        <div style={{ textAlign: con.userSender === user.uid ? 'right' : 'left' }} key={con.createdAt}>
                            <div className='message-text'>
                                <p className="messageStyle" >{con.message}</p>
                            </div>                          
                        </div>
                    )
                })}                   
            </div>
            <div className='chat-true-input'>
                <input type='text' placeholder='Type your message' className='input-message' value={messageText} onChange={(event) => setMessageText(event.target.value)}/>
                <button className='button-send-message' onClick={() => {
                    if (messageText.trim()) {
                        sendMessage({
                            userSender: user.uid,
                            userReceiver: selectedUser.uid,
                            message: messageText 
                        })
                        setMessageText('')
                    }                  
                }}><img src={sendMessageImage} alt='' className='img-send-message'/></button>
            </div>
        </div>
    )
}