import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import logo from '../../img/logo.png';
import eye from '../../img/eye.png';
import makePasswordVisible from '../../services/makePasswordVisible';
import registerNewUser from '../../services/registerNewUser';

function RegisterComponent() {
    const [visible, setVisible] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [processEnd, setProcessEnd] = useState(false)

    async function registerUser(event) {
        event.preventDefault()
        const user = {
            firstName, secondName, email, password
        }
        registerNewUser(user, setProcessEnd)
    }

    if (processEnd) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div className='signin'>
                <div className='signin__header'>
                    <h1 className='header'>Create new Account</h1>
                </div>
                <div className='signin__logo'>
                    <img src={logo} alt='' className='logo'/>
                </div>
                <form onSubmit={(event) => registerUser(event)}>
                    <div className='signin__input'>
                        <div className='input-block'>
                            <input type='text' placeholder='First name' className='input' value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                        </div>
                        <div className='input-block'>
                            <input type='text' placeholder='Second name' className='input' value={secondName} onChange={(event) => setSecondName(event.target.value)}/>
                        </div>
                        <div className='input-block'>
                            <input type='text' placeholder='Email' className='input' value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </div> 
                        <div className='input-block'>
                            <input type='password' placeholder='Password' className='input password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                            <button className='eye-button' onClick={() => makePasswordVisible(visible, setVisible)} type='button'>
                                <img src={eye} alt='' className='eye-image'/>
                            </button>
                        </div>
                    </div>
                    <div className='button-container2'>
                        <button type='submit' className='button-login'>CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterComponent;